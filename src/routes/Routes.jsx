import {
  createBrowserRouter,
  RouterProvider, // ← NEW
  redirect, // optional helpers
} from "react-router";
import { Suspense, lazy } from "react";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import ErrorBoundary from "../components/ErrorBoundary";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import SellerRoute from "./SellerRoute";

/* lazies … */
const Home = lazy(() => import("../pages/Home/Home"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const Login = lazy(() => import("../pages/Login/Login"));
const SignUp = lazy(() => import("../pages/SignUp/SignUp"));
const PlantDetails = lazy(() => import("../pages/PlantDetails/PlantDetails"));
const AddPlant = lazy(() => import("../pages/Dashboard/Seller/AddPlant"));
const ManageUsers = lazy(() => import("../pages/Dashboard/Admin/ManageUsers"));
const Profile = lazy(() => import("../pages/Dashboard/Common/Profile"));
const Statistics = lazy(() => import("../pages/Dashboard/Common/Statistics"));
const MyInventory = lazy(() => import("../pages/Dashboard/Seller/MyInventory"));
const ManageOrders = lazy(() =>
  import("../pages/Dashboard/Seller/ManageOrders")
);
const MyOrders = lazy(() => import("../pages/Dashboard/Customer/MyOrders"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner fullPage />}>
            <ErrorBoundary>
              <Home />
            </ErrorBoundary>
          </Suspense>
        ),
        loader: async () => {
          const res = await fetch(`${import.meta.env.VITE_API_URL}/plants`);
          if (!res.ok)
            throw new Response("Failed to fetch plants", { status: 500 });
          return res.json();
        },
      },
      {
        path: "plant/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ErrorBoundary>
              <PlantDetails />
            </ErrorBoundary>
          </Suspense>
        ),
      },
    ],
  },

  /* ---------- auth ----------- */
  {
    path: "/login",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <SignUp />
      </Suspense>
    ),
  },

  /* ---------- dashboard ------ */
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Suspense fallback={<LoadingSpinner fullPage />}>
          <DashboardLayout />
        </Suspense>
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Statistics /> },

      { path: "profile", element: <Profile /> },
      { path: "my-orders", element: <MyOrders /> },

      /* seller‑only */
      {
        path: "add-plant",
        element: (
          <SellerRoute>
            <AddPlant />
          </SellerRoute>
        ),
      },
      {
        path: "my-inventory",
        element: (
          <SellerRoute>
            <MyInventory />
          </SellerRoute>
        ),
      },
      {
        path: "manage-orders",
        element: (
          <SellerRoute>
            <ManageOrders />
          </SellerRoute>
        ),
      },

      /* admin‑only */
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
    ],
  },
]);

/* The router must be rendered somewhere – typical main.jsx shown below */
