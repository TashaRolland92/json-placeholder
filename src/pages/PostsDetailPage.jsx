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

    const renderPostBody = () => {
        if(post.body.length < 600) {
            return (
                <>
                    <p>{post.body}. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde error esse vitae minus eum illum doloremque. Quaerat laudantium iste ratione animi dolore harum nisi sint, quam impedit dicta, totam quod.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut iusto culpa cum ducimus aspernatur? Quod, perferendis molestiae repellendus, expedita hic quasi mollitia, dolor autem repudiandae magnam aliquam unde modi fuga?</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident doloremque, exercitationem error quia molestias maxime. Dolore repellat iusto ex ipsum laborum magni deserunt dignissimos? Minus fugiat sint sit obcaecati nemo!</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore provident rem quam, labore eaque voluptate saepe dolorem nemo dolorum nulla delectus laboriosam et praesentium porro obcaecati in eligendi. Officiis, optio.</p>
                </>
            );
        } else {
            return <p>{post.body}</p>;
        }
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Link to="/posts" className="cta">Back</Link>
                    </div>
                    <div className="col-12">
                        <div className="mini-hero"></div>
                        <hr />
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-3">
                        <div className="comments">
                            <h3>Users Comments</h3>
                            {loadingComments ? (
                                <p>Loading comments...</p>
                            ) : comments.length > 0 ? (
                                <ul className="list-unstyled">
                                    {comments.map((comment) => (
                                        <li key={comment.id}>
                                            <h4>User: {comment.email}</h4>
                                            <h5>Title: {comment.name}</h5>
                                            <p>{comment.body}.</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No comments found for this post</p>
                            )}
                        </div>
                    </div>
                    <div className="col-12 col-md-7">
                        <h1>{post.title}</h1>
                        <p class="post-excerpt">{renderPostBody()}</p>
                    </div>
                    <div className="col-12 col-md-2">
                        <div className="row">
                            <h3>Related Images</h3>
                            {photos.map((photo) => {
                                const dimensions = extractDimensions(photo.thumbnailUrl);
                                return(
                                    <div className="col-12" key={photo.id}>
                                        <img src={photo.thumbnailUrl} alt={photo.title} width={dimensions} height={dimensions} className="post-image" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}