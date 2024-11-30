import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import UserHomePage from "./components/UserHomePage";
import RedirectPage from "./components/RedirectPage";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<UserHomePage/>} />
      <Route path="/create-account" element={<UserLogin/>} />
      <Route path="/*" element={<RedirectPage/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
