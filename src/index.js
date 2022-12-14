import React from 'react';
import ReactDOM  from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SignIn } from './components/Authorisation/SignIn/SignIn';
import { HomePage } from './components/HomePage/HomePage';
import { SignUp } from './components/Authorisation/SignUp/SignUp';
import { UserProfile } from './components/UserProfile/UserProfile';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stocks } from './components/HomePage/Footer/Stocks/Stocks';
import { createStore } from 'redux';
import { reducer } from './Redux/Redux';
import { Provider } from 'react-redux';
import { Basket } from './components/Basket/Basket';

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
    path: 'homepage',
    element:<HomePage/>,
  },
  {
   path: 'userProfile',
   element: <UserProfile/>
  },
  {
   path: 'stocks',
   element: <Stocks/>
  },
  {
   path: 'basket',
   element: <Basket/>
  },
]);

const store = createStore(reducer);
const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <React.StrictMode>
              <RouterProvider router={router}/>
            </React.StrictMode>
          </QueryClientProvider>
  </Provider>
)
