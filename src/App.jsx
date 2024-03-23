import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Appreciation from "./pages/Appreciation";
import LandingPage from "./pages/LandingPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/appreciation/:userId",
      element: <Appreciation />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
