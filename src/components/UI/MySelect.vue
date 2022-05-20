<template>
    <select v-model="modelValue" v-on:change="changeOption">
        <option v-bind:disabled="!unselectable" value="">Выберите из списка</option>
        <option v-for="option in options" v-bind:key="option.value" v-bind:value="option.value">{{ option.name }}</option>
    </select>
</template>
                                                                        <!-- выше созд. двусторонее связывание - modelValue -->
<script>
export default {
  name: 'my-select',                                                    // созд. компонент для сортировки и придумываем для него название
  props: {                                                              // созд. поле "props"
    modelValue: {                                                       // и указываем, что мы ожидаем "modelValue"
      type: String                                                      // и в качестве типа у нас будет просто строка с каким-то назв. (напр. "title или body")
    },
    options: {                                                          // также мы будем ожидать "options"
      type: Array,                                                      // в котором тип представляет из себя массив (по-умолчанию это будет пустой массив)
      default: () => []                                                 // это некий массив, т.е. объекты, которые представляют из себя пункты выпадающего списка, рекоменд. исп. такую стрелочную функцию
    },
    unselectable: {
        type: Boolean,
        default: false
    }
  },
  methods: {                                                            // объявляем в компоненте поле "methods"
    changeOption(event) {                                               // и создаём ф-цию "changeOption", которая параметром принимает некоторую опцию "event"
      this.$emit('update:modelValue', event.target.value);              // и для того, чтобы добиться двустороннего связывания, мы делаем "$emit", "update" и обновл. "modelValue"
    }
  }
}
</script>
