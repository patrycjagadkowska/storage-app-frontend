import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Signup from "./pages/Home/Signup";
import Login from "./pages/Home/Login";
import PlansPage from "./pages/Home/PlansPage";
import ReviewsPage from "./pages/Home/ReviewsPage";

import DashboardLayout from "./components/Layout/DashboardLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Settings, { loader as settingsLoader } from "./pages/Dashboard/Settings";
import Contacts, { loader as contactsLoader } from "./pages/Dashboard/Contacts";
import Supplies, { loader as suppliesLoader } from "./pages/Dashboard/Supplies";
import Sales, { loader as salesLoader } from "./pages/Dashboard/Sales";
import Stock, { loader as stockLoader } from "./pages/Dashboard/Stock";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "signup",
          element: <Signup />
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "plans",
          element: <PlansPage />
        },
        {
          path: "reviews",
          element: <ReviewsPage />
        }
      ]
    }, {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />
        },
        {
          path: "settings",
          element: <Settings />,
          loader: settingsLoader
        },
        {
          path: "contacts",
          element: <Contacts />,
          loader: contactsLoader
        },
        {
          path: "supplies",
          element: <Supplies />,
          loader: suppliesLoader
        },
        {
          path: "sales",
          element: <Sales />,
          loader: salesLoader
        },
        {
          path: "stock",
          element: <Stock />,
          loader: stockLoader
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
