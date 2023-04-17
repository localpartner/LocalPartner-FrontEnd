import { atom } from 'recoil';

export const progressBarState = atom({
    key: 'progressBarState', // unique ID (with respect to other atoms/selectors)
    default: true // default value (aka initial value)
});  

