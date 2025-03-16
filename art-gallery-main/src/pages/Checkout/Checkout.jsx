import { useNavigate } from "react-router-dom";
import { useData } from "../../contexts/DataProvider.js";
import { useUserData } from "../../contexts/UserDataProvider.js";
import "./Checkout.css";
import { AddressSection } from "./components/AddressSection/AddressSection";
import { OrderSummary } from "./components/OrderSummary/OrderSummary";

export const Checkout = () => {
  const { userDataState } = useUserData();
  const navigate = useNavigate();
  const { loading } = useData();
  return (
    !loading &&
    (userDataState.cartProducts.length ? (
      <div className="checkout-page">
        <h1 className="page-heading">Complete Your Purchase</h1>
        <div className="checkout-container">
          <AddressSection />
          <OrderSummary />
        </div>
      </div>
    ) : (
      <div className="no-items-container">
        <h2 className="page-heading">Your cart is empty</h2>
        <p className="empty-cart-message">Add some art pieces to your cart to begin checkout.</p>
        <button
          className="explore-btn"
          onClick={() => navigate("/product-listing")}
        >
          Browse Art Gallery
        </button>
      </div>
    ))
  );
};
