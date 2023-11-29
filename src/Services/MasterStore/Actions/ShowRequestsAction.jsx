// Axios Middleware
import Request from '../../../Middleware/Requests/RequestMaster';

export const GetLightingRequestsAction = async () => {
    const response = await Request.get('Utility/Custom/PrcRequestForUserSel',{
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
    });
    return response.data;
}