import React from "react";
import Slogan from "../components/slogan"
import Navbar from "../components/navbar";
import Signup from "../components/signup";
import VidBackground from "../components/vidBackground";

export default function LandingPage() {
    return (
        <body className="fullpage">
            <VidBackground/>
            <Navbar/>
            <Slogan/>
            <Signup/>
        </body>
    );
}