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
  return `products/category/${category}`;
};

//cart

const addCart = () => {
  return `carts`;
};

const getUserCart = (user = 2) => {
  return `carts/user/${user}`;
};

//authentication
const loginUser = () => {
  return `auth/login`;
};

const signup = () => {
  return `users`;
};

export {
  products,
  categories,
  getProductinspecificCategory,
  getSingleProduct,
  loginUser,
  addCart,
  getUserCart,
  signup,
};
