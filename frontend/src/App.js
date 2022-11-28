import React from 'react';
import Layout from './pages/Layout';
import LandingPage from './pages/landing';
import Profile from './pages/profile';
import NoPage from './pages/noPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<LandingPage />} /> {/* CHANGE THIS BACK TO LANDINGPAGE WHEN FINISHED DEBUGGING PROFILE PAGE*/}
                    <Route path="profile" element= {<Profile mode={0}/>}/>
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
