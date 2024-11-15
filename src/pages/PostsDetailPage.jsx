import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export const PostsDetailPage = () => {
    const { id: postId } = useParams(); // Get the post ID from the URL
    const [post, setPost] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [comments, setComments] = useState([]);
    const [loadingPost, setLoadingPost] = useState(true);
    const [loadingComments, setLoadingComments] = useState(true);

    useEffect(() => {
        // Fetch the post data
        axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then((response) => {
                const data = response.data;
                setPost(data);
                setLoadingPost(false);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
                setLoadingPost(false);
            });

        // Fetch the photos for this post' album (using postId as the albumId)
        axios.get(`https://jsonplaceholder.typicode.com/albums/${postId}/photos?_limit=12`)
            .then((response) => {
                const data = response.data;
                setPhotos(data);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });

        // Fetch the comments data
        axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
            .then((response) => {
                const data = response.data;
                setComments(data);
                setLoadingComments(false);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
                setLoadingComments(false);
            });
    }, [postId]);

    if (loadingPost) return <p>Loading...</p>;

    if (!post) return <p>Post not found.</p>;

    const extractDimensions = (url) => {
        // example URL: https://via.placeholder.com/150/92c952
        const imageUrl = url.split('/')[3]; // 150/92c952
        const dimensions = imageUrl.split('/')[0]; // 150
        return dimensions;
    };

    return (
        <div className="container">
            <div className="row">
                <Link to="/posts" className="text-link">Back</Link>
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
                    <div className="row">
                        {photos.map((photo) => {
                            const dimensions = extractDimensions(photo.thumbnailUrl);

                            return(
                                <div className="col-12 col-lg-4" key={photo.id}>
                                    <img src={photo.thumbnailUrl} alt={photo.title} width={dimensions} height={dimensions} />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="col-12 col-md-3">User ID: {post.userId}</div>
            </div>
        </div>
    );
}