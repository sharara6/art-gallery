import "./AddressModal.css";
import React from "react";

import { useState } from "react";
import { addAddressService } from "../../../../services/address-services/addAddressService";
import { useUserData } from "../../../../contexts/UserDataProvider.js";
import { updateAddressService } from "../../../../services/address-services/updateAddressService";
import { toast } from "react-hot-toast";
import { useAddress } from "../../../../contexts/AddressProvider.js";
import { useAuth } from "../../../../contexts/AuthProvider.js";

export const AddressModal = () => {
  const [, setLoading] = useState(false);
  const [, setError] = useState("false");
  const { auth } = useAuth();
  const { dispatch } = useUserData();

  const dummyAddress = {
    name: "Aniket Saini",
    street: "66/6B Main Post Office",
    city: "Roorkee",
    state: "Uttarakhand",
    country: "India",
    pincode: "247667",
    phone: "963-906-0737",
  };

  const {
    setIsAddressModalOpen,
    addressForm,
    setAddressForm,
    isEdit,
    setIsEdit,
  } = useAddress();

  const updateAddress = async (address) => {
    try {
      setLoading(true);
      setError("");
      const response = await updateAddressService(address, auth.token);
      if (response.status === 200) {
        console.log("edit address", response);
        setLoading(false);
        toast.success(` ${address.name}'s address updated successfully!`);
        dispatch({ type: "SET_ADDRESS", payload: response.data.addressList });
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addAddress = async (address) => {
    try {
      setLoading(true);
      setError("");
      const response = await addAddressService(address, auth.token);
      if (response.status === 201) {
        setLoading(false);
        toast.success("New address added successfully!");
        dispatch({ type: "SET_ADDRESS", payload: response.data.addressList });
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="address-modal-container">
      <div className="address-modal-content">
        <h2 className="modal-title">{isEdit ? "Edit Address" : "Add New Address"}</h2>
        <form
          onSubmit={(e) => {
            if (!isEdit) {
              e.preventDefault();
              addAddress(addressForm);
              setAddressForm({
                name: "",
                street: "",
                city: "",
                state: "",
                country: "",
                pincode: "",
                phone: "",
              });
              setIsAddressModalOpen(false);
            } else {
              e.preventDefault();
              updateAddress(addressForm);
              setAddressForm({
                name: "",
                street: "",
                city: "",
                state: "",
                country: "",
                pincode: "",
                phone: "",
              });
              setIsAddressModalOpen(false);
              setIsEdit(false);
            }
          }}
          className="address-form"
        >
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              value={addressForm.name}
              required
              onChange={(e) =>
                setAddressForm({ ...addressForm, name: e.target.value })
              }
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="street">Street Address</label>
            <input
              id="street"
              required
              value={addressForm.street}
              onChange={(e) =>
                setAddressForm({ ...addressForm, street: e.target.value })
              }
              placeholder="Enter street address"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                required
                value={addressForm.city}
                onChange={(e) =>
                  setAddressForm({ ...addressForm, city: e.target.value })
                }
                placeholder="Enter city"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                id="state"
                name="state"
                required
                value={addressForm.state}
                onChange={(e) =>
                  setAddressForm({ ...addressForm, state: e.target.value })
                }
                placeholder="Enter state"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                id="country"
                name="country"
                value={addressForm.country}
                required
                onChange={(e) =>
                  setAddressForm({ ...addressForm, country: e.target.value })
                }
                placeholder="Enter country"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="pincode">Postal Code</label>
              <input
                id="pincode"
                name="pincode"
                value={addressForm.pincode}
                required
                onChange={(e) =>
                  setAddressForm({ ...addressForm, pincode: e.target.value })
                }
                placeholder="Enter postal code"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              value={addressForm.phone}
              required
              onChange={(e) =>
                setAddressForm({ ...addressForm, phone: e.target.value })
              }
              placeholder="Enter phone number"
              minLength="8"
            />
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={() => setIsAddressModalOpen(false)}>
              Cancel
            </button>
            <button type="button" className="dummy-btn" onClick={() => setAddressForm({ ...dummyAddress })}>
              Fill with Sample Data
            </button>
            <button type="submit" className="save-btn">
              {isEdit ? "Update Address" : "Save Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
