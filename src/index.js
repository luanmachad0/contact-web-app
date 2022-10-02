import React from 'react';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client';
import Contact from './Components/Contact/Contact'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function AppRoot() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/contacts" element={<Contact />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}

const container = document.getElementById('root');
const root = createRoot(container); 
root.render(<AppRoot />);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

