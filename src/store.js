import { createStore } from "redux";
import rootReducer from "./reducers";

const store = createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    store.subscribe(() => {
       // localStorage.setItem("testLocal", JSON.stringify(store.getState()));
      });

export default store;

      