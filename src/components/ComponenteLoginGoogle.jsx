import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice"; // Import the addUser action from your Redux slice
import { useSelector } from 'react-redux';
const GoogleLoginComponent = () => { // Cambiar el nombre de la función
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nombreLocal = useSelector(state => state.local.nombreLocal)
  const responseGoogle = (response) => {
    const userObject = jwt_decode(response.credential);
    const { given_name, family_name, email } = userObject; // Asegúrate de que las claves coincidan con las propiedades del estado de Redux
    dispatch(login({
      nombre: given_name,
      apellido: family_name,
      email: email
    }));
    if (nombreLocal) {
      navigate("/local"); // Si hay un local, redirige a /local
    } else {
      navigate("/"); // Si no hay local, redirige a /
    }  }
  return (
    <div className="">
      <div className="bg-transparent p-4 rounded-lg">
        <GoogleOAuthProvider 
          clientId={'420684076285-9k2u67r1t0nls4k990rj130ustm9fulf.apps.googleusercontent.com'}
        >
          <GoogleLogin
            render={(renderProps) => (
              <button
                type="button"
                className=""
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Sign in with google
              </button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy="single_host_origin"
          />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}

export default GoogleLoginComponent;