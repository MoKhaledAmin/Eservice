import React, { useEffect, useState, useRef } from "react";

// translation
import { useTranslation } from 'react-i18next';

import { GetDistric, GetPlan, GetStreet, DisplayAttachedSlice, SubmitInfo, InsertAttach, UploadAttach, GetClient } from "../../Services/MasterStore/Reducers/StartSlice";

// Master Hooks
import { useAppDispatch, useAppSelector } from "../../Services/MasterStore/MasterHook";
import { useForm } from "react-hook-form";

// Map
import MapContainer from './Map';

import { ErrorMessage } from "@hookform/error-message"

// React Router
import { useParams, useNavigate } from 'react-router-dom';

// Styles
import "./LightingOrder.css";

const LightingOrder = () => {
    const { t } = useTranslation();
    const Navigate = useNavigate();
    const previewRef = useRef(null);
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const { register: submitInfo, handleSubmit, formState: { errors }, } = useForm();
    const [MessageError, setMessageError] = useState('');
    const [AttachmentData, setAttachmentData] = useState([]);

    useEffect(() => {
        dispatch(GetClient())
        dispatch(GetDistric());
        dispatch(GetPlan());
        dispatch(GetStreet());
        dispatch(DisplayAttachedSlice(id));
    }, [dispatch, id])

    const client = useAppSelector((state) => state.Start.Client.REF_ID);
    const district = useAppSelector((district) => district.Start.District);
    const plan = useAppSelector((plan) => plan.Start.Plan);
    const street = useAppSelector((street) => street.Start.Street);
    const displayAttach = useAppSelector((display) => display.Start.DisplayAttach.NSERVICE);

    
    const uniqueID = () => {
        function chr4() {
            return Math.random().toString(16).slice(-4);
        }
        return chr4() + chr4() + '-' + chr4() + '-' + chr4() + '-' + chr4() + '-' + chr4() + chr4() + chr4();
    }
    const onSubmit = (data) => {
        dispatch(SubmitInfo({ ...data, LONGITUDE: localStorage.getItem('longitude'), LATITUDE: localStorage.getItem('latitude') })).then((res) => {
            const formData = new FormData();
            for (let index = 0; index < AttachmentData.length; index++) {
                let ImageGuidName = AttachmentData && uniqueID() + '.' + AttachmentData[index].file.type.split("/")[1];
                formData.append("file", AttachmentData[index].file);
                formData.append("FilePath", ImageGuidName);
                const Data = {
                    DISPLAY_NAME: AttachmentData[index].file.name,
                    EXTENSION_NAME: AttachmentData[index].file.type?.split("/")[1],
                    NAME: AttachmentData[index].file.name,
                    FILESIZE: AttachmentData[index].file.size,
                    LIGHTING_ID: res.payload.DATA.DLIGHTING_ID
                }
                dispatch(InsertAttach(Data));
                dispatch(UploadAttach(formData));
            }
            if ((res.payload.MESSAGE?.CODE === null || res.payload.MESSAGE?.CODE === "") && res.payload.DATA !== null) {
                Navigate(`/ShowRequest`, { replace: true })
            } else {
                setMessageError(res.payload.MESSAGE.MESSAGE)
            }
            setMessageError(res.payload)
        });
    };

    const AttachmentFile = (e) => {
        if (e.target.files && e.target.files[0]) {
            const Reader = new FileReader();
            Reader.readAsDataURL(e.target.files[0]);
            Reader.onload = () => setAttachmentData((Prev) => { return [...Prev, { render: Reader.result, file: e.target.files[0] }] });
        }
    }

    const removeImage = (index) => {
        const updatedImages = [...AttachmentData];
        updatedImages.splice(index, 1);
        setAttachmentData(updatedImages);
    };

    return (
        <React.Fragment>
            <div className="lightOrder">
                <div className="formCard">
                    <div className="cardHeader">
                        <div className="cardTitle">
                            <h3>{t('SiteData')}</h3>
                        </div>
                    </div>
                    <div className="cardBody">
                        <div className="mapGoogle">
                            <MapContainer />
                        </div>
                        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                            <div className="container">
                                <div className="row">
                                    <div className="formSelectList col-md-3">
                                        <label htmlFor="elbaladaya">{t('Municipal')}</label>
                                        <select className="form-select" aria-label="elbaladaya" {...submitInfo("CLIENT_ID", { required: "حقل مطلوب" })} name='CLIENT_ID'>
                                            {
                                                client && client.map((item, idx) => (
                                                    <option key={idx} value={Number(item.CLIENT_ID)}>{item.CLIENT_NAME}</option>
                                                ))
                                            }
                                            
                                        </select>
                                        <small><ErrorMessage errors={errors} name="CLIENT_ID" /></small>
                                    </div>
                                    <div className="formSelectList col-md-3">
                                        <label htmlFor="elhy">{t('District')}</label>
                                        <select className="form-select" aria-label="elhy" {...submitInfo("DISTRICT_ID", { required: "حقل مطلوب" })} name='DISTRICT_ID'>
                                            {
                                                district.REF_ID && district.REF_ID.map((item, idx) => (
                                                    <option key={idx} value={Number(item.DISTRICT_ID)}>{item.DISTRICT_NAME}</option>
                                                ))
                                            }
                                        </select>
                                        <small><ErrorMessage errors={errors} name="DISTRICT_ID" /></small>
                                    </div>
                                    <div className="formSelectList col-md-3">
                                        <label htmlFor="street">{t('Street')}</label>
                                        <select className="form-select" aria-label="street" {...submitInfo("STREET_ID", { required: "حقل مطلوب" })} name='STREET_ID'>
                                            {
                                                street.REF_ID && street.REF_ID.map((item, idx) => (
                                                    <option key={idx} value={Number(item.STREET_ID)}>{item.STREET_NAME}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="formSelectList col-md-3">
                                        <label className="form-label">{t('BlockNumber')}</label>
                                        <input type="number" className="form-control" {...submitInfo("PARCEL_NO", { required: "حقل مطلوب" })} name='PARCEL_NO' />
                                        <small><ErrorMessage errors={errors} name="PARCEL_NO" /></small>
                                    </div>
                                    <div className="formSelectList col-md-3">
                                        <label htmlFor="designNumber">{t('PlanNumber')}</label>
                                        <select className="form-select" aria-label="designNumber" {...submitInfo("PLAN_ID", { required: "حقل مطلوب" })} name='PLAN_ID' >
                                            {
                                                plan.REF_ID && plan.REF_ID.map((item, idx) => (
                                                    <option key={idx} value={Number(item.PLAN_ID)}>{item.PLAN_NAME}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="formInput">
                                <label htmlFor="discriptionInput" className="form-label">{t('Description')}</label>
                                <textarea className="form-control" id="discriptionInput" {...submitInfo("DESCRIPTION", { required: "حقل مطلوب" })} name='DESCRIPTION'></textarea>
                                <small><ErrorMessage errors={errors} name="DESCRIPTION" /></small>
                            </div>
                            <div className="formInput">
                                <label htmlFor="orderAttachedInput" className="form-label">{t('ShowRequiresAttachment')}</label>
                                <textarea className="form-control" id="orderAttachedInput" value={displayAttach && displayAttach[0].ATTACHMENTS}></textarea>
                            </div>
                            <div className="formInput">
                                <label htmlFor="attachedInput" className="form-label">{t('ATTACHMENTS')}</label>
                                <div className="uploadBtn">
                                    <input type="file" multiple className="uploadAttach" id="attachedInput" onChange={(e) => { AttachmentFile(e) }} ></input>
                                    <button type="button">
                                        {t('uploadAttachments')}
                                    </button>
                                </div>
                                <div ref={previewRef} id="preview" className="imgDisplay">
                                    {AttachmentData.map((image, index) => (
                                        <div key={index} className="d-flex">
                                            {image?.file.type?.split("/")[1].toLowerCase() === 'pdf'
                                                ? <div onClick={() => AttachmentFile(image.render, 'pdf')} className="pdfFile" ><i className="bi bi-filetype-pdf" /></div>
                                                : <img src={image.render} alt={image.name} height="100" />
                                            }
                                            <i className="bi bi-x-circle-fill" onClick={() => removeImage(index)}></i>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">{t('Send')}</button>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default LightingOrder;