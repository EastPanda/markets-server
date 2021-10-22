const AdminJS = require('adminjs')
const CountryList = require('country-list')
const AdminJSExpress = require('@adminjs/express')
const AdminJSSequelize = require('@adminjs/sequelize')
const sequelize = require('../db/sequelize')

AdminJS.registerAdapter(AdminJSSequelize)

const adminJs = new AdminJS({
  resources: [
    {
      resource: sequelize.Coin,
      options: {
        editProperties: ['uid', 'name', 'code', 'coingecko_id', 'description', 'security', 'genesis_date'],
        properties: {
          id: { isId: true },
          security: { type: 'mixed' },
          'security.privacy': {
            type: 'string',
            availableValues: [{
              label: 'low',
              value: 'low'
            }, {
              label: 'medium',
              value: 'medium'
            }, {
              label: 'high',
              value: 'high'
            }]
          },
          'security.decentralized': { type: 'boolean' },
          'security.confiscation_resistance': { type: 'boolean' },
          'security.censorship_resistance': { type: 'boolean' },
        }
      }
    },
    sequelize.Language,
    sequelize.Platform,
    {
      resource: sequelize.CoinCategories,
      options: {
        filterProperties: ['category_id', 'coin_id'],
        editProperties: ['category_id', 'coin_id'],
        listProperties: ['category_id', 'coin_id']
      }
    },
    {
      resource: sequelize.Category,
      options: {
        properties: {
          description: { type: 'mixed' },
          'description.en': { type: 'textarea' },
          'description.ru': { type: 'textarea' },
        }
      }
    },
    {
      resource: sequelize.Treasury,
      options: {
        properties: {
          country: {
            availableValues: CountryList.getData()
              .map(item => ({
                value: item.code,
                label: item.name
              }))
          }
        }
      }
    },
    sequelize.Fund,
    {
      resource: sequelize.FundsInvested,
      options: {
        properties: {
          funds: { type: 'mixed', isArray: true },
          'funds.id': { reference: 'funds', isRequired: true },
          'funds.is_lead': { type: 'boolean' }
        }
      }
    }
  ],
  dashboard: {},
  rootPath: '/admin',
  version: {
    admin: true,
    app: '1.0.0'
  },
  branding: {
    companyName: 'Coins admin',
  },
})

const tmpAdmin = {
  email: 'admin@mail.com',
  password: 'admin'
}

const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  authenticate: async (email, password) => {
    if (tmpAdmin.password === password && tmpAdmin.email === email) {
      return tmpAdmin
    }

    return null
  },
  cookieName: 'key-cookie-name',
  cookiePassword: 'key-cookie-password'
}, null, {
  resave: false,
  saveUninitialized: true
})

module.exports = router
