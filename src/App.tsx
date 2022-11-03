import Header from "./components/Header";
import Landing from "./components/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./components/Cart";

const App = () => {
  return (
    <div className="bg-[#F4FFFE] h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/cart" element={<Cart />} />
          {/*<Route path="teams" element={<Teams />}>
              <Route path=":teamId" element={<Team />} />
              <Route path="new" element={<NewTeamForm />} />
              <Route index element={<LeagueStandings />} />
            </Route> */}
        </Routes>
      </BrowserRouter>
      {/* <div className="bg-[#F4FFFE] h-screen">
        <Header />
        <Landing /> */}
    </div>
  );
};

export default App;
