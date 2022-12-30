import { Form, Label, Input, Button } from "./LogIn.styled";
import { useDispatch } from "react-redux";
import authOperations from "../../redux/auth/authOperations";
import { useRef } from "react";

type User = {
  email: string;
  password: string;
};

const LogIn: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<any>();
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user: User = {
      email: emailInput.current?.value!,
      password: passwordInput.current?.value!,
    };
    dispatch(authOperations.logIn(user));
    e.currentTarget.reset();
  };

  return (
    <main>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Label>
          E-Mail
          <Input type="email" name="email" ref={emailInput} />
        </Label>
        <Label>
          Password
          <Input type="password" name="password" ref={passwordInput} />
        </Label>
        <Button type="submit">Log In</Button>
      </Form>
    </main>
  );
};

export default LogIn;
