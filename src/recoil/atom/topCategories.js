import { atom } from 'recoil';

export const topCategoriesState = atom({
    key: 'topCategoriesState', // unique ID (with respect to other atoms/selectors)
    default: [] // default value (aka initial value)
});  

