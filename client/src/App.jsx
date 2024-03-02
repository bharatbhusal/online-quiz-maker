import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import CreateQuestion from './components/CreateQuestion';
import QuestionsList from './components/QuestionsList';

function App() {
    return (
        <div className="App">
            <Login />
            <Register />
            <CreateQuestion />
            <QuestionsList />
        </div>
    );
}

export default App;
