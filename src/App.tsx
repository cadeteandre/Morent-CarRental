import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import RootLayout from "./rootLayout/RootLayout";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Payment from "./pages/Payment";
import Favorites from "./pages/Favorites";
import MyBookings from "./pages/MyBookings";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { UserProvider } from "./UserContext";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="details/:id" element={<Details />} />
        <Route path="payment" element={<Payment />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="my_bookings" element={<MyBookings />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
    )
  );

  return (
    <>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </>
  );
}

export default App;
