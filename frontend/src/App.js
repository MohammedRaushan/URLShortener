import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import UserHomePage from "./components/UserHomePage";
import GenerateLink from "./components/generateLink/GenerateLink";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<UserHomePage/>} />
      <Route path="/create-account" element={<UserLogin/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
