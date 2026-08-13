"use client";

import { FormEvent, useEffect, useState } from "react";

const services = {
  "Electrical Services": [
    "House Wiring",
    "Electrical Installation",
    "Troubleshooting",
    "Socket and Switch Installation",
    "Lighting Installation",
    "DB and Distribution Board Work",
    "MCB and Breaker Replacement",
    "Electrical Maintenance",
  ],

  "Solar Solutions": [
    "Solar System Installation",
    "Solar System Design",
    "Inverter Installation",
    "Battery Installation",
    "Solar Fault Diagnosis",
    "Solar Maintenance",
    "Solar Lighting",
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

  Electronics: [
    "Electronic Equipment Troubleshooting",
    "Power Supply Repair",
    "Circuit Diagnosis",
    "Component Replacement",
    "Audio Equipment Repair",
    "Electronic Maintenance",
  ],

  "Networking & Wi-Fi": [
    "Wi-Fi Installation",
    "Router Configuration",
    "LAN Installation",
    "Ethernet Cabling",
    "Network Troubleshooting",
    "Network Maintenance",
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
} as const;

type ServiceCategory = keyof typeof services;

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

  const [service, setService] = useState(initialService);

  const [specificService, setSpecificService] = useState(
    initialSpecificService
  );

  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [success, setSuccess] = useState(false);
  const [reference, setReference] = useState("");

  /*
   * PRIMARY WHATSAPP NUMBER
   * 0740568226 = 254740568226 internationally
   *
   * SECONDARY CONTACT
   * 0114280995
   */
  const whatsappNumber = "254740568226";
  const secondaryNumber = "0114280995";

  useEffect(() => {
    setService(initialService);
    setSpecificService(initialSpecificService);
  }, [initialService, initialSpecificService]);

  const selectedServices =
    service && service in services
      ? services[service as ServiceCategory]
      : [];

  async function submitBooking(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      /*
       * IMPORTANT:
       * Booking does NOT require payment or amount.
       * The booking is submitted first.
       */
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
        data.booking?.bookingReference || "BOOKING RECEIVED"
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

  /*
   * BOOKING SUCCESS SCREEN
   */
  if (success) {
    const whatsappMessage = encodeURIComponent(
      `Hello Dr Doi Technologies.

I have submitted a service booking.

Booking Reference: ${reference}
Name: ${name}
Phone: ${phone}
Location: ${location}
Service: ${service}
Specific Service: ${specificService}

Description:
${description || "No additional description provided."}

Please confirm my booking and advise me on the next step.`
    );

    const whatsappLink =
      `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

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
          Your service request has been successfully received.
        </p>

        <div className="booking-reference">
          <small>
            BOOKING REFERENCE
          </small>

          <strong>
            {reference}
          </strong>
        </div>

        {/* WHATSAPP BUTTON */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-button"
        >
          📱 Continue on WhatsApp
        </a>

        <p className="booking-contact">
          WhatsApp: <strong>0740 568 226</strong>
          <br />
          Alternative: <strong>0114 280 995</strong>
        </p>

        {onClose && (
          <button
            type="button"
            className="close-booking-button"
            onClick={onClose}
          >
            Close
          </button>
        )}
      </div>
    );
  }

  /*
   * BOOKING FORM
   */
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
            onChange={(event) =>
              setName(event.target.value)
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
            onChange={(event) =>
              setPhone(event.target.value)
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
          onChange={(event) =>
            setLocation(event.target.value)
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
          onChange={(event) => {
            setService(event.target.value);
            setSpecificService("");
          }}
          required
        >
          <option value="">
            Select a service category
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
          onChange={(event) =>
            setSpecificService(
              event.target.value
            )
          }
          disabled={!service}
          required
        >
          <option value="">
            Select the specific service
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
          onChange={(event) =>
            setDescription(
              event.target.value
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

      {/* NO PAYMENT/AMOUNT REQUIRED HERE */}
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

      <p className="booking-payment-note">
        💳 Payment details and service charges
        can be discussed after your booking
        has been received.
      </p>
    </form>
  );
    }
