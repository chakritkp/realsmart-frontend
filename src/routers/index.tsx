import { Navigate, Route, Routes } from "react-router-dom";
import cookies from "cookie-universal";
import SignIn from "../pages/SignIn";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import SignUpForm from "../pages/SignUpForm";
type AuthRouteProps = {
  children: React.ReactNode;
};

let Routers = () => {
  const Cookies = cookies();

  const AuthTokenRoute = ({ children }: AuthRouteProps) => {
    let token = Cookies.get("token");
    return token ? <>{children}</> : <Navigate to="/sign-in" />;
  };

  const AuthNoTokenRoute = ({ children }: AuthRouteProps) => {
    let token = Cookies.get("token");
    return !token ? <>{children}</> : <Navigate to="/home" />;
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthNoTokenRoute>
            <SignUpForm />
          </AuthNoTokenRoute>
        }
      />
      <Route
        path="/sign-in"
        element={
          <AuthNoTokenRoute>
            <SignIn />
          </AuthNoTokenRoute>
        }
      />
      <Route
        path="/home"
        element={
          <AuthTokenRoute>
            <Home />
          </AuthTokenRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
