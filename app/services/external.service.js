import axios from 'axios'
import config from 'config'

// CONSTANTS
const CURRENCY_API_KEY = config.get('CURRENCY_API_KEY')

class ExternalAPIService {
  async getExchangeRate() {
    const data = await axios.get(
      `http://api.currencylayer.com/live?access_key=${CURRENCY_API_KEY}&format=1`
    )
    console.log(data)
  }

  async getCurrencies() {
    const data = await axios.get(
      `http://api.currencylayer.com/list?access_key=${CURRENCY_API_KEY}`
    )
    console.log(data)
  }
}

export default new ExternalAPIService()
