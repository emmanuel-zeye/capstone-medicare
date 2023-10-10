import './App.css'

import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate, Outlet,
    Route,
    RouterProvider,
    useLocation
} from "react-router-dom";
import Login from "./pages/Login.jsx";
import {useAuth} from "./hooks/useAuth.js";
import {dashboardRoutes} from "./routes.js";
import DashboardLayout from "./layout/AdminLayout.jsx";
import Signup from "./pages/Signup.jsx";

const NotPermitted = () => <DashboardLayout><div>You are not allowed to access this page</div></DashboardLayout>

const PrivateOutlet =()=> {
    const auth = useAuth()
    const location = useLocation()

    // console.log('private outlet auth', auth)
    return auth.user ? (
        <Outlet />
    ) : (
        <Navigate to="/" state={{ from: location }} replace={true} />
    )
}

const App = () => {
    const {can} = useAuth();
    const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            {/* public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Protected routes */}
            <Route element={<PrivateOutlet />}>
                {
                    dashboardRoutes.map(({path,Element, role}) => {
                        // console.log("Creating route for ", path, can(role))
                        return <Route key={path} path={path} Component={can(role) ? Element : NotPermitted}  />
                    })
                }
            </Route>
        </Route>
    )
);
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};


export default App
