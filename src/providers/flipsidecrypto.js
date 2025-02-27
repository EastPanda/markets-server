const { create } = require('axios')

const axios = create({
  baseURL: 'https://api.flipsidecrypto.com/api',
  timeout: 180000,
  headers: {}
})

exports.getBnbActiveStats = () => {
  const mapper = item => ({
    platform: 'binance-smart-chain',
    period: item.PERIOD,
    address_count: item.ADDRESS_COUNT
  })

  return axios.get('v2/queries/615a678a-7355-438a-8e42-7e36ab7a99fc/data/latest')
    .then(({ data }) => data.map(mapper))
    .catch(e => {
      console.log(e.message)
      return []
    })
}

exports.getMonthlyAddressStats = queryId => {
  const mapper = item => ({
    platform: item.PLATFORM,
    period: item.PERIOD,
    address_count: item.ADDRESS_COUNT
  })

  return axios.get(`v2/queries/${queryId}/data/latest`)
    .then(({ data }) => data.map(mapper))
    .catch(e => {
      console.log(e.message)
      return []
    })
}

exports.getActiveAddresses = queryId => {
  const mapper = item => ({
    platform: item.PLATFORM,
    period: item.PERIOD,
    block_date: item.BLOCK_DATE,
    address_count: item.ADDRESS_COUNT
  })

  return axios.get(`v2/queries/${queryId}/data/latest`)
    .then(({ data }) => data.map(mapper))
    .catch(e => {
      console.log(e.message)
      return []
    })
}
