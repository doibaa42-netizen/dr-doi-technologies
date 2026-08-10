"use client";

import { FormEvent, useState } from "react";

const services = {
  "Electrical Services": [
    "House wiring",
    "Electrical installation",
    "Troubleshooting",
    "Socket and switch installation",
    "Lighting installation",
    "DB and distribution board work",
    "MCB and breaker replacement",
    "Electrical maintenance",
  ],

  "Solar Energy": [
    "Solar panel installation",
    "Solar system design",
    "Inverter installation",
    "Battery installation",
    "Solar troubleshooting",
    "Solar maintenance",
    "Solar lighting",
  ],

  "Solar Water Heaters": [
    "Solar water heater installation",
    "System inspection",
    "Leak troubleshooting",
    "Controller installation",
    "Heating element replacement",
    "Maintenance",
  ],

  "Air Conditioning": [
    "AC installation",
    "AC servicing",
    "AC cleaning",
    "AC troubleshooting",
    "Electrical fault diagnosis",
    "AC maintenance",
  ],

  Refrigeration: [
    "Refrigerator repair",
    "Freezer repair",
    "Cooling fault diagnosis",
    "Electrical troubleshooting",
    "Thermostat replacement",
    "Refrigeration maintenance",
  ],

  Electronics: [
    "Electronic equipment troubleshooting",
    "Power supply repair",
    "Circuit diagnosis",
    "Component replacement",
    "Audio equipment repair",
    "Electronic maintenance",
  ],

  "Networking & Wi-Fi": [
    "Wi-Fi installation",
    "Router configuration",
    "LAN installation",
    "Ethernet cabling",
    "Network troubleshooting",
    "Network maintenance",
  ],

  "CCTV & Security": [
    "CCTV camera installation",
    "DVR/NVR configuration",
    "Remote CCTV viewing",
    "Camera troubleshooting",
    "Security system maintenance",
  ],

  "Computers & IT": [
    "Computer troubleshooting",
    "Windows installation",
    "Software installation",
    "Computer maintenance",
    "Hardware diagnosis",
    "IT support",
  ],

  Printers: [
    "Printer installation",
    "Printer troubleshooting",
    "Network printer setup",
    "Driver installation",
    "Printer maintenance",
  ],

  Plumbing: [
    "Pipe installation",
    "Leak repair",
    "Tap installation",
    "Water system troubleshooting",
    "Drainage troubleshooting",
    "Plumbing maintenance",
  ],

  "Welding & Fabrication": [
    "Metal welding",
    "Gate fabrication",
    "Door fabrication",
    "Metal repairs",
    "Frame fabrication",
    "General fabrication",
  ],

  "General Troubleshooting": [
    "Electrical fault diagnosis",
    "Electronic fault diagnosis",
    "Appliance troubleshooting",
    "Dispenser troubleshooting",
    "Power-related faults",
    "Equipment inspection",
  ],
};

type ServiceName = keyof typeof services;

type Props = {
  initialService?: string;
  onClose?: () => void;
};

export default function BookingForm({
  initialService = "",
  onClose,
}: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [service, setService] = useState(initialService);
  const [specificService, setSpecificService] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [reference, setReference] = useState("");

  const selectedServices =
    service && service in services
      ? services[service as ServiceName]
      : [];

  async function submitBooking(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          location,
          service,
          requestedService: specificService,
          description,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Booking submission failed."
        );
      }

      setReference(
        data.booking?.bookingReference ||
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
          Your service request has been
          successfully received.
        </p>

        <div className="booking-reference">
          <small>
            BOOKING REFERENCE
          </small>

          <strong>
            {reference}
          </strong>
        </div>

        <a
          href={`https://wa.me/254114280995?text=${encodeURIComponent(
            `Hello Dr Doi Technologies. I have submitted booking ${reference} for ${service} - ${specificService}.`
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
          Tell us what service you need.
        </p>

      </div>

      {error && (
        <div className="booking-error">
          {error}
        </div>
      )}

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
            Select a service
          </option>

          {Object.keys(services).map(
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
            Select the service
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
