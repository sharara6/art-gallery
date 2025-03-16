import React from "react";
import "./BillingSummary.css";
import { useUserData } from "../../../../contexts/UserDataProvider.js";

export const BillingSummary = () => {
  const { userDataState } = useUserData();

  return (
    <div className="billing-container">
      <h3 className="billing-title">Price Details</h3>
      <div className="price-details-container">
        <div className="price-row">
          <span className="price-label">Subtotal</span>
          <span className="price-value">${userDataState.orderDetails?.cartItemsTotal}</span>
        </div>

        <div className="price-row">
          <span className="price-label">Discount</span>
          <span className="price-value discount">
            -$
            {(
              userDataState.orderDetails?.cartItemsTotal -
              userDataState.orderDetails?.cartItemsDiscountTotal
            ).toFixed(2)}
          </span>
        </div>

        <div className="price-row">
          <span className="price-label">Shipping</span>
          <span className="price-value shipping">Free</span>
        </div>
        
        <div className="price-row total">
          <span className="price-label">Total</span>
          <span className="price-value">${userDataState.orderDetails?.cartItemsDiscountTotal}</span>
        </div>
      </div>
    </div>
  );
};
