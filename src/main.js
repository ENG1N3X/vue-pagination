import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import materialize from '../node_modules/materialize-css/dist/css/materialize.min.css'
import styles from './assets/styles/styles.scss'

createApp(App).use(router).use(materialize).use(styles).mount('#app')
