"use client";

import { FormEvent, useState } from "react";

type BookingFormProps = {
  service?: string;
  requestedService?: string;
  onClose?: () => void;
};

export default function BookingForm({
  service = "",
  requestedService = "",
  onClose,
}: BookingFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [selectedService, setSelectedService] = useState(service);
  const [selectedJob, setSelectedJob] = useState(requestedService);
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [bookingReference, setBookingReference] = useState("");

  const serviceOptions = [
    "Electrical Services",
    "Solar Energy",
    "Solar Water Heaters",
    "Air Conditioning",
    "Refrigeration",
    "Electronics",
    "Networking & Wi-Fi",
    "CCTV & Security",
    "Computers & IT",
    "Printers",
    "Plumbing",
    "Welding & Fabrication",
    "General Troubleshooting",
  ];

  const jobOptions: Record<string, string[]> = {
    "Electrical Services": [
      "House wiring",
      "Electrical installation",
      "Fault finding and troubleshooting",
      "Socket and switch installation",
      "Lighting installation",
      "DB and distribution board work",
      "MCB and breaker replacement",
      "Power fault diagnosis",
      "Electrical maintenance",
    ],

    "Solar Energy": [
      "Solar panel installation",
      "Solar system design",
      "Inverter installation",
      "Battery installation",
      "Solar troubleshooting",
      "Solar maintenance",
      "Off-grid solar system",
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
      "Internet connectivity diagnosis",
    ],

    "CCTV & Security": [
      "CCTV camera installation",
      "DVR/NVR configuration",
      "Remote CCTV viewing",
      "Camera troubleshooting",
      "Security system maintenance",
      "Network camera setup",
    ],

    "Computers & IT": [
      "Computer troubleshooting",
      "Windows installation",
      "Software installation",
      "Computer maintenance",
      "Hardware diagnosis",
      "Virus/malware troubleshooting",
      "IT support",
    ],

    Printers: [
      "Printer installation",
      "Printer troubleshooting",
      "Network printer setup",
      "Driver installation",
      "Printer maintenance",
      "Printing fault diagnosis",
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
      "Preventive maintenance",
    ],
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

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
          service: selectedService,
          requestedService: selectedJob,
          description,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to submit your booking."
        );
      }

      setBookingReference(data.booking.bookingReference);
      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to submit your booking."
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

        <h2>Thank You, {name}!</h2>

        <p>
          Your service request has been successfully received by
          Dr Doi Technologies.
        </p>

        <div className="booking-reference">
          <small>BOOKING REFERENCE</small>
          <strong>{bookingReference}</strong>
        </div>

        <p className="success-note">
          Please keep your booking reference for communication
          about your service request.
        </p>

        <div className="modal-actions">

          <a
            href={`https://wa.me/254114280995?text=${encodeURIComponent(
              `Hello Dr Doi Technologies. I have submitted booking ${bookingReference} for ${selectedService} - ${selectedJob}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-button"
          >
            📱 Continue on WhatsApp
          </a>

          <button
            type="button"
            className="payment-button"
            onClick={() => {
              alert(
                "M-Pesa payment will be connected after the booking system is confirmed."
              );
            }}
          >
            💳 Pay Deposit
          </button>

        </div>

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

  return (
    <form className="booking-form" onSubmit={handleSubmit}>

      <div className="booking-header">
        <span className="modal-label">
          DR DOI TECHNOLOGIES
        </span>

        <h2>Book a Service</h2>

        <p>
          Tell us what you need and we will get back to you.
        </p>
      </div>

      {error && (
        <div className="booking-error">
          {error}
        </div>
      )}

      <div className="form-grid">

        <div className="form-group">
          <label htmlFor="booking-name">
            Full Name *
          </label>

          <input
            id="booking-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="booking-phone">
            Phone Number *
          </label>

          <input
            id="booking-phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="0712345678"
            required
          />
        </div>

      </div>

      <div className="form-group">
        <label htmlFor="booking-location">
          Location *
        </label>

        <input
          id="booking-location"
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="e.g. Nakuru, Lanet"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="booking-service">
          Service Category *
        </label>

        <select
          id="booking-service"
          value={selectedService}
          onChange={(event) => {
            setSelectedService(event.target.value);
            setSelectedJob("");
          }}
          required
        >
          <option value="">
            Select a service
          </option>

          {serviceOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="booking-job">
          Specific Service *
        </label>

        <select
          id="booking-job"
          value={selectedJob}
          onChange={(event) => setSelectedJob(event.target.value)}
          disabled={!selectedService}
          required
        >
          <option value="">
            {selectedService
              ? "Select the service you need"
              : "Select a category first"}
          </option>

          {selectedService &&
            jobOptions[selectedService]?.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="booking-description">
          Describe the Problem / Job
        </label>

        <textarea
          id="booking-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Tell us more about what you need..."
          rows={5}
          maxLength={1000}
        />

        <small>
          {description.length}/1000
        </small>
      </div>

      <div className="booking-notice">
        <span>🔒</span>

        <p>
          Your information is used only to process your service
          request and contact you about the booking.
        </p>
      </div>

      <button
        type="submit"
        className="submit-booking"
        disabled={loading}
      >
        {loading ? "Submitting Booking..." : "Submit Booking →"}
      </button>

    </form>
  );
      }
