import React from "react";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero.jsx";

export const Home = () => {
    return(
        <>
            <Header />
            <Hero />
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <p className="mt-4">Welcome to JSON Placeholder, I use a variety endpoints from my free, fake REST API in order to return data to display on this application.</p>
                        <p>Take a look around and see the kind of data I can give you for you personal project, some blog posts for visual display. I've even got a whole list of todos you can work your magic with!</p>
                    </div>
                </div>
            </div>
        </>
    );
}