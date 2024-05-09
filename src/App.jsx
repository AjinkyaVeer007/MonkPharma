import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Appreciation from "./pages/Appreciation";
import DoctorCertificate from "./pages/DoctorCertificate";
import MothersDayCertificate from "./pages/MothersDayCertificate";

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
    {
      path: "/mothersday",
      element: <MothersDayCertificate />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
