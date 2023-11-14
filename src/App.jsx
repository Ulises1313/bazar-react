
import Principal from "./components/Principal";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import ListProducts from "./components/ListProducts";
import DetalleProducto from "./components/DetalleProducto";
import NotFoudPage from "./components/NotFoudPage";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Principal/>}/>
        <Route path="/listProducts/:palabra" element={<ListProducts/>}/>
        <Route path="/listProducts/detalle/:id" element={<DetalleProducto/>}/>
        <Route path="*" element={<NotFoudPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
