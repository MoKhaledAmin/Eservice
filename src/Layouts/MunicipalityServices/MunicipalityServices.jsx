import React, {useEffect} from 'react';

import { GetNservice } from "../../Services/MasterStore/Reducers/OrderSlice";

import { useTranslation } from 'react-i18next';

// Master Hooks
import { useAppDispatch, useAppSelector } from "../../Services/MasterStore/MasterHook";

import {jwtDecode} from "jwt-decode";

// React Router
import { useNavigate, NavLink } from 'react-router-dom';

// css
import "./MunicipalityServices.css";


const MunicipalityServices = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const Navigate = useNavigate();
    
    const decodedToken = localStorage.getItem('token') && jwtDecode(localStorage.getItem('token'));
    const state = useAppSelector((state)=> state?.Order?.orders?.REF_ID);

    useEffect(() => {
        dispatch(GetNservice({}));
    }, [dispatch])

    const CheckLogin = (id) => {
        if(decodedToken){
            Navigate(`/LightingOrder/${id}`, { replace: true })
        }else{
            Navigate(`/Login`, { replace: true })
        }
    }
    
    return (
        <React.Fragment>
            <div className='services'>
                <div className='serviceHeader'>
                    <div className='container'>
                        <div className="row">
                            <div className='col-12'>
                                <div className="serviceTitle">
                                    <h1 className='title'>{t('MunicipalServices')}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="breadcrumbSubTitle">
                    <div className="container">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="/">{t('mainMenu')}</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                <a href="/MunicipalityServices">{t('MunicipalServices')}</a>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className='serviceBody'>
                <div className="container">
                    <div className="row">
                        <div className='ServiceCard'>
                            {state && state.map((Item, Index) => (
                            <div className="card" key={Index}>
                                <i className="bi bi-lightbulb"></i>
                                <div className="card-body">
                                    <h5 className="card-title">{localStorage.getItem('lang') === 'en' ? Item?.NAME_TWO : Item.NAME_ONE}</h5>
                                    <div className='cardActions'>
                                        <NavLink to={`/Lighting/${Item.NSERVICE_ID}`} className={"btn"}>
                                           {t('Details')}
                                        </NavLink>
                                        <button className="btn" onClick={() => {CheckLogin(Item.NSERVICE_ID)}}>{t('StartService')}</button>
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default MunicipalityServices;