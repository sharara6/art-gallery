import "./OrderSummary.css";
import React from "react";
import { CartProductsSummary } from "../CartProductsSummary/CartProductsSummary";
import { BillingSummary } from "../BillingSummary/BillingSummary";
import { DeliveryAddress } from "../DeliveryAddress/DeliveryAddress";
import { useUserData } from "../../../../contexts/UserDataProvider.js";

export const OrderSummary = () => {
  const { userDataState } = useUserData();
  return (
    <div className="order-details-container">
      <h2 className="summary-title">Order Summary</h2>
      <div className="summary-content">
        <CartProductsSummary />
        <BillingSummary />
        {userDataState.orderDetails.orderAddress ? (
          <DeliveryAddress />
        ) : (
          <div className="no-address">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p>Please provide or select an address to proceed</p>
          </div>
        )}
      </div>
    </div>
  );
};
