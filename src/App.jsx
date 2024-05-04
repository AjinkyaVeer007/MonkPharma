import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Appreciation from "./pages/Appreciation";
import DoctorCertificate from "./pages/DoctorCertificate";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Appreciation />,
    },
    {
      path: "/doctorcertificate",
      element: <DoctorCertificate />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
