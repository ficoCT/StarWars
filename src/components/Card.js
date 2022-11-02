import * as React from 'react';
import {useEffect, useState} from "react";
import { FaHeart } from 'react-icons/fa';

export default function Card({card, onFavorite}) {

    const [error, setError] = useState(null);
    const [homeworld, setHomeworld] = useState([]);
    const [manySpecies, setManySpecies] = useState([]);
    const [films, setFilms] = useState([]);
    const [starships, setStarships] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    const handleFetch = () => {

        fetch(card.homeworld)
            .then(checkStatus)
            .then(parseJSON)
            .catch(error => setError(error))
            .then(data => {
                setHomeworld(data.name);
            })
        Promise.all(card.species.map(url =>
            fetch(url)
                .then(checkStatus)
                .then(parseJSON)
                .catch(error => setError(error))
        ))
            .then(data => {
                setManySpecies(data);
            })
        Promise.all(card.films.map(url =>
            fetch(url)
                .then(checkStatus)
                .then(parseJSON)
                .catch(error => setError(error))
        ))
            .then(data => {
                setFilms(data);
            })
        Promise.all(card.starships.map(url =>
            fetch(url)
                .then(checkStatus)
                .then(parseJSON)
                .catch(error => setError(error))
        ))
            .then(data => {
                setStarships(data);
            })
        Promise.all(card.vehicles.map(url =>
            fetch(url)
                .then(checkStatus)
                .then(parseJSON)
                .catch(error => setError(error))
        ))
            .then(data => {
                setVehicles(data);
            })

    }

    function checkStatus(response) {
        if (response.ok) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(new Error(response.statusText));
        }
    }

    function parseJSON(response) {
        return response.json();
    }

    function addFavorite() {
        if (typeof onFavorite !== 'function') return;
        onFavorite(card);
    }

    useEffect(() => {

        handleFetch();

    }, [])

    return (
        <div class="card">
            <div className="card__title">
                {card.name} <br/>
            </div>
            <span className="card__text">
                <div className="card__text__title">
                    Birth Year
                </div>
                <span>{card.birth_year}</span>
                <div className="card__text__title">
                    Created
                </div>
                <span>{card.created}</span>
                <div className="card__text__title">
                    Edited
                </div>
                <span>{card.edited}</span>
                <div className="card__text__title">
                    Eye color
                </div>
                <span>{card.eye_color}</span>
                <div className="card__text__title">
                    Gender
                </div>
                <span>{card.gender}</span>
                <div className="card__text__title">
                    Hair color
                </div>
                <span>{card.hair_color}</span>
                <div className="card__text__title">
                    Height
                </div>
                <span>{card.height}</span>
                <div className="card__text__title">
                    Homeworld
                </div>
                <span>{homeworld}</span>
                <div className="card__text__title">
                    Mass
                </div>
                <span>{card.mass}</span>
                <div className="card__text__title">
                    Skin color
                </div>
                <span>{card.skin_color}</span>
                <div className="card__text__title">
                    Species
                </div>
                {
                    manySpecies.length === 0 ?
                        " "
                        :
                        manySpecies.map(item => (
                            <li key={item.name}>
                                {item.name}
                            </li>
                ))}
                <div className="card__text__title">
                    Films
                </div>
                {
                    films.length === 0 ?
                        " "
                        :
                        films.map(item => (
                            <li key={item.title}>
                                {item.title}
                            </li>
                ))}
                <div className="card__text__title">
                    Starships
                </div>
                {
                    starships.length === 0 ?
                        " "
                        :
                        starships.map(item => (
                            <li key={item.name}>
                                {item.name}
                            </li>
                ))}  <br/>
                <div className="card__text__title">
                    Vehicles
                </div>
                {
                    vehicles.length === 0 ?
                        " "
                        :
                        vehicles.map(item => (
                            <li key={item.name}>
                                {item.name}
                            </li>
                ))}

                <FaHeart
                    onClick={addFavorite}
                    className="heart"
                />
           </span>
        </div>
    );

}