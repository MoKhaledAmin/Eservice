import React ,{ useEffect } from 'react';

import { PrcServiceDetail } from "../../Services/MasterStore/Reducers/OrderSlice";


import { useTranslation } from 'react-i18next';

// Master Hooks
import { useAppDispatch, useAppSelector } from "../../Services/MasterStore/MasterHook";

// React Router
import { useNavigate , useParams } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";

// css
import "./Lighting.css"

const Lighting = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const Navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        dispatch(PrcServiceDetail({NSERVICE_ID: id}));
    }, [dispatch, id])

    const decodedToken = localStorage.getItem('token') && jwtDecode(localStorage.getItem('token'));
    const state = useAppSelector((state)=> state?.Order?.order);

    
    console.log(state);
    const CheckLogin = (id) => {
        if(decodedToken){
            Navigate(`/${state?.REF_DESCRIPTION && state?.REF_DESCRIPTION[0]?.PAGE_NAME}/${id}`, { replace: true })
        }else{
            Navigate(`/Login`, { replace: true })
        }
    }

    return (
        <React.Fragment>
            <div className='light'>
                <h3 className='lightHeader'>{state?.REF_DESCRIPTION && state?.REF_DESCRIPTION[0]?.NAME_ONE}</h3>
                <button className="btn StartBtn" onClick={()=> {CheckLogin(id)}}>{t('StartService')}</button>
            </div>
            <div className='lightDescribe'>
                <div className='describe'>
                    <div className='serviceReq'>
                        <div className='required'>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                            {state && Object.values(state).reverse().map((Item, Index) => (<li key={Index} className="nav-item" role="presentation">
                                    <button  className={`nav-link tabLink ${Index === 0 ? 'active' : 0}`} id={`${(Object.keys(Item[0]))}-tab`} data-bs-toggle="tab" data-bs-target={`#${(Object.keys(Item[0]))}`} type="button" role="tab" aria-controls={`${(Object.keys(Item[0]))}-tab`} aria-selected="true">
                                        <i className="bi bi-grid-fill" aria-hidden="true"></i>
                                        {t(Object.keys(Item[0]))}
                                    </button>
                                </li>
                                ))}
                            </ul>
                            <div className='tabBody tab-content'>
                                {state && Object.values(state).reverse().map((Item, Index) => 
                             Index === 0 &&   <div key={Index} role="tabpanel" aria-labelledby={`${(Object.keys(Item[0]))}-tab`} id={(Object.keys(Item[0]))} className='tabcontent tab-pane active'>
                                <div className='tabList'>
                                    <ul id='Procedures'>
                                        <li>
                                            {Item.map((Data, Index) => (
                                                <span className='textInfo paragrph' key={Index}>{Data.DESCRIPTION}</span>
                                            ))}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                                )}   {state && Object.values(state).reverse().map((Item, Index) => 
                                    Index === 1 && <div key={Index} role="tabpanel" aria-labelledby={`${(Object.keys(Item[0]))}-tab`} id={(Object.keys(Item[0]))} className='tabcontent tab-pane'>
                                    <div className='tabList'>
                                        <ul id='Procedures'>
                                            <li>
                                                {Item.map((Data, Index) => (
                                                    <span className='textInfo paragrph' key={Index}>{Data.ATTACHMENTS}</span>
                                                ))}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                    )}
                                       {state && Object.values(state).reverse().map((Item, Index) => 
                                    Index === 2 && <div key={Index} role="tabpanel" aria-labelledby={`${(Object.keys(Item[0]))}-tab`} id={(Object.keys(Item[0]))} className='tabcontent tab-pane'>
                                    <div className='tabList'>
                                        <ul id='Procedures'>
                                            <li>
                                                {Item.map((Data, Index) => (
                                                    <span className='textInfo paragrph' key={Index}>{Data.CONDITIONS}</span>
                                                ))}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                    )}                                    
                                    {state && Object.values(state).reverse().map((Item, Index) => 
                                    Index === 3 && <div key={Index} role="tabpanel" aria-labelledby={`${(Object.keys(Item[0]))}-tab`} id={(Object.keys(Item[0]))} className='tabcontent tab-pane'>
                                    <div className='tabList'>
                                        <ul id='Procedures'>
                                            <li>
                                                {Item.map((Data, Index) => (
                                                    <span className='textInfo paragrph' key={Index}>{Data.PROCEDURES}</span>
                                                ))}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Lighting;