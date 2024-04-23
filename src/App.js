import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Signup from "./pages/Home/Signup";
import Login from "./pages/Home/Login";
import PlansPage from "./pages/Home/PlansPage";
import ReviewsPage from "./pages/Home/ReviewsPage";

import DashboardLayout from "./components/Layout/DashboardLayout";
import Dashboard, {loader as dashboardLoader } from "./pages/Dashboard/Dashboard";
import Settings, { loader as settingsLoader } from "./pages/Dashboard/Settings";
import Contacts, { loader as contactsLoader } from "./pages/Dashboard/Contacts";
import Supplies, { loader as suppliesLoader } from "./pages/Dashboard/Supplies";
import Sales, { loader as salesLoader } from "./pages/Dashboard/Sales";
import Stock, { loader as stockLoader } from "./pages/Dashboard/Stock";
import ErrorBoundary from "./pages/ErrorBoundary";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          index: true,
          element: <Home />,
          errorElement: <ErrorBoundary />
        },
        {
          path: "signup",
          element: <Signup />,
          errorElement: <ErrorBoundary />
        },
        {
          path: "login",
          element: <Login />,
          errorElement: <ErrorBoundary />
        },
        {
          path: "plans",
          element: <PlansPage />,
          errorElement: <ErrorBoundary />
        },
        {
          path: "reviews",
          element: <ReviewsPage />,
          errorElement: <ErrorBoundary />
        },
        {
          path: "*",
          element: <NotFoundPage />,
          errorElement: <ErrorBoundary />
        }
      ]
    }, {
      path: "/dashboard",
      element: <DashboardLayout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          index: true,
          element: <Dashboard />,
          loader: dashboardLoader,
          errorElement: <ErrorBoundary />
        },
        {
          path: "settings",
          element: <Settings />,
          loader: settingsLoader,
          errorElement: <ErrorBoundary />
        },
        {
          path: "contacts",
          element: <Contacts />,
          loader: contactsLoader,
          errorElement: <ErrorBoundary />
        },
        {
          path: "supplies",
          element: <Supplies />,
          loader: suppliesLoader,
          errorElement: <ErrorBoundary />
        },
        {
          path: "sales",
          element: <Sales />,
          loader: salesLoader,
          errorElement: <ErrorBoundary />
        },
        {
          path: "stock",
          element: <Stock />,
          loader: stockLoader,
          errorElement: <ErrorBoundary />
        },
        {
          path: "*",
          element: <NotFoundPage />,
          errorElement: <ErrorBoundary />
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
