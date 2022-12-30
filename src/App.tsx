import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { lazy, Suspense, useEffect } from "react";
import authOperations from "./redux/auth/authOperations";
import { selectIsRefreshing } from "./redux/selectors";
import { Wrapper } from "./App.styled";
import { RootState } from "./redux/selectors";

const Navigation = lazy(() => import("./components/Navigation/Navigation"));
const ContactList = lazy(() => import("./pages/ContactList/ContactList"));
const RegisterForm = lazy(() => import("./pages/RegisterForm/RegisterForm"));
const LogIn = lazy(() => import("./pages/LogIn/LogIn"));
const RestrictedRoute = lazy(
  () => import("./components/RestrictedRoute/RestrictedRoute")
);
const PrivateRoute = lazy(
  () => import("./components/PrivateRoute/PrivateRoute")
);

const App: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<any>();
  const isRefreshing = useSelector<RootState, boolean>(selectIsRefreshing);

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return (
    <Wrapper>
      {!isRefreshing && (
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Navigation />}>
              <Route
                path="contacts"
                element={
                  <PrivateRoute
                    redirectTo="/login"
                    component={<ContactList />}
                  />
                }
              />
              <Route
                path="register"
                element={
                  <RestrictedRoute
                    redirectTo="/contacts"
                    component={<RegisterForm />}
                  />
                }
              />
              <Route
                path="login"
                element={
                  <RestrictedRoute
                    redirectTo="/contacts"
                    component={<LogIn />}
                  />
                }
              />
            </Route>
          </Routes>
        </Suspense>
      )}
    </Wrapper>
  );
};

export default App;
