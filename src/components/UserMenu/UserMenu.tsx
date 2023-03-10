import { Wrapper, User, Button } from "./UserMenu.styled";
import { useSelector, useDispatch } from "react-redux";
import { selectEmail, selectIsLoggedIn } from "../../redux/selectors";
import authOperations from "../../redux/auth/authOperations";
import { RootState } from "../../redux/selectors";

const UserMenu: React.FC = (): null | JSX.Element => {
  const email = useSelector<RootState, string | null>(selectEmail);
  const isLoggedIn = useSelector<RootState, boolean>(selectIsLoggedIn);
  const dispatch = useDispatch<any>();
  return (
    <>
      {isLoggedIn && (
        <Wrapper>
          <User>{email}</User>
          <Button onClick={() => dispatch(authOperations.logOut())}>
            Log Out
          </Button>
        </Wrapper>
      )}
    </>
  );
};

export default UserMenu;
