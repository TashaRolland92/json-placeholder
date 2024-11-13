import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const PostsDetailPage = () => {
    const { id } = useParams(); // Get the post ID from the URL
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loadingPost, setLoadingPost] = useState(true);
    const [loadingComments, setLoadingComments] = useState(true);

    // Fetch the post data
    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then((response) => {
                const data = response.data;
                setPost(data);
                setLoadingPost(false);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
                setLoadingPost(false);
            });
    }, [id]);

    // Fetch the comments data
    useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
        .then((response) => {
            const data = response.data;
            setComments(data);
            setLoadingComments(false);
            console.log('comments', data);
        })
        .catch((error) => {
            console.error('Error fetching data: ', error);
            setLoadingComments(false);
        });
    }, [id]);

    if (loadingPost) return <p>Loading...</p>;

    if (!post) return <p>Post not found.</p>;

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>{post.title}</h1>
                </div>
                <div className="col-12 col-md-3">Post ID: {post.id}</div>
                <div className="col-12 col-md-6">
                    <p>{post.body}</p>
                    <div className="comments">
                        <h3>Users Comments</h3>
                        {loadingComments ? (
                            <p>Loading comments...</p>
                        ) : comments.length > 0 ? (
                            <ul>
                                {comments.map((comment) => (
                                    <li key={comment.id}>
                                        <h4>User: {comment.email}</h4>
                                        <h5>Comment Name: {comment.name}</h5>
                                        <p>{comment.body}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No comments found for this post</p>
                        )}
                    </div>
                </div>
                <div className="col-12 col-md-3">User ID: {post.userId}</div>
            </div>
        </div>
    );
}