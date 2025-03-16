import "./CartProductsSummary.css";

import React from "react";
import { useUserData } from "../../../../contexts/UserDataProvider.js";

export const CartProductsSummary = () => {
  const { userDataState } = useUserData();
  return (
    <div className="product-details-container">
      <h3 className="product-section-title">Items in Your Cart</h3>
      <div className="ordered-products-container">
        {userDataState.cartProducts?.map(
          ({ id, img, name, qty, discounted_price }) => (
            <div key={id} className="ordered-product-card">
              <div className="product-image">
                <img src={img} alt={name} />
              </div>
              <div className="product-info">
                <div className="product-name">{name}</div>
                <div className="product-quantity">Quantity: {qty}</div>
              </div>
              <div className="product-price">${discounted_price}</div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
