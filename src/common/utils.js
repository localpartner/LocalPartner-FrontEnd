export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
};

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        let obj = JSON.parse(localStorage.getItem('jwt'));
        // console.log("obj",obj)
        // obj.token = obj.accessToken;
        return obj;
    } else {
        return false;
    }
};