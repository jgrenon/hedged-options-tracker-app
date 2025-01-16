import App from "../../App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Strategies } from "../strategies";
import { Strategy } from "../strategy";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/strategies">
          <Route index element={<Strategies />} />
          <Route path=":id" element={<Strategy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
