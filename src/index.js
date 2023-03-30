import './css/styles.css';
import Debounce from 'lodash.debounce';
import { getDate } from './fetchcountries';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 1000;
const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const countriesInfoEl = document.querySelector('.country-info');

function hendlerInputValue() {
  if (inputEl.value === '') {
    listEl.innerHTML = '';
    countriesInfoEl.innerHTML = '';
    return;
  }

  getDate(inputEl.value.trim()).then(data => {
    if (data.length > 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');
      listEl.innerHTML = '';
      countriesInfoEl.innerHTML = '';
      return;
    } else if (data.length >= 2) {
      countriesInfoEl.innerHTML = '';
      const countries = data
        .map(el => {
          return `
          <li class="country-list__item">
              <img src="${el.flags.svg}" width="30" alt="${el.flags.alt}">
              <p>${el.name.common}</p>
          </li>
              `;
        })
        .join(' ');
      listEl.insertAdjacentHTML('beforeend', countries);
    } else if (data.length === 1) {
      listEl.innerHTML = '';
      markupCountry(data);
      return;
    }
  });
}
function markupCountry(date) {
  const country = date.map(el => {
    console.log(el);
    return `
    <div class="contry-wrap">
    <img src="${el.flags.svg}" alt="${el.flags.alt}" width="100">
    <h1>${el.name.official}</h1>
    </div>
    <div class="country-desc">
    <p class ="country-text">Capital: <span class="country-value">${
      el.capital
    }</span></p>
    <p class ="country-text">Population: <span class="country-value">${
      el.population
    }</span></p>
    <p class ="country-text">Languages: <span class="country-value">${Object.values(
      el.languages
    )}</span></p>
    </div>
    `;
  });
  countriesInfoEl.innerHTML = '';

  countriesInfoEl.insertAdjacentHTML('beforeend', country);
}

// Получить доступ к инпуту, и повесить на него событие input/ Событие должно срабатывать не чаще 300мс.
// Значение с инпута сохранить в переменную. Удалить все пробелы с помощью метода tream()   languages
// написать функцию, которая будет делать запрос на сервер и возвращать результат.

// Сделать валидацию ответа от сервера, если длина массива больше 10, то вывести Алерт ("Too many matches found. Please enter a more specific name.")
// если количество стран от 2-10, то отрендерить это же количество <li> внутри которого img с флагом и <p> с названием
// Если страна одна, то создаем функцию, которая будет рендерить одну лишку, внутри которой данные про данную страну.

// После выполнения вышеперечисленного, обрабатываем ошибки.

// необходимые либы - lodash.debounce, notiflix
inputEl.addEventListener('input', Debounce(hendlerInputValue, DEBOUNCE_DELAY));
