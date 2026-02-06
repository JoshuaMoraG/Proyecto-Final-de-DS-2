import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrarGastos from "./components/pages/RegistrarGastos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/register-expense" element={<RegistrarGastos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
