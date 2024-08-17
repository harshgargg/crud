import './App.css';
import Products from './components/Products';
import InsertProduct from './components/InsertProduct'
import UpdateProduct from './components/UpdateProduct';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';




function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route exact path="/" element={<Navigate to={'/products'} />} />
          <Route path="/products" element={<Products />} />
          <Route path="/insertproduct" element={<InsertProduct />} />
          <Route path="/updateproduct/:id" element={<UpdateProduct />} />

        </Routes>

      </Router>


    </div>
  );
}

export default App;