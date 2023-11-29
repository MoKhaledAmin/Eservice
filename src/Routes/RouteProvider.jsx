import React from 'react';

// Routes
import  MasterRoutes  from "./MasterRoutes";

export const RoutesProvider = ({ children }) => {
    return (
        <React.Fragment>
            { children }
            <MasterRoutes />
        </React.Fragment>
    )
}