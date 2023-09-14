const products = [
  {
    id: 'bimbimbap',
    description: 'Bimbimbap au poulet frit',
    reviews: [
      { 
        rating: 4,
        comment: 'Pas mal...'
      }
    ],
    price: 14.7,
  },
  {
    id: 'Donburi',
    description: 'Donburi saumon',
    price: 58.50,
  }
];

function getAllProducts() {
  return products;
}

function getProductsByPrice(min, max) {
  return products
  .filter((product) =>
    product.price >= min && product.price <= max
  );
}

function getProductById(id) {
  return products.find((product) => product.id === id);
}

module.exports = {
  getAllProducts,
  getProductsByPrice,
  getProductById
}