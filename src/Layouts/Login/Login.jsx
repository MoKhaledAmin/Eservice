import React,{useEffect, useState} from "react";

// Styles
import "./Login.css";

// Translation
import { useTranslation } from 'react-i18next';

import { ErrorMessage } from "@hookform/error-message"

// React Hook Form
import { useForm } from "react-hook-form";

import {jwtDecode} from "jwt-decode";

// Master Hooks
import { useAppDispatch } from "../../Services/MasterStore/MasterHook";

import { SignUp } from "../../Services/MasterStore/Reducers/UserSlice";

import { SignIn } from "../../Services/MasterStore/Reducers/UserSlice";

// React Router
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const { t } = useTranslation();
    const Navigate = useNavigate();
    const dispatch = useAppDispatch();
    const[MessageError, setMessageError] = useState('');
    const [TokenData] = useState(localStorage.getItem('token'));
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const { register: registerSignIn, handleSubmit: handleSubmitSignIn } = useForm();
    const decodedToken = TokenData && jwtDecode(TokenData);

    const onSubmit = (data) => {
        dispatch(SignUp(data)).then((res) => {
            if(res.payload.MESSAGE.MESSAGE === ''){
                document.getElementById('login').classList.add('active');
                document.getElementById('register').classList.remove('active');            
                document.getElementById('register-tab').classList.remove('active');            
                document.getElementById('login-tab').classList.add('active'); 
            }else{
                setMessageError(res.payload.MESSAGE.MESSAGE)
            }
        });
    };

    const onSubmitLogin = (data) => {
        dispatch(SignIn(data)).then((res) => {
            if(res.payload?.MESSAGE?.CODE === null && res.payload?.DATA !== null){
                Navigate(`/`, { replace: true })
            }else{
                setMessageError(res.payload?.MESSAGE?.MESSAGE)
            }
        });
    };

    useEffect(() => {        
        localStorage.getItem('state');
        if (localStorage.getItem('state') === 'SignUp') {
            document.getElementById('login').classList.remove('active');
            document.getElementById('register').classList.add('active');            
            document.getElementById('register-tab').classList.add('active');            
            document.getElementById('login-tab').classList.remove('active');            
        localStorage.removeItem('state');
        }
    }, [localStorage.getItem('state')])

    return (
        <React.Fragment>
            <div className="login">
                <div className="formCard">
                    <div className="cardHeader">
                        <ul className="nav nav-tabs " id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link tabLink active" id="login-tab" data-bs-toggle="tab" data-bs-target="#login" type="button" role="tab" aria-controls="login" aria-selected="true">{t('SignIn')}</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link tabLink" id="register-tab" data-bs-toggle="tab" data-bs-target="#register" type="button" role="tab" aria-controls="register" aria-selected="true">{t('new')}</button>
                            </li>
                        </ul>
                    </div>
                    <div className="tab-content">
                        <div className="cardBody tabcontent tab-pane active" id="login" role="tabpanel" aria-labelledby="login-tab">
                            <form onSubmit={handleSubmitSignIn((data) => onSubmitLogin(data))}>
                                <div className="formInput">
                                    <label className="form-label">{t('Username')}</label>
                                    <input {...registerSignIn("USER_NAME", { required: true })} name='USER_NAME' type="text" className="form-control" placeholder={t('LoginNamePlaceHolder')} />
                                </div>
                                <div className="formInput">
                                    <label className="form-label">{t('Password')}</label>
                                    <input {...registerSignIn("PASSWORD", { required: true })} name='PASSWORD' type="password" className="form-control" placeholder={t('PasswordPlaceholder')} />
                                </div>
                                <button type="submit" className="btn">{t('Login')}</button>
                        
                                 <small>{MessageError ? MessageError : ''}</small>
                            </form>
                        </div>
                        <div className="cardBody tabcontent tab-pane" id="register" role="tabpanel" aria-labelledby="register-tab">
                            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                                <div className="formInput">
                                    <label className="form-label">{t('Username')}</label>
                                    <input {...register("LOGIN_NAME", { required: "حقل مطلوب" })} name='LOGIN_NAME' type="text" className="form-control" placeholder={t('LoginNamePlaceHolder')} />
                                    <small><ErrorMessage errors={errors} name="LOGIN_NAME" /></small>
                                </div>
                                <div className="formInput">
                                    <label className="form-label">{t('Password')}</label>
                                    <input {...register("PASSWORD", { required: "حقل مطلوب" })} name='PASSWORD' type="password" className="form-control" placeholder={t('PasswordPlaceholder')} />
                                    <small><ErrorMessage errors={errors} name="PASSWORD" /></small>
                                </div>
                                <div className="formInput">
                                    <label className="form-label">{t('FirstName')}</label>
                                    <input {...register("NAME_ONE", { required: "حقل مطلوب"  })} name='NAME_ONE' type="text" className="form-control" placeholder={t('FirstNamePlaceholder')} />
                                    <small><ErrorMessage errors={errors} name="NAME_ONE" /></small>
                                </div>
                                <div className="formInput">
                                    <label className="form-label">{t('LastName')}</label>
                                    <input {...register("NAME_TWO", { required: "حقل مطلوب"  })} name='NAME_TWO' type="text" className="form-control" placeholder={t('LastNamePlaceholder')} />
                                    <small><ErrorMessage errors={errors} name="NAME_TWO" /></small>
                                </div>
                                <div className="formInput">
                                    <label className="form-label">{t('Phone')}</label>
                                    <input {...register("MOBILE", { required: "حقل مطلوب", maxLength: 12 })} name='MOBILE' type="number" className="form-control" placeholder={t('PhonePlaceholder')} />
                                    <small><ErrorMessage errors={errors} name="MOBILE" /></small>
                                </div>
                                <div className="formInput">
                                    <label className="form-label">{t('Email')}</label>
                                    <input {...register("EMAIL", { required: "حقل مطلوب" })} name='EMAIL' type="Email" className="form-control" placeholder={t('EmailPlaceholder')} />
                                    <small><ErrorMessage errors={errors} name="EMAIL" /></small>
                                </div>
                                <button type="submit" className="btn">{t('SignIn')}</button>
                        
                            <small>{MessageError ? MessageError : ''}</small>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login;