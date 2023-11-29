// Axios Middleware
import Request from '../../../Middleware/Requests/RequestMaster';

export const GetClientAction = async () => {
    const response = await Request.get('Servicemodule/Custom/PrcClientDdl', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
    return response.data;
}

export const GetDistricAction = async () => {
    const response = await Request.get('Utility/Custom/PrcDistrictsDdl', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
    return response.data;
}

export const GetStreetAction = async () => {
    const response = await Request.get('Utility/Custom/PrcSsDdltreets', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
    return response.data;
}

export const GetPlanAction = async () => {
    const response = await Request.get('Utility/Custom/PrcPlansDdl', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
    return response.data;
}

export const DisplayAttachedAction = async (id) => {
    const response = await Request.get(`ServiceModule/Nservice/${id}`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
    return response.data;
}

const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
    'Content-Type': 'application/json'
};


export const SubmitInfoAction = async (data) => {
    const response = await Request.post('Servicemodule/Custom/PrcApplicationServiceIns', data, { headers });
    return response.data;
}


export const InsertAttachAction = async (data) => {
    const response = await Request.post('Servicemodule/Custom/PrcLightingAttIns', data, { headers });
    return response.data;
}

export const UploadAttachAction = async (data) => {
    const response = await Request.post('/Coject/File/UploadFormCollection', data, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}