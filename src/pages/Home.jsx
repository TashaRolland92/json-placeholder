import { Link } from "react-router-dom";

export const Home = () => {
    return(
        <>
            <h1>JSON Placeholder</h1>
            <p>Welcome to JSON Placeholder's blog.</p>
            <Link to="/posts">Blog Posts</Link>
            <Link to="/photos">Blog Photos</Link>
        </>
    );
}