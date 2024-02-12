import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";



function PrivateRoute({ children }: any) {
  const { user, token } = useSelector((state: any) => state.login);
  const isUserTokenExpired = isExpired(token);

  if (isUserTokenExpired) {
    localStorage.clear()
    // toast.warning('Kindly login back to continue using yeboo')
    return <Navigate to="/auth/login" replace />;
  }

  if (!token || !user) {
    return <Navigate to="/auth/login" replace />;
  }
  return children;
}
export default PrivateRoute;