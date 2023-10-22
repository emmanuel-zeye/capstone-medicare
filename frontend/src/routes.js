import {Box, Layers, ShoppingBag, ShoppingCart, Users} from 'react-feather'
import AdminHome from "./pages/AdminHome/index.jsx";
import AdminProducts from "./pages/AdminProducts/index.jsx";
import AdminOrders from "./pages/AdminOrders/index.jsx";
import AdminUsers from "./pages/AdminUsers/index.jsx";
import AdminProductCategories from "./pages/AdminProductCategories/index.jsx";
import StoreProducts from "./pages/StoreProducts/index.jsx";

export const dashboardRoutes = [
    {
        title: "Dashboard",
        icon: Layers,
        path: "/dashboard/home",
        showInSidebar: true,
        Element: AdminHome,
        role: ['admin']
    },
    {
        title: "Product Categories",
        icon: Box,
        path: "/dashboard/categories",
        role: ['admin'],
        Element: AdminProductCategories,
        showInSidebar: true,
    },
    {
        title: "Products",
        icon: ShoppingBag,
        path: "/dashboard/products",
        role: ['admin'],
        Element: AdminProducts,
        showInSidebar: true,
    },
    {
        title: "Orders",
        icon: ShoppingCart,
        path: "/dashboard/orders",
        role: ['admin'],
        showInSidebar: true,
        Element: AdminOrders,
    },
    {
        title: "Users",
        icon: Users,
        path: "/dashboard/users",
        gap: true,
        role: ['admin'],
        showInSidebar: true,
        Element: AdminUsers,
    },
    {
        title: "Store Products",
        icon: ShoppingBag,
        path: "/store/products",
        role: ['customer'],
        showInSidebar: true,
        Element: StoreProducts,
    },
]

export const sidebarMenuItems = dashboardRoutes.filter(route => route.showInSidebar && route.path).map(route => {
    const {title, icon, path, role, gap} = route
    return {title, icon, path, role, gap}
});
