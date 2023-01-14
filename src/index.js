import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import EditMovie from './componets/EditMovie';
import ErrorPage from './componets/ErrorPage';
import Generes from './componets/Generes';
import Graphql from './componets/GraphQL';
import Home from './componets/Home';
import Login from './componets/Login';
import ManageCatelogue from './componets/ManageCatelogue';
import Movie from './componets/Movie';
import Movies from './componets/Movies';
import OneGenre from './componets/OneGenre';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/movies", element: <Movies /> },
      { path: "/movies/:id", element: <Movie /> },
      { path: "/genres", element: <Generes /> },
      { path: "/genres/:id", element: <OneGenre /> },
      { path: "/admin/movies/0", element: <EditMovie /> },
      { path: "/admin/movies/:id", element: <EditMovie /> },
      { path: "/manage-catelogue", element: <ManageCatelogue /> },
      { path: "/graphql", element: <Graphql /> },
      { path: "/login", element: <Login /> }
    ]
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

