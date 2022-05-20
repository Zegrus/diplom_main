                                                // для созд. глоб. хранилища исп. ф-ция "createStore"
import {createStore} from "vuex";               //
import {postModule} from "./postModule.js";

export default createStore({                    // параметром эта функция принимает объект и у этого объекта есть след. поля
    state: {                                    // это само состояние, здесь мы описываем данные, кот. будут в нашем приложении
      isAuth: false,
    },
    modules: {                                  // регистрируем "module"
        post: postModule                        // и в поле "post" передаём "postModule", к нему мы можем обращаться через поле пост
    }
})
