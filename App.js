import React, { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from "./pages/Home";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Protected from "./authentication/Protected";
import { useDispatch, useSelector } from "react-redux";
import { selectLogginUser, selectUserChecked } from "./features/auth/authSlice";
import { checkUserAsync } from "./features/auth/authSlice";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import ProductOverviewPage from "./pages/ProductOverviewPage";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import UserProfilePage from "./pages/UserProfilePage";
import Checkout from "./containers/Checkout";
import UserOrderPage from "./pages/UserOrderPage";
import PageNotFound from "./components/PageNotFound";
import OrderSuccess from "./components/OrderSuccess";
import Logout from "./containers/Logout";
import AdminProductOverviewPage from "./pages/Admin/AdminProductOverviewPage";
import ProtectedAdmin from "./authentication/ProtectedAdmin";
import AdminProductFormPage from "./pages/Admin/AdminProductFormPage";
import AdminOrderPage from "./pages/Admin/AdminOrderPage";
import AdminHome from "./pages/Admin/AdminHome";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home></Home>,
      </Protected>
    ),
  },
  {
    path: "/productOverview/:id",
    element: (
      <Protected>
        <ProductOverviewPage />
      </Protected>
    ),
  },
  {
    path: "/userProfiles",
    element: (
      <Protected>
        <UserProfilePage />,
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout />
      </Protected>
    ),
  },
  {
    path: "/userOrders",
    element: (
      <Protected>
        <UserOrderPage />
      </Protected>
    ),
  },
  {
    path: "/orderSuccess/:id",
    element: (
      <Protected>
        <OrderSuccess />
      </Protected>
    ),
  },
  //admin routes
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/productOverview/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductOverviewPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedAdmin>
        <AdminOrderPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT,
};
function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLogginUser);
  const userChecked = useSelector(selectUserChecked);
  useEffect(() => {
    dispatch(checkUserAsync());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchItemsByUserIdAsync());
    dispatch(fetchLoggedInUserAsync());
  }, [dispatch, user]);
  return (
    <div className="App">
      {userChecked && (
        <Provider template={AlertTemplate} {...options}>
          <RouterProvider router={router} />
        </Provider>
      )}
    </div>
  );
}

export default App;
