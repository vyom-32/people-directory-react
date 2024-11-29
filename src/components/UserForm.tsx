import React, { useState } from "react";
import { api } from "../services/axios";
import { AxiosError } from "axios";

interface Mobile {
  mobile: string;
  mobileType: string;
}

interface Email {
  email: string;
  emailType: string;
}

interface Address {
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  addressType: string;
}

const UserForm = () => {
  const [mobiles, setMobiles] = useState<Mobile[]>([
    { mobile: "", mobileType: "Primary" },
  ]);
  const [emails, setEmails] = useState<Email[]>([
    { email: "", emailType: "Primary" },
  ]);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState<AxiosError>();

  const [dob, setDob] = useState<string>();

  const [gender, setGender] = useState("Male");

  const [addresses, setAddresses] = useState<Address[]>([
    {
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      addressType: "Home",
    },
  ]);

  const handleAddMobile = () => {
    setMobiles([...mobiles, { mobile: "", mobileType: "Secondary" }]);
  };

  const handleRemoveMobile = (index: number) => {
    setMobiles(mobiles.filter((_, i) => i !== index));
  };

  const handleMobileChange = (
    index: number,
    field: keyof Mobile,
    value: string
  ) => {
    const updatedMobiles = [...mobiles];
    updatedMobiles[index][field] = value;
    setMobiles(updatedMobiles);
  };

  const handleAddEmail = () => {
    setEmails([...emails, { email: "", emailType: "Secondary" }]);
  };

  const handleRemoveEmail = (index: number) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  const handleEmailChange = (
    index: number,
    field: keyof Email,
    value: string
  ) => {
    const updatedEmails = [...emails];
    updatedEmails[index][field] = value;
    setEmails(updatedEmails);
  };

  const handleAddAddress = () => {
    setAddresses([
      ...addresses,
      {
        address: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        addressType: "",
      },
    ]);
  };

  const handleRemoveAddress = (index: number) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  const handleAddressChange = (
    index: number,
    field: keyof Address,
    value: string
  ) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index][field] = value;
    setAddresses(updatedAddresses);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = {
      mobiles,
      emails,
      addresses,
      firstName,
      middleName,
      lastName,
      dob,
      gender,
    };
    await api.post("/create-person", formData).catch((error) => {
      setError(error);
    });
    console.log(formData);
  };

  return (
    <div className="w-full md:w-[1000px] mx-auto">
      <h2 className="text-center font-bold text-2xl py-3">Add new Person</h2>
      <form onSubmit={handleSubmit} className="text-left">
        <div className="flex flex-wrap gap-2 pb-1">
          <input
            value={firstName}
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            name="firstName"
            placeholder="First Name"
            required
          />
          <input
            value={middleName}
            type="text"
            onChange={(e) => setMiddleName(e.target.value)}
            name="middleName"
            placeholder="middle Name"
          />
          <input
            value={lastName}
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            name="lastName"
            placeholder="Last Name"
          />
        </div>
        <p className="text-left pb-3">
          {firstName} {middleName} {lastName}
        </p>
        <div className="mb-2">
          <label>
            Date of Birth:
            <input
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="ml-2"
              type="date"
              name="dob"
              required
            />
          </label>
        </div>
        <div className="mb-2">
          <label>
            Gender:
            <select
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="ml-2"
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
        </div>
        <div className="flex items-center mb-3 mt-5">
          <h3 className="text-lg pa-0 font-bold ">Mobile Numbers</h3>
          <button
            type="button"
            className="text-slate-900 ml-4"
            onClick={handleAddMobile}
          >
            Add Mobile
          </button>
        </div>
        {mobiles.map((mobile, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              placeholder="Mobile Number"
              value={mobile.mobile}
              onChange={(e) =>
                handleMobileChange(index, "mobile", e.target.value)
              }
              required
            />
            <input
              className="ml-2"
              value={mobile.mobileType}
              placeholder="Mobile Type"
              onChange={(e) =>
                handleMobileChange(index, "mobileType", e.target.value)
              }
            ></input>
            {index > 0 && (
              <button
                type="button"
                className="ml-2 bg-red-400 py-1 px-2  rounded"
                onClick={() => handleRemoveMobile(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <div className="flex items-center mb-3 mt-5">
          <h3 className="text-lg pa-0 font-bold ">Emails</h3>
          <button
            type="button"
            className="text-slate-900 ml-4"
            onClick={handleAddEmail}
          >
            Add Email
          </button>
        </div>
        {emails.map((email, index) => (
          <div key={index} className="mb-2">
            <input
              type="email"
              placeholder="Email"
              value={email.email}
              onChange={(e) =>
                handleEmailChange(index, "email", e.target.value)
              }
              required
            />
            <input
              value={email.emailType}
              placeholder="Email type"
              className="ml-2"
              required
              onChange={(e) =>
                handleEmailChange(index, "emailType", e.target.value)
              }
            ></input>
            {index > 0 && (
              <button
                type="button"
                className="ml-2 bg-red-400 py-1 px-2  rounded"
                onClick={() => handleRemoveEmail(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <div className="flex items-center mb-3 mt-5">
          <h3 className="text-lg pa-0 font-bold ">Addresses</h3>
          <button
            type="button"
            className="text-slate-900 ml-4"
            onClick={handleAddAddress}
          >
            Add Address
          </button>
        </div>
        {addresses.map((address, index) => (
          <div key={index} className="flex gap-2 mb-5 flex-wrap">
            <input
              type="text"
              placeholder="Address Type"
              required
              value={address.addressType}
              onChange={(e) =>
                handleAddressChange(index, "addressType", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Address (Appartment, Street, etc.)"
              className="w-2/3"
              value={address.address}
              onChange={(e) =>
                handleAddressChange(index, "address", e.target.value)
              }
              required
            />
            <input
              type="text"
              placeholder="City"
              value={address.city}
              required
              onChange={(e) =>
                handleAddressChange(index, "city", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="State"
              required
              value={address.state}
              onChange={(e) =>
                handleAddressChange(index, "state", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Country"
              value={address.country}
              required
              onChange={(e) =>
                handleAddressChange(index, "country", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Pincode"
              value={address.pincode}
              required
              onChange={(e) =>
                handleAddressChange(index, "pincode", e.target.value)
              }
            />
            {index > 0 && (
              <button
                type="button"
                className="ml-2 bg-red-400 py-1 px-2  rounded"
                onClick={() => handleRemoveAddress(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <div className="flex justify-center mt-3 mb-7">
          <button
            type="submit"
            className="bg-green-600 text-white rounded py-2 px-6"
          >
            Submit
          </button>
        </div>
        {error && error.message && (
          <p className="text-red-600">{error.message}</p>
        )}
      </form>
    </div>
  );
};

export default UserForm;
