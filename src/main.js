import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toaster from "@meforma/vue-toaster"
import Loader from "@/components/app/Loader";
import 'materialize-css/dist/js/materialize.min'
import tooltipDirective from '@/directives/tooltip.direcrive'



// -- Fire base
import { initializeApp } from 'firebase/app'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'




// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-analytics.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
//
// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
 apiKey: "AIzaSyCuxrQa8JjsHxoBAuasw9OpelhvziCKqSA",
 authDomain: "crm-counting.firebaseapp.com",
 projectId: "crm-counting",
 storageBucket: "crm-counting.appspot.com",
 messagingSenderId: "664649757125",
 appId: "1:664649757125:web:90d3a9af329d1e4e64dbac",
 measurementId: "G-B9CCBCY3M5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//const analytics = getAnalytics(appFireBase);



let app


firebase.auth().onAuthStateChanged(()=> {
 if(!app){
  app = createApp(App)

  app.use(store)
  app.use(Toaster)
  app.directive('tooltip', tooltipDirective)
  app.component('Loader', Loader)
 // app.component('Pagination', Pagination)
  app.use(router)
  app.mount('#app')
 }

})


