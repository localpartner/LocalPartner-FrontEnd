export const otp = (next) =>{
    const min = 100000;
    const max = 999999;
    const genratedOtp = Math.floor(min + Math.random() * (max - min));
    return JSON.parse(genratedOtp);
    next();
}