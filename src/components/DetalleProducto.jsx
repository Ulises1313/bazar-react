import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DetalleProducto = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();

  const getProduct = useCallback(async () => {
    try {
      let route = `https://api-bazar-zfls.onrender.com/api/products/${id}`;
      const res = await axios.get(route);
      setProduct(res.data);
    } catch (error) {
      console.error("Error fetching product:", error);
      // Manejar el error según tus necesidades
    }
  }, [id]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  const navigate = useNavigate();

  const handleLogout = () =>{
    navigate('/');
  }

  return (
    <div className="bg-white">
         <button className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 p-6 m-4" onClick={handleLogout}>Ir al inicio</button>
      <div className="pt-6">
        
        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        
          {product.images && product.images.length > 0 && (
            <>
              <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                <img
                  src={product.images[0]}
                  alt={product.images[0]}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                {product.images.slice(1, 3).map((image, index) => (
                  <div
                    key={index}
                    className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg"
                  >
                    <img
                      src={image}
                      alt={image}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                ))}
              </div>
              <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                <img
                  src={product.images[3]}
                  alt={product.images[3]}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </>
          )}
        </div>

        {/* Product info */}
        <div className="mx-auto maxs-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.title}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              ${product.price}
            </p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <p className="sr-only"> out of 5 stars</p>
                <a className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Rating: {product.rating}
                </a>
              </div>
            </div>

            <form className="mt-10">
              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to bag
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Discount</h3>
              <p>{product.discountPercentage}%</p>
              <div className="mt-4"></div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Category</h2>
              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product.category}</p>
              </div>
            </div>
            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Stock</h2>
              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product.stock}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
