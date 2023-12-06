import React, { useEffect, useState } from "react";

// translation
import { useTranslation } from 'react-i18next';

import { GetLightingRequests } from "../../Services/MasterStore/Reducers/ShowRequestsSlice";

// Master Hooks
import { useAppDispatch, useAppSelector } from "../../Services/MasterStore/MasterHook";

// Styles
import "./ShowRequest.css";

const ShowRequest = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(GetLightingRequests());
    }, [dispatch])

    const LightRequst = useAppSelector((state) => state.ShowRequest.LightingRequest.REF_ID);

    // Filter
    const [SearchValue, setSearchValue] = useState([]);
    const Searching = (Event) => {
        !!LightRequst?.length &&
            setSearchValue(
                LightRequst.filter((Row) => {
                    return Object.keys(Row).some((Column) => {
                        return (
                            Row[Column] &&
                            Row[Column].toString()
                                .toLowerCase()
                                .indexOf(Event.target.value.toLowerCase()) !== -1
                        );
                    });
                })
            );
    };

    useEffect(() => {
        setSearchValue(LightRequst)
    }, [LightRequst])

    // pagination
    const [SaleTabel, setSaleTabel] = useState([]);
    const [PaginationSize, setPaginationSize] = useState(2);
    const [CurrentPage, setCurrentPage] = useState(0);
    const [PageNumber, setPageNumber] = useState(0);
    const numbers = [...Array(PageNumber).keys()].slice(0);

    useEffect(() => {
        if (SearchValue && SearchValue.length !== 0) {
            setPaginationSize(10);
            const PageSize = Number(PaginationSize);
            const PagesNumber = Math.ceil(SearchValue.length / PageSize);
            const FirstIndexPage = CurrentPage * PageSize;
            const LastIndexPage = FirstIndexPage + PageSize;
            setSaleTabel(SearchValue.slice(FirstIndexPage, LastIndexPage));
            setPageNumber(PagesNumber);
        }
    }, [PaginationSize, CurrentPage, SearchValue]);

    // Next Pages Group
    const NextPage = () => {
        if (Number(CurrentPage) !== PageNumber - 1) {
            setCurrentPage(Number(CurrentPage) + 1);
        }
    };

    // Change Pages
    const changePage = (id) => {
        setCurrentPage(id);
    }

    // Previous Pages Group
    const PreviousPage = () => {
        if (Number(CurrentPage) !== 0) {
            setCurrentPage(Number(CurrentPage) - 1);
        }
    };

    return (
        <React.Fragment>
            <div className="dataTable container-fluid">
                <div className="mb-2 row">
                    <div className="col-lg-6 col-xxl-3">
                        <input type="search" className="form-control" placeholder={t("SearhPlaceholder")} onChange={(e) => Searching(e)} />
                    </div>
                </div>
                <div>
                    <table role="table" className="align-middle table-nowrap table-check table">
                        <thead className="table-light">
                            <tr role="row">
                                <th>{t('RequestNumber')}</th>
                                <th>{t('RequestType')}</th>
                                <th>{t('RequestStatus')}</th>
                                <th>{t('Notes')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                SaleTabel.map((d, i) => (
                                    <tr key={i}>
                                        <td>{d.REQUEST_ID}</td>
                                        <td>{d.FORM_NAME}</td>
                                        <td>{d.REQUEST_STATE_TITLE}</td>
                                        <td>{d.NOTES}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="paginate row">
                    <div className="col-12">
                        <ul className="justify-content-center pagination">
                            <li className="page-item">
                                <button type="button" className="page-link" onClick={PreviousPage}>
                                    <i className={`bx ${localStorage.getItem('lang') === 'en' ? 'bx-chevron-left' : 'bx-chevron-right'}`}></i>
                                </button>
                            </li>
                            {
                                numbers.map((n, i) => (
                                    <li className={`page-item ${CurrentPage === n ? 'active' : ''}`} key={i}>
                                        <button type="button" className="page-link" onClick={() => changePage(n)}> {n + 1} </button>
                                    </li>
                                ))
                            }
                            <li className="page-item">
                                <button type="button" className="page-link" onClick={NextPage}>
                                    <i className={`bx ${localStorage.getItem('lang') === 'en' ? 'bx-chevron-right' : 'bx-chevron-left'}`}></i>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ShowRequest;