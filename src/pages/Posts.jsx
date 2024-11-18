import React, {useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
        <>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Link to="/" className="cta">Back</Link>
                </div>
                <div className="col-12">
                    <hr />
                    <h1>Latest Posts</h1>
                    <p>See our very latest JSON posts below. Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero fugit deleniti porro! Error fugiat quisquam placeat, sequi, corporis quia soluta earum reiciendis possimus quis nostrum nulla illo qui iure magnam.</p>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row">
                {posts.map((post) => (
                    <div className="col-12 col-md-6 col-lg-4 mb-4" key={post.id}>
                        <div className="post-container">
                            <picture>
                                <source media="(max-width:768px)" srcset="https://placehold.co/812x488" width="812" height="488" />
                                <source media="(min-width:768px)" srcset="https://placehold.co/406x244" width="406" height="244" />
                                <img src="https://placehold.co/406x244" alt="Placeholder Image" loading="lazy" width="406" height="244" class="post-image" />
                            </picture>
                            <div className="content">
                                <h2>{post.title}</h2>
                                <p class="post-excerpt mb-2">{post.body}</p>
                                <Link to={`/posts/${post.id}`} className="post-cta">Read more</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};