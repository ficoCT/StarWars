import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Cards from './components/Cards';
import MyFavorite from './components/MyFavorite';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />}>
              <Route path="cards" element={<Cards />} />
              <Route path="my-favorite" element={<MyFavorite />} />
              <Route
                  path="*"
                  element={
                      <main>
                          <p>Tutaj niestety nic nie ma :(</p>
                      </main>
                  }
              />
              </Route>
          </Routes>
      </BrowserRouter>,
  </React.StrictMode>
);

reportWebVitals();
