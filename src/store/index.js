import {createStore} from 'vuex'
import auth from './auth'
import info from "@/store/info"
import category from "@/store/category"
import record from "@/store/record";

export default createStore({
    state: {},
    getters: {

    },
    mutations: {},
    actions: {
        async fetchCurrency() {
            const key = process.env.VUE_APP_FIXER
            const res = await fetch(`https://data.fixer.io/api/latest?access_key=fTvZh28FOEDvyNS17jTWeRdnWDuWEOm5&symbols=RUB,EUR,USD`)
            return await res.json()

        }
    },
    modules: {
        auth,
        info,
        category,
        record
    }
})
