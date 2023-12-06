import React, { useState, useEffect } from 'react';

// Translation
import i18next from "i18next";
import { useTranslation } from 'react-i18next';

import { jwtDecode } from "jwt-decode";

// React Router
import { useNavigate } from 'react-router-dom';

// css
import "./nav.css"

// images
import Logo from '../../Assets/logo.png'

const Nav = () => {
    const { t } = useTranslation();
    const Navigate = useNavigate();
    const [Position, setPosition] = useState(localStorage?.lang === "en" ? true : false);
    const decodedToken = localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')) : '';
    const decodToken = localStorage.getItem('token') && jwtDecode(localStorage.getItem('token'));


    const ChangeLanguage = () => {
        setPosition(!Position);
    }

    useEffect(() => {
        const htmlRoot = document.querySelector("html");
        htmlRoot.setAttribute("dir", Position ? "ltr" : "rtl");
        htmlRoot.setAttribute("lang", Position ? "en" : "ar");
        localStorage.lang = Position ? "en" : "ar";
        i18next.changeLanguage(Position ? "en" : "ar").then();
    }, [Position])

    const LogOut = () => {
        localStorage.removeItem('token');
        Navigate(`/Login`, { replace: true })
    };

    const CheckLogin = (id) => {
        if (decodToken) {
            Navigate(`/ShowRequest`, { replace: true })
        } else {
            Navigate(`/Login`, { replace: true })
        }
    }

    const SetState = () => {
        localStorage.setItem('state', 'SignUp');
    }

    // Expire Token
    useEffect(() => {
        const decodedToken = localStorage.getItem('token') && jwtDecode(localStorage.getItem('token'));
        const currentTime = Date.now() / 1000;
        if (decodedToken && decodedToken.exp < currentTime) {
            localStorage.clear();
            Navigate('/login', { replace: true })
        }
        i18next.changeLanguage(localStorage.LANG).then();
    }, [Navigate]);

    return (
        <React.Fragment>
            <div className='topNav'>
                <div className='leftBlock'>
                    <div className="topNavGate">
                        <div className="headline">
                            <ul className='list-unstyled mb-0'>
                                <li className='nav-item mainMenuItem'>
                                    <a href='#'>{t('SignUpinGate')}<i className="bi bi-caret-down-fill"></i></a>
                                    <div className="side-menu">
                                        <ul className="list-unstyled sub-menu">
                                            <li className="nav-item mainMenuItem">
                                                <a href="/Login" onClick={SetState}>{t('Individual')}<i className="bi bi-arrow-left-short"></i></a>
                                            </li>
                                            <li className="nav-item mainMenuItem">
                                                <a href="/">{t('company')}<i className="bi bi-arrow-left-short"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <p className="headline">
                        {decodedToken ? <a onClick={LogOut} className='logOut'><i className='bx bx-log-out'></i>{t('Logout')}</a> : <a href='/login'>
                            <i className="bi bi-person-fill"></i>
                            {t('Login')}
                        </a>}
                    </p>
                </div>
                <div className='rightBlock'>
                    <div className='UserName'>
                        <h6>{decodedToken?.UserName}</h6>
                    </div>
                    <div className='changeLanguage'>
                        <button type='button' className="btn" onClick={ChangeLanguage}>
                            <i className="bi bi-globe2"></i>
                            {t('language')}
                        </button>
                    </div>
                </div>
            </div>
            <div className='navbar navbar-expand-lg downNav'>
                <a className='navbarIamge' href="/">
                    <img src={Logo} alt="logo" className='navImg' />
                </a>
                <div className='collapse navbar-collapse middleDashboard'>
                    <ul className='list-unstyled navbar-nav d-none d-md-block'>
                        <li className='nav-item downNavMenu'>
                            <a href='' className='navLink'>{t('aboutBladya')}<i className="bi bi-chevron-down"></i></a>
                            <div className="side-menu">
                                <ul className="list-unstyled sub-menu">
                                    <li className="nav-item downNavMenu">
                                        <a href="/">{t('AboutAlqiq')}<i className="bi bi-arrow-left-short"></i></a>
                                    </li>
                                    <li className="nav-item downNavMenu">
                                        <a href="/">{t('RegulationsAndConditions')}<i className="bi bi-arrow-left-short"></i></a>
                                    </li>
                                    <li className="nav-item downNavMenu">
                                        <a href="/">{t("Projects")}<i className="bi bi-arrow-left-short"></i></a>
                                    </li>
                                    <li className="nav-item downNavMenu">
                                        <a href="/">{t('DigitalTransformationStrategy')}<i className="bi bi-arrow-left-short"></i></a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                    <ul className='list-unstyled navbar-nav d-none d-md-block'>
                        <li className='nav-item downNavMenu'>
                            <a href="#" className='navLink'>{t('Services')}<i className="bi bi-chevron-down"></i></a>
                            <div className="side-menu">
                                <ul className="list-unstyled sub-menu">
                                    <li className="nav-item downNavMenu">
                                        <a href="/MunicipalityServices">{t('MunicipalServices')}<i className="bi bi-arrow-left-short"></i></a>
                                    </li>
                                    <li className="nav-item downNavMenu">
                                        <a onClick={() => { CheckLogin() }}>{t('Requests')}<i className="bi bi-arrow-left-short"></i></a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                    <ul className='list-unstyled navbar-nav d-none d-md-block'>
                        <li className='nav-item downNavMenu'>
                            <a href="#" className='navLink'>{t('Media')}<i className="bi bi-chevron-down"></i></a>
                            <div className="side-menu">
                                <ul className="list-unstyled sub-menu">
                                    <li className="nav-item downNavMenu">
                                        <a href="/">{t('AlBaladyaNews')}<i className="bi bi-arrow-left-short"></i></a>
                                    </li>
                                    <li className="nav-item downNavMenu">
                                        <a href="/">{t('ImageGallery')}<i className="bi bi-arrow-left-short"></i></a>
                                    </li>
                                    <li className="nav-item downNavMenu">
                                        <a href="/">{t('MunicipalActivities')}<i className="bi bi-arrow-left-short"></i></a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="headerSearchAndSetting">
                    <div className='searhBar'>
                        <button type="button" className="btn searchBtn">
                            <i className="bx bx-search-alt"></i>
                        </button>
                        <input type="text" placeholder={t('SearhPlaceholder')} />
                    </div>
                </div>
                <div className='menu d-none'>
                    <button className="navbar-toggler collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="bi bi-list"></i>
                    </button>
                </div>
                <div className='dropDown collapse navbar-collapse' id='navbarContent'>
                    <ul className='navbar-nav me-auto'>
                        <li className='nav-item has-dropdown'>
                            <a className='dropdown-toggle' href="/" data-toggle="dropdown" id="ealmContent" data-bs-toggle="dropdown" aria-expanded="false">
                                {t('aboutBladya')}
                                <i className="bi bi-chevron-compact-down"></i>
                            </a>
                            <ul className="list-unstyled border-0 dropdown-menu" aria-labelledby="elbaladyaealmContentContent">
                                <li>
                                    <ul className='list-unstyled'>
                                        <li className="subDropdown nav-item">
                                            <a className='subContent' href="/">{t('AboutAlqiq')}<i className="bi bi-arrow-left-short"></i></a>
                                        </li>
                                        <li className="subDropdown nav-item">
                                            <a className='subContent' href="/">{t('RegulationsAndConditions')}<i className="bi bi-arrow-left-short"></i></a>
                                        </li>
                                        <li className="subDropdown nav-item">
                                            <a className='subContent' href="/">{t("Projects")}<i className="bi bi-arrow-left-short"></i></a>
                                        </li>
                                        <li className="subDropdown nav-item">
                                            <a className='subContent' href="/">{t('DigitalTransformationStrategy')}<i className="bi bi-arrow-left-short"></i></a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li className='nav-item has-dropdown'>
                            <a className='dropdown-toggle' href="/" data-toggle="dropdown" id="ealmContent" data-bs-toggle="dropdown" aria-expanded="false">
                                {t('Services')}
                                <i className="bi bi-chevron-compact-down"></i>
                            </a>
                            <ul className="list-unstyled border-0 dropdown-menu" aria-labelledby="elbaladyaealmContentContent">
                                <li>
                                    <ul className='list-unstyled'>
                                        <li className="subDropdown nav-item">
                                            <a className='subContent' href="/MunicipalityServices"> {t('MunicipalServices')}<i className="bi bi-arrow-left-short"></i></a>
                                        </li>
                                        <li className="subDropdown nav-item">
                                            <a className='subContent' href="/ShowRequest">{t('Requests')}<i className="bi bi-arrow-left-short"></i></a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li className='nav-item has-dropdown'>
                            <a className='dropdown-toggle' href="/" data-toggle="dropdown" id="ealmContent" data-bs-toggle="dropdown" aria-expanded="false">
                                {t('Media')}
                                <i className="bi bi-chevron-compact-down"></i>
                            </a>
                            <ul className="list-unstyled border-0 dropdown-menu" aria-labelledby="elbaladyaealmContentContent">
                                <li>
                                    <ul className='list-unstyled'>
                                        <li className="subDropdown nav-item">
                                            <a className='subContent' href="/">{t('AlBaladyaNews')}<i className="bi bi-arrow-left-short"></i></a>
                                        </li>
                                        <li className="subDropdown nav-item">
                                            <a className='subContent' href="/">{t('ImageGallery')}<i className="bi bi-arrow-left-short"></i></a>
                                        </li>
                                        <li className="subDropdown nav-item">
                                            <a className='subContent' href="/">{t('MunicipalActivities')}<i className="bi bi-arrow-left-short"></i></a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Nav