import React, { useEffect } from "react";
import { NavMenu } from "./NavMenu";
import { MobileMenu } from "./MobileMenu";

export const Header = () => {
    const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return(
        <header className="container header">
            <div className="d-flex flex-row justify-content-between align-items-center">
                <h1>JSON Placeholder</h1>
                {isMobile ? <MobileMenu /> : <NavMenu />}
            </div>
        </header>
    );
};