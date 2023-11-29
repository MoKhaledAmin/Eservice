// Axios Middleware
import Request from '../../../Middleware/Requests/RequestMaster';

export const GetNserviceAction = async (data) => {
    const response = await Request.post('Servicemodule/Custom/PrcServiceSel', data);
    return response.data;
}

export const PrcServiceDetailSel = async (payload) => {
    const response = await Request.post(`Servicemodule/Custom/PrcServiceDetailSel`,  payload);
    return response.data;
}