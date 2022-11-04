import Card from "./Card";

interface ProductDetail {
  _id: string;
  category: string;
  name: string;
  productId: number;
  price: number;
  quantity: number;
  createdAt: number;
  productImage: string;
}

const Product = ({ title, data }: any) => {
  return (
    <div className="mt-12">
      <h3 className="font-semibold  text-2xl m-4">{title}</h3>
      <div className="flex flex-nowrap w-screen gap-x-8 overflow-x-auto p-4">
        {data.map((product: ProductDetail) => (
          <div key={product._id}>
            <Card product={product} category={title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
