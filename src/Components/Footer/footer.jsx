import React from 'react';

// transalation
import { useTranslation } from 'react-i18next';
// css
import "./footer.css"

const Footer = () => {
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <div className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="footerCopyright">
                                <div className="copyright">
                                    <p> {t('CopyRight')} © 2023</p>
                                    <ul className="footerIcons">
                                        <li>
                                            <a href="/" aria-label="faceBook">
                                                <i className="bi bi-facebook"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/" aria-label="twitter">
                                                <i className="bi bi-twitter-x"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/" aria-label="youtube">
                                                <i className="bi bi-youtube"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/" aria-label="linkedin">
                                                <i className="bi bi-linkedin"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default Footer