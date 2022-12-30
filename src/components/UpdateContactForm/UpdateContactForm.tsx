import { Form, Label, Input, Button } from "./UpdateContactForm.styled";
import { useUpdateContactMutation } from "../../redux/contactSlice";
import { useState } from "react";
import { Notify } from "notiflix/build/notiflix-notify-aio";

interface IProps {
  onClose: Function;
  name: string;
  number: string;
  id: string;
}

const UpdateContactForm: React.FC<IProps> = ({
  onClose,
  name,
  number,
  id,
}): JSX.Element => {
  const [updateContact] = useUpdateContactMutation();
  const [nameValue, setNameValue] = useState<string>(name);
  const [numberValue, setNumberValue] = useState<string>(number);

  const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const contact = {
      id,
      contact: { name: nameValue, number: numberValue },
    };
    e.currentTarget.reset();
    updateContact(contact);
    Notify.success("Change contact success!", {
      timeout: 3000,
      distance: "100px",
    });
    onClose();
  };

  return (
    <Form autoComplete="off" onSubmit={handlerSubmit}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          value={nameValue}
          onChange={(e) => {
            setNameValue(e.target.value);
          }}
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
          value={numberValue}
          onChange={(e) => {
            setNumberValue(e.target.value);
          }}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </Label>
      <Button type="submit">Change contact</Button>
    </Form>
  );
};

export default UpdateContactForm;
