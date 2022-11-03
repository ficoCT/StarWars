import * as React from 'react';
import {useEffect, useState} from "react";
import ReactPaginate from 'react-paginate';
import Card from './Card';
import CardFavorite from './CardFavorite';

export default function Cards() {

    const [url, setUrl] = useState('https://swapi.dev/api/people');
    const [people, setPeople] = useState([]);
    const [favorite, setFavorite] = useState([]);
    const [change, setChange] = useState(true);
    const [pageCount, setPageCount] = useState(5);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    const handleFetch = () => {

        fetch(url)
            .then(checkStatus)
            .then(parseJSON)
            .then(body => {
                setPeople(body.results)
                setIsLoaded(true);
                setPageCount(Math.ceil(body.count/10));
            })
            .catch(error => setError(error))
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

    const handlePageChange = (selectedObject) => {
        let u = "";
        if (selectedObject===1) { u = "https://swapi.dev/api/people"}
        else {
            u = `https://swapi.dev/api/people/?page=${selectedObject.selected}`
        }
        setUrl(u);
        handleFetch();
    };

    const  onFavorite = (c) => {
        setFavorite(prevState => [...prevState, c]);
    };

    useEffect(() => {

        handleFetch();

    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Karty zaraz będą :) ...</div>;
    } else {
        return (
            <div className="table">
                <div className="table__change">
                    <div className="table__change__title"  onClick={() => setChange(true)} >Cards</div>
                    <div className="table__change__title"  onClick={() => setChange(false)}>Favorite</div>
                </div>
                <ul className="table__cards">
                    {
                        change ?
                        people.length === 0 ?
                            "Kart jeszcze nie ma :)"
                            :
                            people.map(card => (
                                <li key={card.name}>
                                    <Card card={card} onFavorite={onFavorite}/>
                                </li>
                            ))
                        :
                            favorite.length === 0 ?
                            "Kart jeszcze nie ma :)"
                            :
                            favorite.map(card => (
                            <li key={card.name}>
                            <CardFavorite card={card} onFavorite={onFavorite}/>
                            </li>
                        ))
                    }
                </ul>
                <ReactPaginate
                    pageCount={pageCount}
                    pageRange={2}
                    marginPagesDisplayed={2}
                    onPageChange={handlePageChange}
                    containerClassName={'paginate__container'}
                    previousLinkClassName={'paginate__page'}
                    breakClassName={'paginate__page'}
                    nextLinkClassName={'paginate__page'}
                    pageClassName={'paginate__page'}
                    disabledClassNae={'paginate__disabled'}
                    activeClassName={'paginate__active'}
                />
            </div>

        );
    }
}