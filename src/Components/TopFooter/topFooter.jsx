import React from 'react';


// transalation
import { useTranslation } from 'react-i18next';

// css
import "./topFooter.css"

// Images
import Vision from '../../Assets/vision.png';

const TopFooter = () => {
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <div className='topFooter'>
                <div className='footerT'>
                    <div className='container'>
                        <div className='row'>
                            <div className="col-12 col-md-6 col-lg-4">
                                <div className="footerWidget">
                                    <div className="widgetContent">
                                        <div className="footerWidget">
                                            <img src={Vision} className='footerLogo' alt="Vision2030 Logo" title="Vision2030 Logo" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-2">
                                <div className="footerWidget">
                                    <div className="footerWidgetTitle">
                                        <h5>{t('generalOverview')}</h5>
                                    </div>
                                    <div className="footerContentWight">
                                        <ul className='list-unstyled'>
                                            <li>
                                                <a href="#">{t('AboutUs')}</a>
                                            </li>
                                            <li>
                                                <a href="#">{t('RMPortalOverview')}</a>
                                            </li>
                                            <li>
                                                <a href="#">{t('News')}</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-2">
                                <div className="footerWidget">
                                    <div className="footerWidgetTitle">
                                        <h5>{t('ImportantLinks')}</h5>
                                    </div>
                                    <div className="footerContentWight">
                                        <ul className='list-unstyled'>
                                            <li>
                                                <a href="https://balady.gov.sa/ar/" target="blank">{t('baladyGov')}</a>
                                            </li>
                                            <li>
                                                <a href="https://momrah.gov.sa/ar" target="blank">{t('MinistryofMunicipalandRuralAffairsandHousing')}</a>
                                            </li>
                                            <li>
                                                <a href="https://amanatalbaha.gov.sa/" target="blank">{t('AmanElbaha')}</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default TopFooter