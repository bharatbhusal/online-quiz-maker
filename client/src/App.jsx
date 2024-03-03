import React from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateQuestion from './components/CreateQuestion';
import QuizAttempt from './components/QuizAttempt';
import { Outlet } from 'react-router-dom';

function App() {
    return (
        <div className="container flex">
            <Outlet />
        </div>
    );
}

export default App;
