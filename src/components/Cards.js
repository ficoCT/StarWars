import * as React from 'react';
import {useEffect, useState} from "react";
import ReactPaginate from 'react-paginate';
import Card from './Card';

export default function MyFavorite() {

    const [url, setUrl] = useState('https://swapi.dev/api/people');
    const [people, setPeople] = useState([]);
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
                <ul className="table__cards">
                    {
                        people.length === 0 ?
                            "Karty zaraz będą :)"
                            :
                            people.map(card => (
                                <li key={card.name}>
                                    <Card card={card}/>
                                </li>
                    ))}
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