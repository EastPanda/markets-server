require('dotenv/config')

const { Command } = require('commander')
const sequelize = require('../src/db/sequelize')
const CoinPriceSyncer = require('../src/services/CoinPriceSyncer')

const program = new Command()
  .option('-c --coins <coins>', 'sync given coins')
  .option('-h --history', 'sync historical data')
  .option('-a --all', 'sync all historical data')
  .option('-s --simple', 'sync simple price')
  .parse(process.argv)

async function start({ coins, history, all, simple }) {
  await sequelize.sync()
  const syncer = new CoinPriceSyncer(simple)
  const uids = coins ? coins.split(',') : null

  if (coins && history) {
    return syncer.syncHistory(uids, all)
  }

  return coins
    ? syncer.sync(uids)
    : syncer.start()
}

module.exports = start(program.opts())
