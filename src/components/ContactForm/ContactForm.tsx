import { Form, Label, Input, Button } from "./ContactForm.styled";
import { useAddContactMutation } from "../../redux/contactSlice";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { BaseSyntheticEvent } from "react";

interface IContact {
  name: string;
  number: string;
  id: string;
}

interface IProps {
  onClose: Function;
  contacts: IContact[];
}

const ContactForm: React.FC<IProps> = ({ onClose, contacts }) => {
  const [addContact] = useAddContactMutation();

  const handlerSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const newContact = {
      name: e.target.name.value,
      number: e.target.phone.value,
    };
    const findContact: IContact | undefined = contacts.find(
      (contact: IContact) =>
        contact.name
          .toLocaleLowerCase()
          .includes(newContact.name.toLocaleLowerCase())
    );
    if (findContact) {
      Notify.failure(`${newContact.name} is already in contacts.`, {
        timeout: 3000,
        distance: "100px",
      });
    } else {
      addContact(newContact);
      Notify.success("Add a new contact success!", {
        timeout: 3000,
        distance: "100px",
      });
    }
    e.target.reset();
    onClose();
  };

  return (
    <Form autoComplete="off" onSubmit={handlerSubmit}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </Label>
      <Label>
        Number
        <Input
          type="tel"
          name="phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </Label>
      <Button type="submit">Save contact</Button>
    </Form>
  );
};

export default ContactForm;
