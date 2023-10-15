import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom';
import Home from './page/Home';
import Menu from './page/Menu';
import NewProduct from './page/NewProduct';
import Login from './page/login';
import SignUp from './page/SignUp';
import {store} from './redux/index';
import {Provider} from "react-redux";
import Cart from './page/Cart';
import Order from './page/Order';

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
        <Route index element={<Home />}/>
        <Route path='menu/:filterby' element={<Menu/>}/>
        <Route path='order' element={<Order/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='newproduct' element={<NewProduct/>}/>
        <Route path='signup' element={<SignUp/>}/>
        <Route path='cart' element={<Cart/>}/>
    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider  store={store}>
  <RouterProvider router={router}/>
   </Provider>
);
reportWebVitals();
