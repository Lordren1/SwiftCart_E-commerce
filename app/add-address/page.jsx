"use client";

import { useAppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import CartTotal from "../components/cart/CartTotal";
import Title from "../components/title/Title";

export default function AddAddress() {
  const { router, user } = useAppContext();
  const [address, setAddress] = useState({
    completeName: "",
    phone: "",
    zipcode: "",
    city: "",
    state: "",
    country: "",
    streetAddress: "",
  });

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (user === undefined) return;

    if (!user) {
      toast.error("Login required");
      router.replace("/cart");
    }
  }, [user]);

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 min-h-screen text-slate-300">
        {/* Container */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Left side - Form */}
          <form
            onSubmit
            action=""
            className="flex-1 w-full bg-white border border-slate-500 rounded-3xl p-6 md:p-8 flex flex-col gap-4"
          >
            <Title
              title1="Delivery"
              title2="Information"
              para="Provide your canonical physical address details to receive logistics track items securely."
            />

            <div className="flex flex-col gap-3.5 mt-2">
              <input
                onChange={onChangeHandle}
                value={address.completeName}
                type="text"
                name="completeName"
                placeholder="Full Name"
                className="w-full bg-white border border-slate-600 rounded-xl px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-600"
                required
              />

              <input
                onChange={onChangeHandle}
                value={address.phone}
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="w-full bg-white border border-slate-600 rounded-xl px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-600"
                required
              />

              <div className="flex gap-4 w-full ">
                <input
                  onChange={onChangeHandle}
                  value={address.zipcode}
                  type="text"
                  name="zipcode"
                  placeholder="Zipcode"
                  className="w-1/2 bg-white border border-slate-600 rounded-xl px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-600"
                  required
                />
                <input
                  onChange={onChangeHandle}
                  value={address.city}
                  type="text"
                  name="city"
                  placeholder="City"
                  className="w-1/2 bg-white border border-slate-600 rounded-xl px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-600"
                  required
                />
              </div>

              <div className="flex gap-4 w-full ">
                <input
                  onChange={onChangeHandle}
                  value={address.state}
                  type="text"
                  name="state"
                  placeholder="State"
                  className="w-1/2 bg-white border border-slate-600 rounded-xl px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-600"
                  required
                />
                <input
                  onChange={onChangeHandle}
                  value={address.country}
                  type="text"
                  name="country"
                  placeholder="Country"
                  className="w-1/2 bg-white border border-slate-600 rounded-xl px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-600"
                  required
                />
              </div>

              <textarea
                onChange={onChangeHandle}
                value={address.streetAddress}
                type="text"
                name="streetAddress"
                placeholder="Street Address"
                rows={3}
                className="w-full bg-white border border-slate-600 rounded-xl px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-600"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-1/2 bg-brand-gradient hover:scale-[1.01] hover:brightness-110 text-slate-950 py-3 rounded-xl font-bold shadow-lg transition-all duration-300 transform cursor-pointer text-sm tracking-wide uppercase mt-4"
            >
              Add Address
            </button>
          </form>
          {/* Right side - Cart total */}
          <CartTotal />
        </div>
      </div>
    </>
  );
}
