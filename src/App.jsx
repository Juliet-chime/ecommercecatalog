import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";

function App() {
  const router = createBrowserRouter(routes);

  return (
    <div className="px-4 md:px-10 lg:px-32">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
