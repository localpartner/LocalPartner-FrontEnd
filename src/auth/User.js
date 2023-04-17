import { API } from '../config';

export const adminsignin = admin => {
    return fetch(`${API}/usersignin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(admin)
    })
        // .then(response => {
        //     return response.json();
        // })
        // .catch(err => {
        //     console.log(err);
        // });
        
};
