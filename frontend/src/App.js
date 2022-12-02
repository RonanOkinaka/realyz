import React from 'react';
import Layout from './pages/Layout';
import LandingPage from './pages/landing';
import Profile from './pages/profile';
import MainPage from './pages/main';
import NoPage from './pages/noPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/main';
import SearchResultPage from './pages/searchResult';
import testPage from './pages/test';
import FullOtherProfile from './pages/otherProfile';

export default function App() {
    //TODO: separate profile into myprofile (mode = 0) and otherprofile/:uid (mode = 1,)
    //TODO: search up router nesting
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<LandingPage />} />
                    <Route path="profile" element= {<Profile />}/>
                    <Route path="profile/:uid" element= {<FullOtherProfile />}/>
                    <Route path="main" element= {<MainPage />} />
                    <Route path="search" element= {<SearchResultPage />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
