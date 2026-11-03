"use client";

import { useAppContext } from "@/context/AppContext";
import { addressDummyData } from "@/data";
import { useEffect, useState } from "react";

export default function CartTotal() {
  const { router, currency, getCartAmount, setCartItems, user } =
    useAppContext();

  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [userAddresses, setUserAddresses] = useState([]);
  const [paymentType, setPaymentType] = useState("COD");

  const fetchUserAddresses = () => {
    setUserAddresses(addressDummyData);

    if (addressDummyData.length > 0) {
      setSelectedAddress(addressDummyData[0]);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserAddresses();
    }
  }, [user]);

  return (
    <>
      <div className="w-full lg:w-[350px] bg-white border border-slate-500 rounded-3xl p-6 md:p-8 space-y-6 flex-shrink-0 text-slate-300 ">
        <h2 className="text-xl md:text-xl font-medium text-slate-500 tracking-tight">
          Order Summary
        </h2>
        <div className="h-px bg-slate-500" />

        <div className="space-y-4 mb-6">
          {/* Delivery Address Selector Card */}
          <div className="space-y-1">
            <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
              Delivery Address
            </p>
            <div className="relative flex justify-between text-slate-500 items-start pt-1 gap-2">
              {selectedAddress ? (
                <p className="text-slate-300 text-sm font-medium leading-relaxed">
                  {selectedAddress.streetAddress}, {selectedAddress.city},{" "}
                  {selectedAddress.state}, {selectedAddress.country}
                </p>
              ) : (
                <p className="text-gray-500 text-sm font-mediun">
                  {" "}
                  No address found
                </p>
              )}

              <button
                onClick={() => setShowAddress(!showAddress)}
                className="text-cyan-400 text-xs hover:underline ml-1 cursor-pointer flex-shrink-0"
              >
                Change
              </button>

              {/* Dropdown Option Drawer Panel Overlay */}
              {showAddress && (
                <div className="absolute top-full left-0 mt-2 py-1 bg-slate-600 border-slate-500 rounded-xl overflow-hidden shadow-2xl z-30 text-sm w-full">
                  {userAddresses.map((address, index) => (
                    <p
                      key={index}
                      onClick={() => {
                        setSelectedAddress(address);
                        setShowAddress(false);
                      }}
                      className="text-slate-300 text-xs font-medium p-3 hover:bg-slate-800 transition cursor-pointer border-slate-600 last:border-0"
                    >
                      📍 {address.streetAddress}, {address.city},{" "}
                      {address.state}, {address.country}
                    </p>
                  ))}

                  <p
                    onClick={() => {
                      router.push("/add-address");
                      setShowAddress(false);
                    }}
                    className="text-cyan-400 font-bold text-center cursor-pointer p-3 border-t border-slate-800  hover:bg-cyan-400/5 transition text-xs hover:text-gray"
                  >
                    Add address
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Promo Codes Input Block */}
          <div className="space-y-1.5">
            <p className="text-sm font-medium uppercase tracking-tight text-slate-500 mt-3">
              Promo code
            </p>
            <input
              type="text"
              placeholder="Enter Promo Code..."
              className="w-full bg-slate-400 text-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-600"
            />
          </div>

          <p className="text-sm font-medium uppercase tracking-tight text-slate-500 mt-3">
            Payment Method
          </p>

          <select
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
            className="w-full bg-slate-400 border border-slate-300 tex-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-cyan-500 transition-color"
          >
            <option value="COD">Cash on Delivery</option>
            <option value="Stripe">Online Payment</option>
          </select>
        </div>

        <div className=" h-px bg-slate-500" />

        {/* Pricing Spreadsheet Cost Breakdown Rows */}
        <div className="text-sm text-slate-500 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span className="font-semibold text-slate-400">
              {currency}
              {getCartAmount()}
            </span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="font-bold text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span className="font-semibold text-slate-400">
              {currency}
              {(getCartAmount() * 0.02).toFixed(2)}
            </span>
          </p>
          <div className="h-px bg-slate-500 my-1" />
          <p className="flex justify-between text-lg font-extrabold text-slate-400 pt-1">
            <span>Total Amount:</span>
            <span className="text-lg text-cyan-400">
              {currency}
              {(getCartAmount() + getCartAmount() * 0.02).toFixed(2)}
            </span>
          </p>
        </div>

        {/* Checkout Submit Form Trigger Button */}
        <button className="w-full bg-brand-gradient hover:scale-[1.01] hover:brightness-110 text-slate-950 py-3.5 rounded-xl font-bold shadow-lg transition-all duration-300 transform cursor-pointer text-sm tracking-wide uppercase mt-6">
          Place Order
        </button>
      </div>
    </>
  );
}
