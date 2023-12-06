import React ,{ lazy } from 'react';

// React Router
import { useRoutes } from 'react-router-dom';

// Lazy Loading
const Container = lazy(() => import('../Container/container'));
const Home = lazy(() => import('../Layouts/Home/home'));
const MunicipalityServices = lazy(() => import('../Layouts/MunicipalityServices/MunicipalityServices'));
const Lighting = lazy(() => import('../Layouts/Lighting/lighting'));
const Login = lazy(() => import('../Layouts/Login/Login'));
const LightingOrder = lazy(() => import('../Layouts/LightingOrder/LightingOrder'));
const ShowRequest = lazy(() => import('../Layouts/ShowRequest/ShowRequest'));
const StreetMaintainOrder = lazy(() => import('../Layouts/StreetMaintainOrder/StreetMaintainOrder'));

const MasterRoutes  = () => {

    return useRoutes([
        {
            path: '/',
            element: <Container />,
            children: [
                { path: '/', element: <Home /> },
                { path: '/lighting/:id', element: <Lighting /> },
                { path: '/MunicipalityServices', element: <MunicipalityServices /> },
                { path: '/Login', element: <Login /> },
                { path: '/LightingOrder/:id', element: <LightingOrder /> },
                { path: '/ShowRequest', element: <ShowRequest /> },
                { path: '/StreetMaintainOrder/:id', element: <StreetMaintainOrder /> },
            ]
        }
    ])
}

export default MasterRoutes;
