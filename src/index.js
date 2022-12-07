import React from 'react';
import ReactDOM  from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import { SignIn } from './components/Authorisation/SignIn/SignIn';

// const router = createBrowserRouter([{
//   path:'/',
//   element: <App/>,
  // element: <SignIn/>,

// },
// ])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <RouterProvider router={router}/> */}
    <App/>
  </React.StrictMode>,
)
