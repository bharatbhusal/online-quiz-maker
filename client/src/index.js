// Importing the necessary function from the react-dom library
import {
    createRoot
} from "react-dom/client"

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Importing the main App component from the "./App" file
import App from "./App"
import "./index.css"
import NotFoundPage from "./pages/404NotFound"
import { UserProvider } from "./context/UserContext"
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateQuestion from "./pages/CreateQuestion";

// Getting the DOM element with the id "root"
const divContainer = document.getElementById("root")

// Creating a root for the React application using createRoot and associating it with the divContainer
const root = createRoot(divContainer)


const router = createBrowserRouter([
    {
        path: "",
        element: <App />,
        errorElement: <NotFoundPage />,

        children: [
            {
                errorElement: <NotFoundPage />,
                children: [
                    {
                        index: true,
                        element: <Login />,
                    },
                    {
                        path: '/login',
                        element: <Login />
                    },
                    {
                        path: '/registration',
                        element: <Register />
                    },
                    {
                        path: '/create-questions',
                        element: <CreateQuestion />
                    },
                    {
                        path: '/attemp-quiz',
                        element: <Register />
                    },

                ]
            },
        ],
    },
]);



// Rendering the main App component within the root
root.render(
    <UserProvider>
        <RouterProvider router={router} />
    </UserProvider>
);

