import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { lazy, Suspense } from "react";
// import authOperations from "./redux/auth/authOperations";
import { selectIsRefreshing } from "./redux/selectors";

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
  // const dispatch = useDispatch<any>();
  const isRefreshing = useSelector(selectIsRefreshing);

  // useEffect(() => {
  //   dispatch(authOperations.fetchCurrentUser());
  // }, [dispatch]);

  return (
    <>
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
    </>
  );
};

export default App;
