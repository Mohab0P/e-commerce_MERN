import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/Product";
import { baseUrl } from "../constants/baseUrl";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${baseUrl}/product`);
        const data = await response.json();
        setProducts(data);
      } catch {
        setError(true);
      }
    };
    fetchProducts();
  }, []);
  if (error) {
    return <div className="text-red-500 text-center text-xl text- bg-slate-600 p-5 rounded-xl mt-20 h-fit ">Something went wrong</div>;
  }
  return (
    <div className="container mx-auto">
      <div className="grid gap-2 mt-4 md:grid-cols-3">
        {products.map((p) => (
          <ProductCard {...p} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
