import Landing from "./components/Landing";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Cart from "./components/Cart";
import Rewards from "./components/Rewards";

function PrivateOutlet() {
  const auth = localStorage.getItem("isLoggedIn") === "true";
  return auth ? <Outlet /> : <Navigate to="/" />;
}

const App = () => {
  return (
    <div className="bg-[#F4FFFE] h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/cart" element={<PrivateOutlet />}>
            <Route path="" element={<Cart />} />
          </Route>
          <Route path="/rewards" element={<PrivateOutlet />}>
            <Route path="" element={<Rewards />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
