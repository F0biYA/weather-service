
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, loggedIn }) {
    
 //return loggedIn ? children : <Navigate to="/signin" />;
 return localStorage.getItem('login') === 'true'  ? children : <Navigate to="/signin" />;
}
export default ProtectedRoute;
