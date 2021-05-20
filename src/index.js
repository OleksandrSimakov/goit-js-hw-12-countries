// Theme import
import * as _ from 'lodash'
import './styles.css'
import fetchCountries from './fetchCountries.js'

const inputEl = document.querySelector('.country')

inputEl.addEventListener('input', _.debounce(onInput, 500))

function onInput(e) {
  const inputText = e.target.value
  fetchCountries(inputText)
}
