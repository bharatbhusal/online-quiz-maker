import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
    return (
        <div className="container flex space-around">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default App;
