import React ,{ useEffect } from 'react';

import { PrcServiceDetail } from "../../Services/MasterStore/Reducers/OrderSlice";


import { useTranslation } from 'react-i18next';

// Master Hooks
import { useAppDispatch, useAppSelector } from "../../Services/MasterStore/MasterHook";

// css
import "./Lighting.css"

const Lighting = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(PrcServiceDetail({NSERVICE_ID: 1}));
    }, [dispatch])

    const state = useAppSelector((state)=> state?.Order?.order);

    return (
        <React.Fragment>
            <div className='light'>
                <h3 className='lightHeader'>{t('StreetLight')}</h3>
            </div>
            <div className='lightDescribe'>
                <div className='describe'>
                    <ul className='serviceList'>
                        {/* <li>
                            <b className='textHead'>وصف الخدمة</b>
                            <p className='textParagrap'>تقوم إدارة تنفيذ مشاريع الإنارة والميكانيكا بتنفيذ الطلبات الواردة إليها من المواطنين والجهات المختلفة. ويتم تنفيذ الأعمال واعتماد التنفيذ والاستلام طبقاً لإجراءات عمل محددة تبدأ من تقديم الطلب وتنتهي بتفيذ الخدمة وإخطار المستفيد بإنتهاء الطلب.</p>
                        </li> */}
                    </ul>
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