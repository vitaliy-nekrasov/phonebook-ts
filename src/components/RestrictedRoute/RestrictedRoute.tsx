import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/selectors";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/selectors";

interface IProps {
  component: JSX.Element;
  redirectTo: string;
}

const RestrictedRoute: React.FC<IProps> = ({ component, redirectTo = "/" }) => {
  const isLoggedIn = useSelector<RootState, boolean>(selectIsLoggedIn);
  return isLoggedIn ? <Navigate to={redirectTo} /> : component;
};

export default RestrictedRoute;
