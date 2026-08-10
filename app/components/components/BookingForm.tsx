"use client";

import { FormEvent, useState } from "react";

const services = {
  "Electrical Services": {
    Basic: 5000,
    Standard: 12000,
    Premium: 25000,
  },

  "Solar Energy": {
    Basic: 15000,
    Standard: 30000,
    Premium: 60000,
  },

  "Solar Water Heaters": {
    Basic: 15000,
    Standard: 25000,
    Premium: 40000,
  },

  "Air Conditioning": {
    Basic: 3000,
    Standard: 6000,
    Premium: 12000,
  },

  Refrigeration: {
    Basic: 3000,
    Standard: 6000,
    Premium: 12000,
  },

  Electronics: {
    Basic: 2000,
    Standard: 5000,
    Premium: 10000,
  },

  "Networking & Wi-Fi": {
    Basic: 3500,
    Standard: 8000,
    Premium: 20000,
  },

  "CCTV & Security": {
    Basic: 8000,
    Standard: 20000,
    Premium: 45000,
  },

  "Computers & IT": {
    Basic: 2000,
    Standard: 5000,
    Premium: 10000,
  },

  Printers: {
    Basic: 1500,
    Standard: 3500,
    Premium: 7500,
  },

  Plumbing: {
    Basic: 2500,
    Standard: 6000,
    Premium: 15000,
  },

  "Welding & Fabrication": {
    Basic: 5000,
    Standard: 15000,
    Premium: 35000,
  },

  "General Troubleshooting": {
    Basic: 2500,
    Standard: 5000,
    Premium: 10000,
  },
};

type ServiceName = keyof typeof services;
type PackageName = "Basic" | "Standard" | "Premium";

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
  const [packageName, setPackageName] =
    useState<PackageName | "">("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [reference, setReference] = useState("");

  const selectedPricing =
    service && service in services
      ? services[service as ServiceName]
      : null;

  async function submitBooking(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!packageName) {
      setError("Please select a service package.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const price =
        selectedPricing?.[packageName] || 0;

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
          package: packageName,
          price,
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
        <div className="success-icon">✓</div>

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
          <small>BOOKING REFERENCE</small>

          <strong>{reference}</strong>
        </div>

        <div className="booking-summary">
          <p>
            <strong>Service:</strong> {service}
          </p>

          <p>
            <strong>Package:</strong> {packageName}
          </p>

          <p>
            <strong>Starting Price:</strong>{" "}
            KSh{" "}
            {selectedPricing?.[
              packageName as PackageName
            ]?.toLocaleString()}
          </p>
        </div>

        <a
          href={`https://wa.me/254114280995?text=${encodeURIComponent(
            `Hello Dr Doi Technologies. I have submitted booking ${reference}. Service: ${service}. Package: ${packageName}.`
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

        <h2>Book a Service</h2>

        <p>
          Choose your service and preferred package.
        </p>
      </div>

      {error && (
        <div className="booking-error">
          {error}
        </div>
      )}

      <div className="form-group">
        <label>Full Name *</label>

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
        <label>Phone Number *</label>

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

      <div className="form-group">
        <label>Location *</label>

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
        <label>Service Category *</label>

        <select
          value={service}
          onChange={(e) => {
            setService(e.target.value);
            setPackageName("");
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

      {selectedPricing && (
        <div className="package-section">
          <label>Select Package *</label>

          <div className="package-grid">
            {(
              Object.keys(
                selectedPricing
              ) as PackageName[]
            ).map((item) => (
              <button
                type="button"
                key={item}
                className={`package-card ${
                  packageName === item
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setPackageName(item)
                }
              >
                {item === "Standard" && (
                  <span className="recommended">
                    RECOMMENDED
                  </span>
                )}

                <h3>{item}</h3>

                <strong>
                  From KSh{" "}
                  {selectedPricing[
                    item
                  ].toLocaleString()}
                </strong>

                <p>
                  {item === "Basic"
                    ? "Essential service"
                    : item === "Standard"
                    ? "Professional service"
                    : "Complete premium solution"}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="form-group">
        <label>Describe the Problem</label>

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
