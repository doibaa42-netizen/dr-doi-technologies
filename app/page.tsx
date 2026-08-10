"use client";

import { FormEvent, useState } from "react";

type Service = {
  name: string;
  description: string;
  image: string;
  items: string[];
};

const services: Service[] = [
  {
    name: "Electrical Services",
    description:
      "Professional electrical installation, repair, maintenance and troubleshooting.",
    image: "/images/services/electrical.jpg",
    items: [
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
  },

  {
    name: "Solar Energy",
    description:
      "Complete solar power installation, maintenance and troubleshooting.",
    image: "/images/services/solar.jpg",
    items: [
      "Solar panel installation",
      "Solar system design",
      "Inverter installation",
      "Battery installation",
      "Solar troubleshooting",
      "Solar maintenance",
      "Off-grid solar systems",
      "Solar lighting",
    ],
  },

  {
    name: "Solar Water Heaters",
    description:
      "Installation, repair and maintenance of solar water heating systems.",
    image: "/images/services/solar-water-heater.jpg",
    items: [
      "Solar water heater installation",
      "System inspection",
      "Leak troubleshooting",
      "Controller installation",
      "Heating element replacement",
      "Solar water heater maintenance",
    ],
  },

  {
    name: "Air Conditioning",
    description:
      "Air conditioner installation, servicing, repair and troubleshooting.",
    image: "/images/services/air-conditioning.jpg",
    items: [
      "AC installation",
      "AC servicing",
      "AC cleaning",
      "AC troubleshooting",
      "Electrical fault diagnosis",
      "AC maintenance",
    ],
  },

  {
    name: "Refrigeration",
    description:
      "Repair and maintenance of refrigerators, freezers and refrigeration equipment.",
    image: "/images/services/refrigerator.jpg",
    items: [
      "Refrigerator repair",
      "Freezer repair",
      "Cooling fault diagnosis",
      "Electrical troubleshooting",
      "Thermostat replacement",
      "Refrigeration maintenance",
    ],
  },

  {
    name: "Electronics",
    description:
      "Professional electronics diagnosis, repair and maintenance.",
    image: "/images/services/electronics.jpg",
    items: [
      "Electronic equipment troubleshooting",
      "Power supply repair",
      "Circuit diagnosis",
      "Component replacement",
      "Audio equipment repair",
      "Electronic maintenance",
    ],
  },

  {
    name: "Networking & Wi-Fi",
    description:
      "Reliable networking, Wi-Fi and internet connectivity solutions.",
    image: "/images/services/networking.jpg",
    items: [
      "Wi-Fi installation",
      "Router configuration",
      "LAN installation",
      "Ethernet cabling",
      "Network troubleshooting",
      "Network maintenance",
      "Internet connectivity diagnosis",
    ],
  },

  {
    name: "CCTV & Security",
    description:
      "CCTV installation, configuration and security system maintenance.",
    image: "/images/services/cctv.jpg",
    items: [
      "CCTV camera installation",
      "DVR/NVR configuration",
      "Remote CCTV viewing",
      "Camera troubleshooting",
      "Security system maintenance",
      "Network camera setup",
    ],
  },

  {
    name: "Computers & IT",
    description:
      "Computer repair, software installation, maintenance and IT support.",
    image: "/images/services/computers.jpg",
    items: [
      "Computer troubleshooting",
      "Windows installation",
      "Software installation",
      "Computer maintenance",
      "Hardware diagnosis",
      "Virus and malware troubleshooting",
      "IT support",
    ],
  },

  {
    name: "Printers",
    description:
      "Printer installation, troubleshooting, configuration and maintenance.",
    image: "/images/services/printers.jpg",
    items: [
      "Printer installation",
      "Printer troubleshooting",
      "Network printer setup",
      "Driver installation",
      "Printer maintenance",
      "Printing fault diagnosis",
    ],
  },

  {
    name: "Plumbing",
    description:
      "General plumbing installation, repair and maintenance.",
    image: "/images/services/plumbing.jpg",
    items: [
      "Pipe installation",
      "Leak repair",
      "Tap installation",
      "Water system troubleshooting",
      "Drainage troubleshooting",
      "Plumbing maintenance",
    ],
  },

  {
    name: "Welding & Fabrication",
    description:
      "Professional welding, metal fabrication and repair services.",
    image: "/images/services/welding.jpg",
    items: [
      "Metal welding",
      "Gate fabrication",
      "Door fabrication",
      "Metal repairs",
      "Frame fabrication",
      "General fabrication",
    ],
  },

  {
    name: "General Troubleshooting",
    description:
      "Professional diagnosis of electrical, electronic, appliance and technology faults.",
    image: "/images/services/troubleshooting.jpg",
    items: [
      "Electrical fault diagnosis",
      "Electronic fault diagnosis",
      "Appliance troubleshooting",
      "Dispenser troubleshooting",
      "Power-related faults",
      "Equipment inspection",
      "Preventive maintenance",
    ],
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [selectedService, setSelectedService] =
    useState<Service | null>(null);

  const [bookingOpen, setBookingOpen] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");
  const [specificService, setSpecificService] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [bookingReference, setBookingReference] = useState("");

  const selectedCategory = services.find(
    (service) => service.name === serviceCategory
  );

  function openService(service: Service) {
    setSelectedService(service);
    setBookingOpen(false);
    setError("");
    setSuccess(false);
  }

  function openBooking(service?: Service) {
    setError("");
    setSuccess(false);
    setBookingReference("");

    if (service) {
      setSelectedService(service);
      setServiceCategory(service.name);
      setSpecificService("");
    } else {
      setSelectedService(null);
      setServiceCategory("");
      setSpecificService("");
    }

    setBookingOpen(true);
  }

  function closeModal() {
    setSelectedService(null);
    setBookingOpen(false);
    setError("");
    setSuccess(false);
    setBookingReference("");
  }

  function resetBooking() {
    setName("");
    setPhone("");
    setLocation("");
    setServiceCategory("");
    setSpecificService("");
    setDescription("");
    setError("");
    setSuccess(false);
    setBookingReference("");
  }

  async function handleBookingSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
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
          service: serviceCategory,
          requestedService: specificService,
          description,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to submit your booking."
        );
      }

      setBookingReference(
        data.booking?.bookingReference || "BOOKING RECEIVED"
      );

      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while submitting your booking."
      );
    } finally {
      setLoading(false);
    }
  }

  const whatsappMessage = `Hello Dr Doi Technologies. I would like to enquire about your services.`;

  const whatsappLink = `https://wa.me/254114280995?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const bookingWhatsappLink = `https://wa.me/254114280995?text=${encodeURIComponent(
    `Hello Dr Doi Technologies. I have submitted booking ${bookingReference} for ${serviceCategory} - ${specificService}.`
  )}`;

  return (
    <main className="site">

      {/* =====================================================
          ANIMATED BACKGROUND
      ===================================================== */}

      <div className="animated-background">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <nav className="navbar">

        <div className="logo-area">
          <img
            src="/images/logo.svg"
            alt="Dr Doi Technologies"
          />

          <div className="logo-text">
            <strong>DR DOI</strong>
            <small>TECHNOLOGIES</small>
          </div>
        </div>

        <button
          type="button"
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open navigation"
        >
          ☰
        </button>

        <div
          className={`nav-links ${
            menuOpen ? "open" : ""
          }`}
        >
          <a
            href="#home"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </a>

          <a
            href="#services"
            onClick={() => setMenuOpen(false)}
          >
            Services
          </a>

          <a
            href="#about"
            onClick={() => setMenuOpen(false)}
          >
            About
          </a>

          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </a>
        </div>

      </nav>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="hero"
        id="home"
      >

        <div className="hero-content">

          <div className="hero-badge">
            ⚡ PROFESSIONAL TECHNICAL SERVICES
          </div>

          <h1>
            DR DOI
            <span>TECHNOLOGIES</span>
          </h1>

          <p className="hero-subtitle">
            Electrical • Electronics • Solar • ICT • Security
            • Refrigeration • Air Conditioning & More
          </p>

          <p className="hero-text">
            Reliable technical solutions for homes, businesses
            and institutions in Nakuru and surrounding areas.
          </p>

          <div className="hero-buttons">

            <a
              href="#services"
              className="primary-button"
            >
              Explore Services
            </a>

            <button
              type="button"
              className="whatsapp-button"
              onClick={() => openBooking()}
            >
              📋 Book a Service
            </button>

          </div>

        </div>

        <div className="hero-symbol">
          <div className="electric-ring">
            <span>⚡</span>
          </div>
        </div>

      </section>

      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section
        className="services-section"
        id="services"
      >

        <div className="section-heading">

          <span>WHAT WE DO</span>

          <h2>Our Services</h2>

          <p>
            Select a service to see the specific solutions
            offered by Dr Doi Technologies.
          </p>

        </div>

        <div className="services-grid">

          {services.map((service) => (

            <button
              type="button"
              className="service-card"
              key={service.name}
              onClick={() => openService(service)}
            >

              <div className="service-image">

                <img
                  src={service.image}
                  alt={service.name}
                  onError={(event) => {
                    event.currentTarget.style.display =
                      "none";
                  }}
                />

                <div className="image-overlay" />

              </div>

              <div className="service-card-content">

                <h3>{service.name}</h3>

                <p>
                  {service.description}
                </p>

                <span className="view-service">
                  View Services →
                </span>

              </div>

            </button>

          ))}

        </div>

      </section>

      {/* =====================================================
          ABOUT
      ===================================================== */}

      <section
        className="about-section"
        id="about"
      >

        <div className="section-heading">

          <span>WHY DR DOI?</span>

          <h2>
            Professional. Reliable. Innovative.
          </h2>

          <p>
            Practical technical solutions designed around
            your needs.
          </p>

        </div>

        <div className="about-grid">

          <div className="about-card">

            <div className="about-icon">
              ⚡
            </div>

            <h3>
              Technical Expertise
            </h3>

            <p>
              Professional solutions covering electrical,
              electronics, ICT, solar, appliances and
              technology systems.
            </p>

          </div>

          <div className="about-card">

            <div className="about-icon">
              🛠️
            </div>

            <h3>
              Quality Work
            </h3>

            <p>
              We focus on accurate diagnosis, quality
              workmanship and dependable solutions.
            </p>

          </div>

          <div className="about-card">

            <div className="about-icon">
              📍
            </div>

            <h3>
              Nakuru & Environs
            </h3>

            <p>
              Mobile technical services available within
              Nakuru and surrounding areas.
            </p>

          </div>

        </div>

      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="cta-section">

        <div>

          <span>
            NEED A TECHNICAL SOLUTION?
          </span>

          <h2>
            Let's Fix It.
          </h2>

          <p>
            Contact Dr Doi Technologies today for
            professional technical assistance.
          </p>

        </div>

        <div className="cta-buttons">

          <button
            type="button"
            className="whatsapp-button large"
            onClick={() => openBooking()}
          >
            📋 Book a Service
          </button>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="primary-button large"
          >
            💬 WhatsApp
          </a>

        </div>

      </section>

      {/* =====================================================
          CONTACT
      ===================================================== */}

      <section
        className="contact-section"
        id="contact"
      >

        <div className="section-heading">

          <span>
            GET IN TOUCH
          </span>

          <h2>
            Contact Dr Doi Technologies
          </h2>

        </div>

        <div className="contact-grid">

          <a
            href="tel:+254114280995"
            className="contact-card"
          >

            <span>📞</span>

            <div>
              <strong>
                Call Us
              </strong>

              <p>
                0114 280 995
              </p>
            </div>

          </a>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >

            <span>💬</span>

            <div>
              <strong>
                WhatsApp
              </strong>

              <p>
                Chat with us
              </p>
            </div>

          </a>

          <div className="contact-card">

            <span>📍</span>

            <div>
              <strong>
                Service Area
              </strong>

              <p>
                Nakuru & Environs
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="footer">

        <div className="footer-brand">

          <img
            src="/images/logo.svg"
            alt="Dr Doi Technologies"
          />

          <div>

            <strong>
              DR DOI TECHNOLOGIES
            </strong>

            <p>
              Professional Technical Solutions
            </p>

          </div>

        </div>

        <p>
          © {new Date().getFullYear()} Dr Doi Technologies.
          All rights reserved.
        </p>

      </footer>

      {/* =====================================================
          SERVICE / BOOKING MODAL
      ===================================================== */}

      {(selectedService || bookingOpen) && (

        <div
          className="modal-backdrop"
          onClick={closeModal}
        >

          <div
            className="service-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              type="button"
              className="close-modal"
              onClick={closeModal}
              aria-label="Close"
            >
              ×
            </button>

            {/* =================================================
                SERVICE DETAILS
            ================================================= */}

            {!bookingOpen && selectedService && (

              <>

                <div className="modal-image">

                  <img
                    src={selectedService.image}
                    alt={selectedService.name}
                  />

                </div>

                <div className="modal-content">

                  <span className="modal-label">
                    DR DOI TECHNOLOGIES
                  </span>

                  <h2>
                    {selectedService.name}
                  </h2>

                  <p className="modal-description">
                    {selectedService.description}
                  </p>

                  <h3>
                    Services available:
                  </h3>

                  <ul className="service-list">

                    {selectedService.items.map(
                      (item) => (

                        <li key={item}>

                          <span>
                            ✓
                          </span>

                          {item}

                        </li>

                      )
                    )}

  </
