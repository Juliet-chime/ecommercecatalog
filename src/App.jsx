
import "./App.css";
import { AppContextProvider, useAppContext } from "./context/AppContext";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { routes } from "./routes";

function App() {

  const router = createBrowserRouter(routes)

  return (
    <div className="px-4 md:px-32">
    <RouterProvider router={router}/>
    {/* <AppContextProvider/> */}
    {/* </RouterProvider> */}
    </div>
  );
}

export default App;
