import React from 'react';
import Layout from './pages/Layout';
import LandingPage from './pages/landing';
import Profile from './pages/profile';
import NoPage from './pages/noPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/main';
import SearchResultPage from './pages/searchResult';
export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<LandingPage />} /> {/* CHANGE THIS BACK TO LANDINGPAGE WHEN FINISHED DEBUGGING PROFILE PAGE*/}
                    <Route path="profile" element= {<Profile mode={0}/>}/>
                    <Route path="main" element= <MainPage /> />
                    <Route path="search" element= <SearchResultPage /> />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
