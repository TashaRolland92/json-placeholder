import React, {useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts?_limit=12')
        .then((response) => {
            const data = response.data;
            setPosts(data);
        })
        .catch((error) => {
            console.error('Error fetching data: ', error);
        });
    }, []);

    return(
        <div className="container">
            <div className="row">
                <Link to="/" className="text-link">Back</Link>
                {posts.map((post) => (
                    <div className="col-12 col-md-6 col-lg-4" key={post.id}>
                        <picture>
                            <source media="(min-width:768px)" srcset="https://placehold.co/406x244" width="406" height="244" />
                            <source media="(max-width:768px)" srcset="https://placehold.co/812x488" width="812" height="488" />
                            <img src="https://placehold.co/406x244" alt="Placeholder Image" loading="lazy" width="406" height="244" />
                        </picture>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                        <Link to={`/posts/${post.id}`} className="text-link">Read more</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};