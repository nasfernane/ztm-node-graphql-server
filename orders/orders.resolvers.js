const ordersModel = require('./orders.model')

module.exports = {
  Query: {
    orders: (parent) => {
      console.log('Récupération des commandes')
      return ordersModel.getAllOrders();
    }
  }
}

