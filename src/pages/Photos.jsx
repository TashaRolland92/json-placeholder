import React, {useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

export const Photos = () => {
    const id = useParams();
    const [photos, setPhotos] = useState([]);
    const [loadingPhotos, setLoadingPhotos] = useState(true);

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/albums/${id}/photos`)
        .then((response) => {
            const data = response.data;
            setPhotos(data);
            setLoadingPhotos(false);
        })
        .then((error) => {
            console.error('Error fetching data: ', error);
            setLoadingPhotos(false);
        });
    }, [id]);

    return(
        <div className="container">
            <div className="row">
                <Link to="/" className="text-link">Back</Link>
                <div className="col-12 col-lg-4">

                </div>
            </div>
        </div>
    );
};