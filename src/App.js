import { Outlet, Link } from "react-router-dom";
import './App.scss'

function App() {

      return (
          <div>
          <Link to="/cards">Karty</Link> |{" "}
          <Link to="/my-favorite">Moje ulubione</Link>
          <Outlet />
          </div>
      );

}

export default App;
