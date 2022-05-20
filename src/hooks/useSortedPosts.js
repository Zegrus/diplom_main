                                                                // данный хук для отсортированных постов
import {ref, computed} from 'vue'                               // импортируем сюда "ref"

export default function useSortedPosts(posts) {                 // параметром в ф-ции принимаем отсортированные посты, т.к. их надо получить извне
    const selectedSort = ref('')                                // созд. реактивную ~ "selectedSort"
    const sortedPosts = computed(() => {                        // внутри хука созд. "computed - свойства" и в неё параметром передаём некий "callback", кот. должен что-то вернуть
        return [...posts.value].sort((post1, post2) => post1[selectedSort.value]?.localeCompare(post2[selectedSort.value])) // вернуть должне отсортированный массив с постами
    })

    return {                                                    // по итогу из этого хука мы возвращаем "selectedSort" и отсортированные посты
        selectedSort, sortedPosts
    }
};
