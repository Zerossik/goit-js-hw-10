import './css/styles.css';
import Debounce from "lodash.debounce"

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box')
let inputValue = '';

function hendlerInputValue (evt) {
    if(inputEl.value === ''){
        return
    }
}

function getDate (){ 
    fetch(`https://restcountries.com/v3.1/name/${inputValue}`)
    .then((response) => response.json())
    .then((data) => console.log(data))
}

// Получить доступ к инпуту, и повесить на него событие input/ Событие должно срабатывать не чаще 300мс.
//(для этого используем библиотеку(lodash.debounce.)).
// Значение с инпута сохранить в переменную. Удалить все пробелы с помощью метода tream()
// написать функцию, которая будет делать запрос на сервер и возвращать результат.

// Сделать валидацию ответа от сервера, если длина массива больше 10, то вывести Алерт ("Too many matches found. Please enter a more specific name.")
// если количество стран от 2-10, то отрендерить это же количество <li> внутри которого img с флагом и <p> с названием
// Если страна одна, то создаем функцию, которая будет рендерить одну лишку, внутри которой данные про данную страну.

// После выполнения вышеперечисленного, обрабатываем ошибки.

// необходимые либы - lodash.debounce, notiflix
inputEl.addEventListener('input', Debounce(hendlerInputValue, 300))