import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { authApp } from "@/config/firebase-config";

const Login = ({ changeLoggedIn }: any) => {
  const [registerUserEmail, setRegisterUserEmail] = useState("");
  const [, setRegisterUserPsw] = useState("");
  const [, setLoginUserEmail] = useState("");
  const [, setLoginUserPsw] = useState("");
  const [user, setUser] = useState<any>({});

  const register = async (e: any) => {
    e.preventDefault();

    try {
      const user = await createUserWithEmailAndPassword(
        authApp,
        registerUserEmail,
        "4444444"
      );
      /*  const password = await createUserWithEmailAndPassword() */
      console.log("register user", user);
    } catch (error) {
      console.log("error Register", error);
    }
  };

  onAuthStateChanged(authApp, (currentUser: any) => {
    setUser(currentUser);
  });

  const logout = async () => {
    try {
      const user = await signOut(authApp);

      console.log("logout", user);
    } catch (error) {
      console.log("error logout", error);
    }
  };

  const login = async (e: any) => {
    e.preventDefault();

    try {
      const user = await signInWithEmailAndPassword(
        authApp,
        "development@somoszentec.com",
        "4444444"
      );

      console.log("login user", user);
    } catch (error) {
      console.log("error Register", error);
    }
  };

  return (
    <div>
      <div>
        <h3>Register User</h3>
        <form onSubmit={register}>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setRegisterUserEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Password"
            onChange={(e) => setRegisterUserPsw(e.target.value)}
          />
          <button>Create User</button>
        </form>
      </div>
      <br />
      <br />
      <br />
      <div>
        <h3>Login User</h3>
        <form onSubmit={login}>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setLoginUserEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Password"
            onChange={(e) => setLoginUserPsw(e.target.value)}
          />
          <button>Login User</button>
        </form>
      </div>
      <br />
      <br />
      <br />
      <h3>User Logged In: {user?.email} </h3>
      <br />
      <button onClick={logout}>Sign Out</button>
      <br />
      <br />
      <br />
      <button onClick={() => changeLoggedIn()}>changeLoggedIn</button>
    </div>
  );
};

export default Login;
