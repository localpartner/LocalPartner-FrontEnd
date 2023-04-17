import { API,API_BASE} from '../config';

export const signup = user => {
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const signin = user => {
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const signout = next => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        next();
        return fetch(`${API}/signout`, {
            method: 'GET'
        })
            .then(response => {
                console.log('signout', response);
            })
            .catch(err => console.log(err));
    }
};

export const getToken = (data)=>{
    const basicAuth = Buffer.from("FE_WEB" + ":" + "secret").toString('base64');
    
    const requestObj =  {
        method: 'POST',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + basicAuth
        },    
        body: new URLSearchParams({
            'username': data.mobileNo,
            'password': data.otp,
            'grant_type': 'password'
            
        })
    };

    return fetch(`${API_BASE}/oauth/token`,requestObj).then(responce => {
        return responce.json();
    }).catch(error => 
        console.log("Error :" ,error));

    
}

export const otpVerification = data =>{
    return fetch(`${API}/otpVerification`,{
        method : "POST",
        headers : {
            Accept : 'application/json',
            'content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    }).then(responce => {
        return responce.json();
    }).catch(error => 
        console.log("Error :" ,error));
}

export const getResendOTP = user => {
    return fetch(`${API}/getResendOTP`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};