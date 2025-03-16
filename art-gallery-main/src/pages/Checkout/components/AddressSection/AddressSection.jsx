import "./AddressSection.css";
import React from "react";

import { useAddress } from "../../../../contexts/AddressProvider.js";
import { useUserData } from "../../../../contexts/UserDataProvider.js";
import { AddressModal } from "../AddressModal/AddressModal";

export const AddressSection = () => {
  const { userDataState, dispatch } = useUserData();

  const { isAddressModalOpen, setIsAddressModalOpen } = useAddress();

  return (
    <div className="address-container">
      <h2 className="section-title">Shipping Address</h2>
      {userDataState.addressList?.length === 0 ? (
        <div className="no-address-message">
          <p>You haven't added any addresses yet.</p>
          <p>Please add a delivery address to continue.</p>
        </div>
      ) : (
        <div className="address-list">
          {userDataState.addressList?.map((address, index) => {
            const { name, street, city, state, country, pincode, phone, _id } =
              address;

            return (
              <div 
                key={_id} 
                className={`address-card ${_id === userDataState.orderDetails?.orderAddress?._id ? 'selected' : ''}`}
              >
                <div className="radio-container">
                  <input
                    checked={_id === userDataState.orderDetails?.orderAddress?._id}
                    onChange={() => {
                      dispatch({
                        type: "SET_ORDER",
                        payload: { orderAddress: address },
                      });
                    }}
                    name="address"
                    id={_id}
                    type="radio"
                  />
                </div>
                <label htmlFor={_id} className="address-details">
                  <p className="name">{name}</p>
                  <p className="address">
                    {street}, {city}, {state}, {country} {pincode}
                  </p>
                  <p className="phone">
                    <span>Phone:</span> {phone}
                  </p>
                </label>
              </div>
            );
          })}
        </div>
      )}
      <div className="add-new-address-btn-container">
        <button
          className="add-new-address-btn"
          onClick={() => setIsAddressModalOpen(true)}
        >
          <span className="icon">+</span> Add New Address
        </button>
      </div>

      {isAddressModalOpen && <AddressModal />}
    </div>
  );
};
