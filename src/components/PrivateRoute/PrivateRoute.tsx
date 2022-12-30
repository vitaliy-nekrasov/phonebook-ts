import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectIsRefreshing } from "../../redux/selectors";
import { RootState } from "../../redux/selectors";

interface IProps {
  component: JSX.Element;
  redirectTo: string;
}

const PrivateRoute: React.FC<IProps> = ({ component, redirectTo = "/" }) => {
  const isLoggedIn = useSelector<RootState, boolean>(selectIsLoggedIn);
  const isRefreshing = useSelector<RootState, boolean>(selectIsRefreshing);
  const shouldRedirect: boolean = !isLoggedIn && !isRefreshing;
  return shouldRedirect ? <Navigate to={redirectTo} /> : component;
};

export default PrivateRoute;
