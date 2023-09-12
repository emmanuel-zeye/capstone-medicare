import './App.css'

import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom";
import Login from "./pages/Login.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            {/* public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Protected routes */}
            {/*<Route element={<PrivateOutlet />}>*/}
            {/*    <Route path="dashboard/home" element={<Dashboard />} />*/}
            {/*</Route>*/}
        </Route>
    )
);
const App = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};


export default App
