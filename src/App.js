import './App.css';
import {useEffect, useState} from "react";
import { Outlet, Link } from "react-router-dom";

function App() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("https://swapi.dev/api/people")
        .then(res => res.json())
        .then(
            (result) => {
              setIsLoaded(true);
                setCards(result);
                console.log('result', result)
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
        )
      fetch("https://swapi.dev/api/people")
          .then(res => res.json())
          .then(
              (result) => {
                  setIsLoaded(true);
                  setCards(result);
                  console.log('result', result)
              },
              (error) => {
                  setIsLoaded(true);
                  setError(error);
              }
          )

  }, [])

      if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
          <>
          <Link to="/cards">Karty</Link> |{" "}
          <Link to="/my-favorite">Moje ulubione</Link>
          <ul>
              {cards.results
                .map(card => (
                    <li key={card.name}>
                         Name: {card.name}
                        {card.species}
                        {/*{card.homeworld}*/}
                        {/*Gender: {card.gender}*/}
                        {/*{card.hair_color}*/}
                        {/*{card.skin_color}*/}
                        {/*{card.mass}*/}
                        {/*{card.films}*/}
                        {/*{card.vehicles}*/}
                        {/*{card.starships}*/}
                        {/*{card.species === 'n/a' ? '-': card.species}*/}
                    </li>
              ))}
          </ul>
          <Outlet />
          </>
      );
    }

}

export default App;
