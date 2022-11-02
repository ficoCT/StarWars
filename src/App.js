import { Outlet, Link } from "react-router-dom";
import './App.scss'

function App() {

      return (
          <div className="container">
              <div className="links">
                  <Link className="links__link" to="/cards">Cards</Link>
                  <Link className="links__link" to="/my-favorite">Favorite</Link>
              </div>
              <Outlet />
          </div>
      );

}

export default App;
