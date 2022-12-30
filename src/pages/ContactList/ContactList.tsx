import { List, Item, Text, Button, AddButton } from "./ContactList.styled";
import { useState, lazy, Suspense } from "react";
import { selectFilterValue } from "../../redux/selectors";
import { useSelector } from "react-redux";
import {
  useGetContactsQuery,
  useDeleteContactMutation,
} from "../../redux/contactSlice";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { RootState } from "../../redux/selectors";

const Loader = lazy(() => import("../../components/Loader/Loader"));
const Filter = lazy(() => import("../../components/Filter/Filter"));
const Modal = lazy(() => import("../../components/Modal/Modal"));
const ContactForm = lazy(
  () => import("../../components/ContactForm/ContactForm")
);
const UpdateContactForm = lazy(
  () => import("../../components/UpdateContactForm/UpdateContactForm")
);

type Post = {
  name: string;
  number: string;
  id: string;
};

const ContactList: React.FC = (): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showChangeContactModal, setShowChangeContactModal] =
    useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [id, setId] = useState<string>("");
  const {
    data: contacts,
    isLoading,
    error,
  } = useGetContactsQuery({ url: "/contacts", method: "GET" });
  const [deleteContact] = useDeleteContactMutation();
  const filter = useSelector<RootState, string>(selectFilterValue);

  const visibleContacts = (): Post[] => {
    const normalizeFilter: string = filter.toLocaleLowerCase();
    return contacts?.filter((contact: any) =>
      contact.name.toLocaleLowerCase().includes(normalizeFilter)
    );
  };

  const handleDeleteContact = (id: string): void => {
    deleteContact(id);
    Notify.success("Delete contact success!", {
      timeout: 3000,
      distance: "100px",
    });
  };

  const handleChangeContact = (name: string, number: string, id: string) => {
    setShowChangeContactModal((prevState) => !prevState);
    setName(name);
    setNumber(number);
    setId(id);
  };

  return (
    <Suspense fallback={null}>
      <>
        {error && <Text>Sorry something wrong! :(</Text>}
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <AddButton
              type="button"
              onClick={() => setShowModal((prevState) => !prevState)}
            >
              Add Contact
            </AddButton>
            <Filter />
            <List>
              {visibleContacts().map(({ name, number, id }) => {
                return (
                  <Item key={id}>
                    <Text>
                      {name}: {number}
                    </Text>
                    <Button
                      type="button"
                      onClick={() => handleDeleteContact(id)}
                    >
                      Delete
                    </Button>
                    <Button
                      type="button"
                      onClick={() => handleChangeContact(name, number, id)}
                    >
                      Change contact
                    </Button>
                  </Item>
                );
              })}
            </List>
          </div>
        )}
        {showModal && (
          <Modal onClose={() => setShowModal((prevState) => !prevState)}>
            <ContactForm
              onClose={() => setShowModal((prevState) => !prevState)}
              contacts={contacts}
            />
          </Modal>
        )}
        {showChangeContactModal && (
          <Modal
            onClose={() => setShowChangeContactModal((prevState) => !prevState)}
          >
            <UpdateContactForm
              onClose={() =>
                setShowChangeContactModal((prevState) => !prevState)
              }
              name={name}
              number={number}
              id={id}
            />
          </Modal>
        )}
      </>
    </Suspense>
  );
};

export default ContactList;
