                                                                // use posts будет отвечать за загрузку постов с сервера

import axios from "axios";
import {ref, onMounted} from 'vue';

export function usePosts(limit) {                                                                       // экспортируем одноимённую ф-цию
    const posts = ref([])                                                                               // созд. реактивные ~, по-умолчанию это будет пустой массив
    const totalPages = ref(0)
    const isPostsLoading = ref(true)                                                                    // отв. за то подгр. посты или подгрузка уже закончилась
    const fetching = async () => {                                                                      // созд. стрелочную асинхронную ф-цию
        try {                                                                                           // и всё, что связано с загр. постов мы перенесём в эту ф-цию
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {            // подгружаем данные из данного ресурса
                params: {
                    _page: 1,
                    _limit: limit
                }
            });
            totalPages.value = Math.ceil(response.headers['x-total-count'] / limit)
            posts.value = response.data;
        } catch (e) {
            alert('Ошибка')
        } finally {
            isPostsLoading.value = false;
        }
    }

    onMounted(fetching)                                                                                  // ф-ция должна отрабатывать, когда компонент монтируется

    return {
        posts, isPostsLoading, totalPages
    }
}
