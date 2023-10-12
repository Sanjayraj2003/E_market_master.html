import Navbar from "../components/Navbar";
import UserOrder from "../components/UserOrder";

const UserOrderPage = () => {
  return (
    <div>
      <Navbar>
        <h1 className="mx-auto text-2xl">My Orders</h1>
        <UserOrder></UserOrder>
      </Navbar>
    </div>
  );
};

export default UserOrderPage;
