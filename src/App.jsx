import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Appreciation from "./pages/Appreciation";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Appreciation />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
