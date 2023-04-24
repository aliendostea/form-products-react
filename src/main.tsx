import { Suspense, lazy, useState } from "react";
import ReactDOM from "react-dom";
import { FallbackAppOnLoad } from "./components";
import { Login } from "./login";
const App = lazy(() => import("./App"));
/* const Login = lazy(() =>
  import("./login").then(({ Login }) => ({
    default: Login,
  }))
); */

function RenderApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const changeLoggedIn = () => {
    setIsLoggedIn(true);
  };

  if (isLoggedIn === false) {
    return (
      <div>
        <Login changeLoggedIn={changeLoggedIn} />
      </div>
    );
  }

  return (
    <Suspense fallback={<FallbackAppOnLoad />}>
      <App />
    </Suspense>
  );
}

ReactDOM.render(<RenderApp />, document.getElementById("root"));
