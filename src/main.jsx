import {createRoot} from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import Clarity from '@microsoft/clarity';

import '@/common/styles/global.css';

import {routers} from "@/routers/index";
import {constants} from "@/config/config";

createRoot(document.getElementById('root')).render(
    <RouterProvider router={routers}/>
)

Clarity.init(constants.clarityID);