export default {
    props: {
        show: {                                                         // объявляем "props" "show" для модального окна
            type: Boolean,
            default: false
        }
    },
    methods: {
        hideDialog() {                                                  // ф-ция, которая скрывает диалог
            this.$emit('update:show', false)
        }
    },
    mounted() {
        console.log('mixin mounted')
    }
}
