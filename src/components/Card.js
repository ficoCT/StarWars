import * as React from 'react';
import {useEffect, useState} from "react";

export default function Card({card}) {

    console.log('card', card);

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

    useEffect(() => {

        handleFetch();

    }, [])

    return (
        <>
            {card.name} <br/>
            {card.birth_year} <br/>
            {card.created} <br/>
            {card.edited} <br/>
            {card.eye_color} <br/>
            {card.gender} <br/>
            {card.hair_color} <br/>
            {card.height} <br/>
            {homeworld} <br/>
            {card.height} <br/>
            {card.mass} <br/>
            {card.skin_color} <br/>
            {
                manySpecies.length === 0 ?
                    "------"
                    :
                    manySpecies.map(item => (
                        <li key={item}>
                            {item.name}
                        </li>
            ))}  <br/>
            {
                films.length === 0 ?
                    "------"
                    :
                    films.map(item => (
                        <li key={item}>
                            {item.title}
                        </li>
            ))}  <br/>
            {
                starships.length === 0 ?
                    "------"
                    :
                    starships.map(item => (
                        <li key={item}>
                            {item.name}
                        </li>
            ))}  <br/>
            {
                vehicles.length === 0 ?
                    "------"
                    :
                    vehicles.map(item => (
                        <li key={item}>
                            {item.name}
                        </li>
            ))}  <br/>
        <br/>
        </>
    );

}