// Axios Middleware
import Request from '../../../Middleware/Requests/RequestMaster';

//  Sign up
export const SignUpAction = async (user) => {
    const response = await Request.post('Servicemodule/Custom/PrcCitizenUserIns', user);
    return response.data;
}

export const SigninAction = async (userSignIn) => {
    const response = await Request.post('security/sys_user/login', userSignIn);
    return response.data;
}