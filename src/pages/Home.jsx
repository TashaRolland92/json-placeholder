import { Link } from "react-router-dom";

export const Home = () => {
    return(
        <>
            <h1>Home Page</h1>
            <p>Home page content goes here...</p>
            <Link to="/posts">Blog Posts</Link>
        </>
    );
}