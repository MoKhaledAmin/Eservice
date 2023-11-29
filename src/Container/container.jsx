import React, { useEffect } from 'react';

//translate
import i18next from "i18next";

// React Router
import { Outlet } from "react-router-dom";

// Components
import Nav from '../Components/Navbar/nav';
import Footer from '../Components/Footer/footer';
import TopFooter from '../Components/TopFooter/topFooter';

const Container = () => {

    useEffect(() => {
        i18next.changeLanguage(localStorage.lang).then();
    }, [])

    return (
        <React.Fragment>
            <Nav />
            <div className="app">
                <div className='app_container'>
                    <Outlet />
                    <TopFooter />
                    <Footer />
                </div>
            </div>
        </React.Fragment>
    );
};

export default Container;