import { createApp } from 'vue'                     // см. док-цию
import App from './App'                             // импортируем компонент "App" и передаём этот компонент в ф-цию "create App"
import components from "@/components/UI";           // импортируем компоненты из папки UI (MyBatton, MyInput, MyDialog)
import directives from '@/directives';
import router from "./components/router/router.js"
import store from './components/store';

const app = createApp(App)

components.forEach(component => {                   // далее создаём компоненты
    app.component(component.name, component)        // ф-ция createApp(App) возвр. экз. приложения, соотв. этот экз. мы може поместить в некоторую ~, см. док-цию
})

directives.forEach(directive => {                   //
    app.directive(directive.name, directive)        //
})

app.use(router).use(store).mount('#app');                      // ~ наз. "app",создаём экземпляр приложения, "вмонтируем" приложение в корневой "div", далее исп. "router", далее регимтрируем "роутер" с пом. ф-ции "use" и в эту функцию как раз передаём "роутер"
