import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";

const store = createStore({
    plugins: [createPersistedState()],
    state: {
       count: 0,
       theme:""
    },
    mutations: {
        setCount: (state, count) => state.count = count,
        setTheme: (state, theme) => state.theme = theme,
    },
    getters: {
        getCount: (state) =>
        {
            return state.count;
        },
        getTheme: (state) =>
        {
           return state.theme
        }
    }  
})
export default store;