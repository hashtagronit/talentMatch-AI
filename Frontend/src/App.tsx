import { BrowserRouter } from "react-router";
import { AppRoutes } from "./app.routes";
import { useLoadUser } from "./hooks/useLoadUser";

function App() {
  useLoadUser(); //this will load the user data in user context on reload
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
