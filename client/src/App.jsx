import React from 'react';
import { Outlet } from 'react-router-dom';

function App() {
    return (
        <div className="container flex">
            <Outlet />
        </div>
    );
}

export default App;
