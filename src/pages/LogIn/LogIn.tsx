import { Form, Label, Input, Button } from "./LogIn.styled";
import { useDispatch } from "react-redux";
// import authOperations from "redux/auth/authOperations";
import { AppDispatch } from "../../redux/store";

export const LogIn: React.FC = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //   e.preventDefault();
    //   const form = e.currentTarget;
    //   dispatch(
    //     authOperations.logIn({
    //       email: form.elements.email.value,
    //       password: form.elements.password.value,
    //     })
    //   );
    //   form.reset();
  };

  return (
    <main>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Label>
          E-Mail
          <Input type="email" name="email" />
        </Label>
        <Label>
          Password
          <Input type="password" name="password" />
        </Label>
        <Button type="submit">Log In</Button>
      </Form>
    </main>
  );
};
