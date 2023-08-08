import React from "react";
import backgroundImage from "../logo.avif"; // Adjust the path based on your folder structure

const Home = () => {
    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh", // Set an appropriate height for the div
            }}
        >
            {/* Add your homepage content here */}
        </div>
    );
}

export default Home;

