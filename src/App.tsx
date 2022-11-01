import Header from "./components/Header";
import Landing from "./components/Landing";
import Product from "./components/Product";

const App = () => {
  return (
    <div className="bg-[#F4FFFE] h-screen">
      <Header />
      <Landing />
      <Product title="Traditionals" />
      <Product title="Accessories" />
      <Product title="Western" />
    </div>
  );
};

export default App;
