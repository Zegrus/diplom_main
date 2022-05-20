                                                                                    // данный хук для отсортированных и найденых постов
import {ref, computed} from 'vue'

export default function useSortedPosts(sortedPosts) {
    const searchQuery = ref('')                                                     // созд. реактивную ~ "searchQuery"

    const sortedAndSearchedPosts = computed(() => {                                // внутри хука созд. "computed - свойства" и в неё параметром передаём некий "callback", кот. должен что-то вернуть
        return sortedPosts.value.filter(post => post.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
    })

    return {                                                                             // по итогу из этого хука мы возвращаем "searchQuery" и отсортированные и найденные посты
        searchQuery, sortedAndSearchedPosts
    }
};
