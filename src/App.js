import { Outlet, Link } from "react-router-dom";

function App() {

      return (
          <>
          <Link to="/cards">Karty</Link> |{" "}
          <Link to="/my-favorite">Moje ulubione</Link>
          <Outlet />
          </>
      );

}

export default App;
