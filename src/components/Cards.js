import * as React from 'react';
import {useEffect, useState} from "react";

export default function Cards({}) {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [people, setPeople] = useState([]);
    const [films, setFilms] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [starships, setStarships] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    const downloadData = async() => {

        const urls = [
            "https://swapi.dev/api/people",
            "https://swapi.dev/api/films",
            "https://swapi.dev/api/planets",
            "https://swapi.dev/api/starships",
            "https://swapi.dev/api/vehicles"
        ];

        const data = {}

        Promise.all(urls.map(url =>
            fetch(url)
                .then(checkStatus)
                .then(parseJSON)
                .catch(error => setError(error))
        ))
            .then(apiData => {
        
                data.people = apiData[0].results;
                data.films = apiData[1].results;
                data.planets = apiData[2].results;
                data.starships = apiData[3].results;
                data.vehicles = apiData[4].results;

            })

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

        return data;

    }

    useEffect(() => {

        downloadData().then(data => {

            setIsLoaded(true);
            setPeople(data.people);
            setFilms(data.results);
            setPlanets(data.results);
            setStarships(data.results);
            setVehicles(data.results);

        });

    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Jeszcze trochę i zaraz się załaduje ... :)</div>;
    } else {
        return (
                <h1>Cards</h1>
        );
    }

}