import axios from "axios";

export const postModule = {
    state: () => ({                                                                                                             // объявляем сост., которое возвр. в виде ф-ции
        posts: [],
        isPostsLoading: false,
        selectedSort: '',
        searchQuery: '',
        page: 1,
        limit: 100,
        totalPages: 0,
        sortOptions: [
            {value: 'title', name: 'По названию'},
            {value: 'body', name: 'По содержимому'},
        ]
    }),
    getters: {                                                                                                                  // "getters" это просто объект
        sortedPosts(state) {
            //return []
            if (state.selectedSort) {
                return [...state.posts].sort((post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
            } else {
                return [...state.posts]
            }
        },
        sortedAndSearchedPosts(state, getters) {
            //return []
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: {
        removePost(state, post_id) {
            console.log('mut:', post_id)
            state.posts = state.posts.filter(p => p.id !== post_id)
        },                                                                                                            // "mutations" для изм. сост.
        setPosts(state, posts) {
            state.posts = posts;
        },
        setLoading(state, bool) {
            state.isPostsLoading = bool
        },
        setPage(state, page) {
            state.page = page
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery
        },
    },
    actions: {
        async fetchPosts({state, commit}) {
            console.log('fetch')                                                        //созд. ф-цию fetchPosts "state"  - для состояния, "commit" нужен для вызова мутаций
            try {
                commit('setLoading', true);
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                });
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit)) // изм. сост. с помощью мутации
                commit('setPosts', response.data)                                                   // посты мы изм. мутацией
            } catch (e) {
                console.log(e)
            } finally {
                commit('setLoading', false);
            }
        },
        async loadMorePosts({state, commit}) {
            try {
                commit('setPage', state.page + 1)
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                });
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setPosts', [...state.posts, ...response.data]);
            } catch (e) {
                console.log(e)
            }
        }
    },
    namespaced: true                                                                                    // добавляем флаг "namespaced" со знач. "true"
}
