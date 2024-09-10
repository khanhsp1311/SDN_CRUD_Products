import Product from './component/Product';
import AddProduct from './component/AddProduct';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Product />}></Route>
          <Route path='/product/add' element={<AddProduct />}></Route>
          <Route path='/product/update/:id' element={<AddProduct />}></Route>
        </Routes>
      </BrowserRouter>
    </div>



  );
}

export default App;
