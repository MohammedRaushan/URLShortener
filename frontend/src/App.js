import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserDashboard from "./components/UserDashboard";
import UserLogin from "./components/UserLogin";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/create-account" element={<UserLogin/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
