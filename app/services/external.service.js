import axios from 'axios'
import config from 'config'

// CONSTANTS
const CURRENCY_API_KEY = config.get('CURRENCY_API_KEY')

class ExternalAPIService {
  async getExchangeRate() {
    return await axios.get(
      `http://api.currencylayer.com/live?access_key=${CURRENCY_API_KEY}&format=1`
    )
  }

  async getCurrencies() {
    return await axios.get(
      `http://api.currencylayer.com/list?access_key=${CURRENCY_API_KEY}`
    )
  }
}

export default new ExternalAPIService()
