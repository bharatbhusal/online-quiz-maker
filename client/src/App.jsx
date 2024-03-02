import React from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateQuestion from './components/CreateQuestion';
import QuestionsList from './components/QuestionsList';
import QuizAttempt from './components/QuizAttempt';

function App() {
    return (
        <div className="App">
            <Login />
            <Register />
            <CreateQuestion />
            <QuestionsList />
            <QuizAttempt category={"Science"} />
        </div>
    );
}

export default App;
