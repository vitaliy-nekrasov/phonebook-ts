import { Form, Label, Input, Button } from "./RegisterForm.styled";
import { useDispatch } from "react-redux";
import authOperations from "../../redux/auth/authOperations";
import { useRef } from "react";

type User = {
  name: string;
  email: string;
  password: string;
};

const RegisterForm: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<any>();
  const nameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user: User = {
      name: nameInput.current?.value!,
      email: emailInput.current?.value!,
      password: passwordInput.current?.value!,
    };
    dispatch(authOperations.register(user));
    e.currentTarget.reset();
  };

  return (
    <main>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Label>
          Name
          <Input type="text" name="name" ref={nameInput} />
        </Label>
        <Label>
          E-Mail
          <Input type="email" name="email" ref={emailInput} />
        </Label>
        <Label>
          Password
          <Input type="password" name="password" ref={passwordInput} />
        </Label>
        <Button type="submit">Sign Up</Button>
      </Form>
    </main>
  );
};

export default RegisterForm;
