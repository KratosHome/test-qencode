import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./pages/Login/Login";
import ForgetPass from "./pages/ForgetPass/ForgetPass";
import CreatePassword from "./pages/CreatePassword/CreatePassword";
import {Provider} from "react-redux";
import {store} from "./store/store";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Login/>,
    },
    {
        path: "/forget-pass",
        element: <ForgetPass/>,
    },
    {
        path: "/create-password/:secret",
        element: <CreatePassword/>,
    },
]);

function App() {
    return (
        <>
            <Provider store={store}>
                <RouterProvider router={router}/>
            </Provider>
        </>
    );
}

export default App;
