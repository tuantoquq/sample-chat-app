import * as React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './pages/home/Home';
import Login from "./pages/login/Login";
import Register from './pages/register/Register';


function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
