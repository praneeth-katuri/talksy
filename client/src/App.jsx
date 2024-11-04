import { BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );
};

export default App;
