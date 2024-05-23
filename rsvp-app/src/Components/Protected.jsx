import { Navigate } from "react-router-dom";
const Protected = ({ isAuthorized, children }) => {
  if (!isAuthorized) {
    return <Navigate to="/authorize" replace />;
  }
  return children;
};
export default Protected;