import React from 'react';
import Login from './pages/Login';
import "./styles/App.css"
import Register from './pages/Register';
import CreateQuestion from './components/CreateQuestion';
import QuizAttempt from './components/QuizAttempt';

function App() {
    return (
        <div className="App">
            <Login />
            {/* <Register /> */}
            {/* <CreateQuestion /> */}
            {/* <QuizAttempt category={"Science"} /> */}
        </div>
    );
}

export default App;
