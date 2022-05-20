                                                        // и в этот массив мы будем импортировать наши UI (User Interface) - элементы
import MyButton from "@/components/UI/MyButton";        // "Моя кнопка"
import MyInput from "@/components/UI/MyInput";          // "Мой ввод"
import MyDialog from "@/components/UI/MyDialog";        // "Мой диалог"

export default [                                        // по-умолчанию будем экспортировать массив
    MyButton,                                           // "Моя кнопка"
    MyInput,                                            // "Мой ввод"
    MyDialog                                            // "Мой диалог"
];
