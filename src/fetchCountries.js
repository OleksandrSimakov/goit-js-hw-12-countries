import countryTemplate from './countryTemplate.hbs'
import countryList from './countryList.hbs'
import { error, defaults } from '@pnotify/core'
import '@pnotify/core/dist/BrightTheme.css'

defaults.sticker = false
defaults.closer = false
defaults.icon = false
defaults.minHeight = '20px'
defaults.delay = 4000

const axios = require('axios')
const countryCardEl = document.querySelector('.country-card')

axios.defaults.baseURL = 'https://restcountries.eu/rest/v2/name'

export default function fetchCountries(searchQuery) {
  return axios
    .get(`/${searchQuery}?fields=name;capital;population;languages;flag`)
    .then((response) => {
      // console.log(response.data)
      if (response.data.length > 10) {
        return error({
          text: 'Too many matches found. Please enter a more specific query!',
        })
      } else if (response.data.length >= 2 && response.data.length <= 10) {
        const markup = countryList(response.data)
        countryCardEl.insertAdjacentHTML('afterbegin', markup)
      } else {
        const markup = countryTemplate(response.data[0])
        countryCardEl.insertAdjacentHTML('afterbegin', markup)
      }
    })
    .catch((error) => console.log(error))
}
