// с помощью роутера мы будем выполнять постраничную навигацию в нашем SPA (Single Page Application)

import Main from "@/components/pages/Main";                                        // импортируем стр. "Main"
import {createRouter, createWebHistory} from "vue-router";
import PostPage from "@/components/pages/PostPage";                                // импортируем стр. "PostPage"
import About from "@/components/pages/About";                                      // импортируем стр. "About"
import PostIdPage from "@/components/pages/PostIdPage";                            // импортируем стр. "PostIdPage"
import PostPageWithStore from "@/components/pages/PostPageWithStore";              // импортируем стр. "PostPageWithStore"
import PostPageCompositionApi from "@/components/pages/PostPageCompositionApi";    // импортируем стр. "PostPageCompositionApi"


const routes = [                                                        // создаём массив, состоящий из объектов, в которых мы будем описывать маршруты к нашим стр.
    {
        path: '/',                                                      // обязательное поле, + в данном случае содержащее "корень" ("/")
        component: Main                                                 // и компонент, который по этому пути должен отрисовываться
    },
    {
        path: '/posts',
        component: PostPage
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/posts/:id',
        component: PostIdPage
    },
    {
        path: '/store',
        component: PostPageWithStore
    },
    {
        path: '/composition',
        component: PostPageCompositionApi
    },

]

const router = createRouter({                                           // создаём сам роутер, по аналогии с созданием ф-ции "createApp", созд. ф-цию "createRouter"
    routes,                                                             // передаём "роуты"
    history: createWebHistory(process.env.BASE_URL)                     // и созд. "вэб-историю" и параметрами в эту ф-цию передаём ~ окружения "BASE_URL"
})

export default router;                                                  // экспортируем отсюда по-умолчанию "роутер"
