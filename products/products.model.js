const products = [
  {
    id: 'bimbimbap',
    description: 'Bimbimbap au poulet frit',
    price: 14.7,
    reviews: [
      { 
        rating: 4,
        comment: 'Pas mal...'
      }
    ],
  },
  {
    id: 'Donburi',
    description: 'Donburi saumon',
    price: 58.50,
    reviews: []
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


function addNewProduct(id, description, price) {
  const newProduct = {
    id,
    description,
    price,
    reviews: [],
  }

  products.push(newProduct);

  return newProduct;
}


function addNewProductReview(id, rating, comment) {
  const matchedProduct = getProductById(id);

  if (matchedProduct) {
    const newProductReview = { 
      rating, 
      comment 
    };

    matchedProduct.reviews.push(newProductReview);

    return newProductReview;
  }
}

module.exports = {
  getAllProducts,
  getProductsByPrice,
  getProductById,
  addNewProduct,
  addNewProductReview
}