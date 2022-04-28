import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'



 import Toaster from "@meforma/vue-toaster";
//import messagePlugin from '@/utils/message.plugin'
import 'materialize-css/dist/js/materialize.min'

const app = createApp(App)

app.use(store)
app.use(Toaster)
app.use(router)
app.mount('#app')
