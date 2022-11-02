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
        console.log('handleFetch');
        fetch(url)
            .then(checkStatus)
            .then(parseJSON)
            .then(body => {
                console.log('body', body);
                setUrl(body.next);
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
            <>
                <br />
                <br />
                <ul>
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
                <br />
                <br />
                <ReactPaginate
                    pageCount={pageCount}
                    pageRange={2}
                    marginPagesDisplayed={2}
                    onPageChange={handlePageChange}
                    containerClassName={'container'}
                    previousLinkClassName={'page'}
                    breakClassName={'page'}
                    nextLinkClassName={'page'}
                    pageClassName={'page'}
                    disabledClassNae={'disabled'}
                    activeClassName={'active'}
                />
            </>

        );
    }
}