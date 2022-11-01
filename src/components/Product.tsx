import Card from "./Card";

const Product = ({ title }: any) => {
  return (
    <div className=" mt-12">
      <h3 className="font-semibold  text-2xl m-4">{title}</h3>
      <div className="flex flex-nowrap w-screen gap-x-8 overflow-x-auto p-4">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Product;
