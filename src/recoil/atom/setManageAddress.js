import { atom } from 'recoil';

export const setManageAddress = atom({
    key: 'setManageAddress', // unique ID (with respect to other atoms/selectors)
    default: [] // default value (aka initial value)
});  