//products

const products = () => {
  return `products`;
};

const getSingleProduct = (id) => {
    return `products/${id}`;
  };
const categories = () => {
    return `products/categories`;
  };

  const getProductinspecificCategory = (category) => {
        return `products/category/${category}`
  }

export { products,categories,getProductinspecificCategory,getSingleProduct };
