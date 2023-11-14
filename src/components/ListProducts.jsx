import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
const ListProducts = () => {
  const { palabra } = useParams();
  const [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const getProducts = useCallback(async (word) => {
    try {
      const route = `https://api-bazar-zfls.onrender.com/api/products/search?title=${word}`;
      const res = await axios.get(route);
      const responseData = res.data;

      setProducts(responseData);
      setCount(responseData.length);
    } catch (error) {
      console.error("Error fetching products:", error);
      // Manejar el error según tus necesidades
    }
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchProduct(value);
    getProducts(value);
  };

  useEffect(() => {
    getProducts(palabra);
  }, [getProducts, palabra]);

  const handleClick = (id) => {
    navigate(`/listProducts/detalle/${id}`);
    console.log(id);
  };


  const handleLogout = () =>{
    navigate('/');
  }

  return (
    <>
      <div className="bg-white">
      <button className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 p-6 m-4" onClick={handleLogout}>Ir al inicio</button>
      
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="mt-6 mb-6">
            <label htmlFor="search" className="sr-only">
              Buscar productos
            </label>
            <input
              type="text"
              id="search"
              name="search"
              className="p-3 w-full border rounded-md"
              placeholder="Buscar productos..."
              value={searchProduct}
              onChange={handleChange}
            />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Productos
          </h2>
          <p>Resultado de la busqueda: {count}</p>
          {products == "No se encontraron coincidencias" ? (
            <div
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
              role="alert"
            >
              <p className="font-bold">Alerta!</p>
              <p>No se encontraron coincidencias</p>
            </div>
          ) : (
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group relative border border-gray-300 rounded-md p-4"
                  onClick={() => handleClick(product.id)}
                >
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={product.images[0]}
                      alt={product.images[0]}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={product.href}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.title}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Rating: {product.rating}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.description}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {product.category}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ListProducts;
