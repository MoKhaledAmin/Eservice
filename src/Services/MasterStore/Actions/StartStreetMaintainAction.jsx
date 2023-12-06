// Axios Middleware
import Request from '../../../Middleware/Requests/RequestMaster';

const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
    'Content-Type': 'application/json'
};


export const SubmitStreetInfoAction = async (data) => {
    const response = await Request.post('Servicemodule/Custom/PrcStreetMaintenantServiceIns', data, { headers });
    return response.data;
}


export const InsertAttachmentAction = async (data) => {
    const response = await Request.post('Servicemodule/Custom/PrcStreetMaintenantAttIns', data, { headers });
    return response.data;
}