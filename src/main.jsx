import {createRoot} from 'react-dom/client'
import {RouterProvider} from "react-router-dom";

import '@/common/styles/global.css';

import {routers} from "@/routers/index.jsx";

createRoot(document.getElementById('root')).render(
    <RouterProvider router={routers}/>
)
