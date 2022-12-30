import { Outlet } from "react-router-dom";
import {
  Header,
  Nav,
  StyledLink,
  Title,
  Wrapper,
  StyledLinkContacts,
  LinkWrapper,
} from "./Navigation.styled";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/selectors";
import { Suspense, lazy } from "react";

const UserMenu = lazy(() => import("../UserMenu/UserMenu"));

const Navigation: React.FC = (): JSX.Element => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div>
      <Header>
        <Nav>
          <Title>Phonebook</Title>
          {isLoggedIn ? (
            <Wrapper>
              <StyledLinkContacts to="/contacts">Contacts</StyledLinkContacts>
              <UserMenu />
            </Wrapper>
          ) : (
            <LinkWrapper>
              <StyledLink to="/register">Sign Up</StyledLink>
              <StyledLink to="/login">Log In</StyledLink>
            </LinkWrapper>
          )}
        </Nav>
      </Header>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Navigation;
