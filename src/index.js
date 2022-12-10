import React from 'react';
import ReactDOM  from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import { SignIn } from './components/Authorisation/SignIn/SignIn';
import { HomePage } from './components/HomePage/HomePage';
import { SignUp } from './components/Authorisation/SignUp/SignUp';
import { UserProfile } from './components/UserProfile/UserProfile';

const router = createBrowserRouter([
  {
  path:'/',
  element: <SignUp/>,
  },
  {
    path:'authorization/',
    element: <SignIn/>
  },
  {
    path: 'homepage/',
    element:<HomePage/>,
    // children:[
    //   {
    //     path: 'homepage/userProfile',
    //     element: <UserProfile/>,
    //   }
    // ]
  },
  {
    path: 'userProfile/',
    element: <UserProfile/>
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
