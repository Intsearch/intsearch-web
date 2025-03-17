import {Navigate} from "react-router-dom";

import {validateConfig, getConfig} from "@/utils/utils";

const ProtectedRoute = ({children}) => {
    const isAuthenticated = validateConfig(getConfig());

    return isAuthenticated ? children : <Navigate to="/" replace/>;
};

export default ProtectedRoute;