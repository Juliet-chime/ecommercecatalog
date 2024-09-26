import Layout from "components/Layout";
import HomePage from "pages/home";
import ProductDetails from "./pages/productdetails/ProductDetails";
import { Authentication } from "./pages/auth/Authentication";

export const routes = [
  {
    path: "/authentication",
    element: <Authentication/>
  },
    {
      element: <Layout />,

      children: [
        {
          path: "/",
          element: <HomePage/>
        },
        {
          path: "/product/:id",
          element: <ProductDetails/>
        },
      ],
      },
    
]