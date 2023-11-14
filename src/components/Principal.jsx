import { useState } from "react";
import logoImage from "../assets/Logo.png";
import {useNavigate} from 'react-router-dom'

const Principal = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    
    setSearchValue(e.target.value);
  };

  const handleClick = () => {
    navigate(`/listProducts/${searchValue}`);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-xl w-full bg-white p-8 rounded-md shadow-md text-center">
        <img
          src={logoImage}
          alt="Bazar Online Logo"
          className="mx-auto mb-2"
          style={{ maxWidth: "300px" }}
        />
        <div className="mb-6">
          <label
            htmlFor="search"
            className="block text-lg font-medium text-gray-600"
          >
            Buscar:
          </label>
          <input
            type="text"
            id="search"
            name="search"
            className="mt-1 p-3 w-full border rounded-md"
            onChange={handleChange}
            value={searchValue}
          />
        </div>
        <button
          className="bg-indigo-500 text-white px-6 py-3 rounded-md text-lg"
          onClick={handleClick}
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default Principal;
