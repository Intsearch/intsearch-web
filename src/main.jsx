import {createRoot} from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import Clarity from '@microsoft/clarity';
import {registerSW} from 'virtual:pwa-register';

import '@/common/styles/global.css';

import {routers} from "@/routers/index";
import {constants} from "@/config/config";

createRoot(document.getElementById('root')).render(
    <RouterProvider router={routers}/>
)

Clarity.init(constants.clarityID);

const updateSW = registerSW({
    onNeedRefresh() {
        if (confirm('新版本可用，是否立即更新？')) {
            updateSW();
        }
    },
});