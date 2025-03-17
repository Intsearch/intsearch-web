import React from "react";
import {createBrowserRouter} from "react-router-dom";

import ProtectedRoute from "@/routers/protected";

const HomePage = React.lazy(() => import('@/pages/home'));
const SearchPage = React.lazy(() => import('@/pages/search'));
const NotFoundPage = React.lazy(() => import('@/pages/notfound'));

export const routers = createBrowserRouter([
    {
        name: 'home',
        path: '/',
        element: <HomePage/>,
        children: [],
        configure: {
            title: '',
            verifyToken: false
        }
    },
    {
        name: 'search',
        path: '/search',
        element: <ProtectedRoute><SearchPage/></ProtectedRoute>,
        children: [],
        configure: {
            title: '',
            verifyToken: true
        }
    },
    {
        name: '404',
        path: '*',
        element: <NotFoundPage/>,
        children: [],
        configure: {
            title: '',
            verifyToken: false
        }
    }
]);
