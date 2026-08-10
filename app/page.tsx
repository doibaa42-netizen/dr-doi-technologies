"use client";

import { FormEvent, useEffect, useState } from "react";

const services = {
Troubleshooting: [
"Electrical Fault Diagnosis",
"Appliance Troubleshooting",
"Wiring Fault Troubleshooting",
"Power Supply Troubleshooting",
],

"Electrical Services": [
"House Wiring",
"Electrical Installation",
"Socket & Switch Installation",
"Lighting Installation",
"DB & Distribution Board Work",
"MCB & Breaker Replacement",
"Electrical Maintenance",
],

"Solar Solutions": [
"Solar System Installation",
"Solar System Design",
"Inverter Installation",
"Battery Installation",
"Solar Maintenance",
"Solar Fault Diagnosis",
"Solar Water Heater Service",
],

Electronics: [
"Electronic Equipment Troubleshooting",
"Power Supply Repair",
"Circuit Diagnosis",
"Component Replacement",
"Audio Equipment Repair",
"Electronic Maintenance",
"TV Troubleshooting",
],

"ICT & Networking": [
"Wi-Fi Installation",
"Ethernet Network Installation",
"Router Configuration",
"LAN Installation",
"Network Troubleshooting",
"Network Maintenance",
"Computer Troubleshooting",
],

"Solar Water Heaters": [
"Solar Water Heater Installation",
"System Inspection",
"Leak Troubleshooting",
"Controller Installation",
"Heating Element Replacement",
"Maintenance",
],

"Air Conditioning": [
"AC Installation",
"AC Servicing",
"AC Cleaning",
"AC Troubleshooting",
"Electrical Fault Diagnosis",
"AC Maintenance",
],

Refrigeration: [
"Refrigerator Repair",
"Freezer Repair",
"Cooling Fault Diagnosis",
"Electrical Troubleshooting",
"Thermostat Replacement",
"Refrigeration Maintenance",
],

"CCTV & Security": [
"CCTV Camera Installation",
"DVR/NVR Configuration",
"Remote CCTV Viewing",
"Camera Troubleshooting",
"Security System Maintenance",
],

"Computers & IT": [
"Computer Troubleshooting",
"Windows Installation",
"Software Installation",
"Computer Maintenance",
"Hardware Diagnosis",
"IT Support",
],

Printers: [
"Printer Installation",
"Printer Troubleshooting",
"Network Printer Setup",
"Driver Installation",
"Printer Maintenance",
],

Plumbing: [
"Pipe Installation",
"Leak Repair",
"Tap Installation",
"Water System Troubleshooting",
"Drainage Troubleshooting",
"Plumbing Maintenance",
],

"Welding & Fabrication": [
"Metal Welding",
"Gate Fabrication",
"Door Fabrication",
"Metal Repairs",
"Frame Fabrication",
"General Fabrication",
],

"General Troubleshooting": [
"Electrical Fault Diagnosis",
"Electronic Fault Diagnosis",
"Appliance Troubleshooting",
"Dispenser Troubleshooting",
"Power-Related Faults",
"Equipment Inspection",
],
};

type ServiceCategory = keyof typeof services;

type Package = {
name: string;
price: number;
description: string;
};

const packages: Package[] = [
{
name: "Basic",
price: 1500,
description:
"Basic inspection, diagnosis and initial service.",
},
{
name: "Standard",
price: 3500,
description:
"Professional service, repair or installation.",
},
{
name: "Premium",
price: 7500,
description:
"Complete professional service with priority support.",
},
];

type Props = {
initialService?: string;
initialSpecificService?: string;
onClose?: () => void;
};

export default function BookingForm({
initialService = "",
initialSpecificService = "",
onClose,
}: Props) {
const [name, setName] = useState("");
const [phone, setPhone] = useState("");
const [location, setLocation] = useState("");

const [service, setService] =
useState(initialService);

const [specificService, setSpecificService] =
useState(initialSpecificService);

const [selectedPackage, setSelectedPackage] =
useState("");

const [description, setDescription] =
useState("");

const [loading, setLoading] =
useState(false);

const [error, setError] =
useState("");

const [success, setSuccess] =
useState(false);

const [reference, setReference] =
useState("");

/*

* Keep the form synchronized with the
* service selected from the homepage.
  */
  useEffect(() => {
  setService(initialService);
  }, [initialService]);

useEffect(() => {
setSpecificService(initialSpecificService);
}, [initialSpecificService]);

const selectedServices =
service &&
service in services
? services[
service as ServiceCategory
]
: [];

const selectedPackageData =
packages.find(
(item) =>
item.name === selectedPackage
);

async function submitBooking(
event: FormEvent<HTMLFormElement>
) {
event.preventDefault();

setError("");

if (!name.trim()) {
  setError("Please enter your name.");
  return;
}

if (!phone.trim()) {
  setError(
    "Please enter your phone number."
  );
  return;
}

if (!location.trim()) {
  setError(
    "Please enter your location."
  );
  return;
}

if (!service) {
  setError(
    "Please select a service category."
  );
  return;
}

if (!specificService) {
  setError(
    "Please select a specific service."
  );
  return;
}

if (!selectedPackage) {
  setError(
    "Please select a service package."
  );
  return;
}

setLoading(true);

try {
  const response = await fetch(
    "/api/bookings",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        location,
        service,
        requestedService:
          specificService,
        package:
          selectedPackage,
        amount:
          selectedPackageData?.price,
        description,
      }),
    }
  );

  const data =
    await response.json();

  if (
    !response.ok ||
    !data.success
  ) {
    throw new Error(
      data.message ||
        "Booking submission failed."
    );
  }

  setReference(
    data.booking
      ?.bookingReference ||
      "BOOKING RECEIVED"
  );

  setSuccess(true);
} catch (err) {
  setError(
    err instanceof Error
      ? err.message
      : "Unable to submit booking."
  );
} finally {
  setLoading(false);
}

}

if (success) {
return (
<div className="booking-success">

    <div className="success-icon">
      ✓
    </div>

    <span className="modal-label">
      BOOKING RECEIVED
    </span>

    <h2>
      Thank You, {name}!
    </h2>

    <p>
      Your service request has
      successfully been received.
    </p>

    <div className="booking-reference">

      <small>
        BOOKING REFERENCE
      </small>

      <strong>
        {reference}
      </strong>

    </div>

    <div className="booking-summary">

      <p>
        <strong>
          Category:
        </strong>{" "}
        {service}
      </p>

      <p>
        <strong>
          Service:
        </strong>{" "}
        {specificService}
      </p>

      <p>
        <strong>
          Package:
        </strong>{" "}
        {selectedPackage}
      </p>

      <p>
        <strong>
          Estimated Fee:
        </strong>{" "}
        KSh{" "}
        {selectedPackageData?.price.toLocaleString()}
      </p>

    </div>

    <a
      href={`https://wa.me/254114280995?text=${encodeURIComponent(
        `Hello Dr Doi Technologies. I have submitted booking ${reference}. Category: ${service}. Service: ${specificService}. Package: ${selectedPackage}. Estimated fee: KSh ${selectedPackageData?.price}.`
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
    >
      📱 Continue on WhatsApp
    </a>

    <button
      type="button"
      className="close-booking-button"
      onClick={onClose}
    >
      Close
    </button>

  </div>
);

}

return (
<form
className="booking-form"
onSubmit={submitBooking}
>

  <div className="booking-header">

    <span className="modal-label">
      DR DOI TECHNOLOGIES
    </span>

    <h2>
      Book a Service
    </h2>

    <p>
      Complete the form below to
      request professional service.
    </p>

  </div>

  {error && (
    <div className="booking-error">
      {error}
    </div>
  )}

  {/* CUSTOMER DETAILS */}

  <div className="form-grid">

    <div className="form-group">

      <label>
        Full Name *
      </label>

      <input
        type="text"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        placeholder="Enter your full name"
        required
      />

    </div>

    <div className="form-group">

      <label>
        Phone Number *
      </label>

      <input
        type="tel"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value)
        }
        placeholder="0712345678"
        required
      />

    </div>

  </div>

  <div className="form-group">

    <label>
      Location *
    </label>

    <input
      type="text"
      value={location}
      onChange={(e) =>
        setLocation(e.target.value)
      }
      placeholder="e.g. Nakuru, Lanet"
      required
    />

  </div>

  {/* CATEGORY */}

  <div className="form-group">

    <label>
      Service Category *
    </label>

    <select
      value={service}
      onChange={(e) => {
        setService(e.target.value);
        setSpecificService("");
      }}
      required
    >

      <option value="">
        Select a service category
      </option>

      {Object.keys(services).map(
        (category) => (

          <option
            key={category}
            value={category}
          >
            {category}
          </option>

        )
      )}

    </select>

  </div>

  {/* SPECIFIC SERVICE */}

  <div className="form-group">

    <label>
      Specific Service *
    </label>

    <select
      value={specificService}
      onChange={(e) =>
        setSpecificService(
          e.target.value
        )
      }
      disabled={!service}
      required
    >

      <option value="">
        {service
          ? "Select a specific service"
          : "Select a category first"}
      </option>

      {selectedServices.map(
        (item) => (

          <option
            key={item}
            value={item}
          >
            {item}
          </option>

        )
      )}

    </select>

  </div>

  {/* PACKAGES */}

  <div className="form-group">

    <label>
      Choose Service Package *
    </label>

    <div className="package-grid">

      {packages.map(
        (item) => (

          <button
            key={item.name}
            type="button"
            className={`package-card ${
              selectedPackage ===
              item.name
                ? "package-selected"
                : ""
            }`}
            onClick={() =>
              setSelectedPackage(
                item.name
              )
            }
          >

            <span className="package-name">
              {item.name}
            </span>

            <strong className="package-price">
              KSh{" "}
              {item.price.toLocaleString()}
            </strong>

            <span className="package-description">
              {item.description}
            </span>

            {selectedPackage ===
              item.name && (

              <span className="package-check">
                ✓ Selected
              </span>

            )}

          </button>

        )
      )}

    </div>

  </div>

  {/* SELECTED PACKAGE */}

  {selectedPackageData && (

    <div className="selected-package">

      <span>
        Selected Package
      </span>

      <strong>
        {selectedPackageData.name}
        {" — "}
        KSh{" "}
        {selectedPackageData.price.toLocaleString()}
      </strong>

    </div>

  )}

  {/* DESCRIPTION */}

  <div className="form-group">

    <label>
      Describe the Problem
    </label>

    <textarea
      value={description}
      onChange={(e) =>
        setDescription(
          e.target.value
        )
      }
      placeholder="Describe what you need..."
      rows={5}
      maxLength={1000}
    />

    <small>
      {description.length}/1000
    </small>

  </div>

  <div className="booking-notice">
    🔒 Your information is used only
    to process your booking.
  </div>

  <button
    type="submit"
    className="submit-booking"
    disabled={loading}
  >

    {loading
      ? "Submitting..."
      : "Submit Booking →"}

  </button>

</form>

);
}
