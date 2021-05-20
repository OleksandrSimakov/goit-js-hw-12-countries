const axios = require('axios')
const countryCardEl = document.querySelector('.country-card')

import countryTemplate from './countryTemplate.hbs'

axios.defaults.baseURL = 'https://restcountries.eu/rest/v2/name'

export default function fetchCountries(searchQuery) {
  return axios
    .get(`/${searchQuery}?fields=name;capital;population;languages;flag`)
    .then((response) => {
      console.log(response.data.[0])
      const markup = countryTemplate(response.data.[0]);
      countryCardEl.insertAdjacentHTML('afterbegin', markup)
    })
    .catch((error) => console.log(error))
}
