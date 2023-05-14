import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import App from './App';
import ErrorPage from './components/ErrorPage';
import Counter from './components/Counter';
import UserTable, { loader as userListLoader } from './components/UserTable';
import User, { loader as userLoader } from './components/User';
import Login from './components/Login';
import Home, { loader as homeLoader, action as homeAction } from './components/Home';

export const appBaseName = window.location.protocol + '//' + window.location.host;
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Home />} loader={homeLoader} action={homeAction} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/users" element={<UserTable />} loader={userListLoader} />
        <Route path="/users/:userId" element={<User />} loader={userLoader} />
        <Route path="/login" element={<Login />}>
        </Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();