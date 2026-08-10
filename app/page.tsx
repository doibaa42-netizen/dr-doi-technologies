"use client";

import { useState } from "react";
import BookingForm from "../components/BookingForm";

type Service = {
  name: string;
  description: string;
  price: number;
};

const serviceGroups = [
  {
    title: "Troubleshooting",
    icon: "🔧",
    description:
      "Diagnose and repair electrical and technology faults.",
    services: [
      {
        name: "Electrical Fault Diagnosis",
        description:
          "Find and diagnose electrical faults, short circuits and power problems.",
        price: 500,
      },
      {
        name: "Appliance Troubleshooting",
        description:
          "Diagnosis of faulty household electrical appliances.",
        price: 500,
      },
      {
        name: "Wiring Fault Troubleshooting",
        description:
          "Identify faulty wiring, loose connections and electrical faults.",
        price: 700,
      },
      {
        name: "Power Supply Troubleshooting",
        description:
          "Diagnose power supply, breaker and voltage problems.",
        price: 500,
      },
    ],
  },

  {
    title: "Electrical Services",
    icon: "⚡",
    description:
      "Professional electrical installation and maintenance.",
    services: [
      {
        name: "House Wiring",
        description:
          "Electrical wiring for homes, offices and buildings.",
        price: 1500,
      },
      {
        name: "Socket & Switch Installation",
        description:
          "Installation and replacement of sockets and switches.",
        price: 500,
      },
      {
        name: "Lighting Installation",
        description:
          "Indoor and outdoor lighting installation.",
        price: 500,
      },
      {
        name: "Electrical Maintenance",
        description:
          "Routine electrical inspection and maintenance.",
        price: 1000,
      },
    ],
  },

  {
    title: "Solar Solutions",
    icon: "☀️",
    description:
      "Affordable solar energy installation and support.",
    services: [
      {
        name: "Solar System Installation",
        description:
          "Installation of residential and small commercial solar systems.",
        price: 3000,
      },
      {
        name: "Solar Maintenance",
        description:
          "Inspection, servicing and maintenance of solar systems.",
        price: 1000,
      },
      {
        name: "Solar Fault Diagnosis",
        description:
          "Troubleshooting solar panels, controllers, batteries and inverters.",
        price: 1000,
      },
      {
        name: "Solar Water Heater Service",
        description:
          "Installation and maintenance of solar water heating systems.",
        price: 2000,
      },
    ],
  },

  {
    title: "Electronics",
    icon: "🔌",
    description:
      "Electronics repair, testing and maintenance.",
    services: [
      {
        name: "TV Troubleshooting",
        description:
          "Diagnosis and repair of common television faults.",
        price: 700,
      },
      {
        name: "Power Supply Repair",
        description:
          "Testing and repair of electronic power supply systems.",
        price: 700,
      },
      {
        name: "Electronic Circuit Repair",
        description:
          "Diagnosis and repair of electronic circuit boards.",
        price: 1000,
      },
      {
        name: "Electronic Device Diagnosis",
        description:
          "Professional diagnosis of faulty electronic devices.",
        price: 500,
      },
    ],
  },

  {
    title: "ICT & Networking",
    icon: "🌐",
    description:
      "Networking, Wi-Fi, computer and technology solutions.",
    services: [
      {
        name: "Wi-Fi Installation",
        description:
          "Router configuration and Wi-Fi network installation.",
        price: 1000,
      },
      {
        name: "Ethernet Network Installation",
        description:
          "Structured Ethernet cabling and network setup.",
        price: 1500,
      },
      {
        name: "Router Configuration",
        description:
          "Router setup, configuration and troubleshooting.",
        price: 700,
      },
      {
        name: "Computer Troubleshooting",
        description:
          "Diagnosis of software and hardware computer problems.",
        price: 700,
      },
    ],
  },
];

export default function Home() {
  const [selectedGroup, setSelectedGroup] =
    useState<any>(null);

  const [selectedService, setSelectedService] =
    useState<Service | null>(null);

  const openGroup = (group: any) => {
    setSelectedGroup(group);
  };

  const chooseService = (service: Service) => {
    setSelectedService(service);
    setSelectedGroup(null);
  };

  return (
    <main>

      {/* LIVE BACKGROUND */}

      <div className="live-background">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* NAVBAR */}

      <header className="navbar">

        <div className="nav-logo">
          <img
            src="/images/logo.svg"
            alt="Dr Doi Technologies"
          />
        </div>

        <nav>
          <a href="#home">
            Home
          </a>

          <a href="#about">
            About
          </a>

          <a href="#services">
            Services
          </a>

          <a href="#contact">
            Contact
          </a>
        </nav>

        <a
          href="#services"
          className="nav-button"
        >
          Book a Service
        </a>

      </header>

      {/* HERO */}

      <section
        className="hero"
        id="home"
      >

        <div className="hero-content">

          <p className="eyebrow">
            PROFESSIONAL TECHNOLOGY SERVICES
          </p>

          <h1>
            Smart Electrical &
            <br />
            Technology Solutions
          </h1>

          <p className="hero-text">
            Reliable electrical, electronics,
            solar, networking and technology
            services in Nakuru and beyond.
          </p>

          <div className="hero-buttons">

            <a
              href="#services"
              className="primary-button"
            >
              Book a Service
            </a>

            <a
              href="#services"
              className="secondary-button"
            >
              Our Services
            </a>

          </div>

        </div>

      </section>

      {/* ABOUT */}

      <section
        className="about"
        id="about"
      >

        <p className="eyebrow">
          ABOUT US
        </p>

        <h2>
          Dr Doi Technologies
        </h2>

        <p>
          We provide professional electrical,
          electronics, solar, ICT and networking
          solutions for homes, businesses and
          institutions.
        </p>

        <div className="about-grid">

          <div>
            <strong>⚡</strong>
            <h3>Professional</h3>
            <p>
              Reliable technical solutions.
            </p>
          </div>

          <div>
            <strong>🛠️</strong>
            <h3>Reliable</h3>
            <p>
              Quality service and support.
            </p>
          </div>

          <div>
            <strong>📍</strong>
            <h3>Nakuru</h3>
            <p>
              Serving Nakuru and beyond.
            </p>
          </div>

        </div>

      </section>

      {/* SERVICES */}

      <section
        className="services-section"
        id="services"
      >

        <div className="section-heading">

          <p className="eyebrow">
            OUR SERVICES
          </p>

          <h2>
            Choose a Service Category
          </h2>

          <p>
            Tap a category below to view
            the specific services available.
          </p>

        </div>

        <div className="service-grid">

          {serviceGroups.map((group) => (

            <button
              className="service-card"
              key={group.title}
              onClick={() =>
                openGroup(group)
              }
            >

              <span className="service-icon">
                {group.icon}
              </span>

              <h3>
                {group.title}
              </h3>

              <p>
                {group.description}
              </p>

              <span className="view-services">
                View Services →
              </span>

            </button>

          ))}

        </div>

      </section>

      {/* SERVICE LIST MODAL */}

      {selectedGroup && (

        <div className="modal-overlay">

          <div className="service-modal">

            <button
              className="close-button"
              onClick={() =>
                setSelectedGroup(null)
              }
            >
              ×
            </button>

            <span className="modal-icon">
              {selectedGroup.icon}
            </span>

            <h2>
              {selectedGroup.title}
            </h2>

            <p>
              {selectedGroup.description}
            </p>

            <div className="specific-services">

              {selectedGroup.services.map(
                (service: Service) => (

                  <button
                    key={service.name}
                    className="specific-service"
                    onClick={() =>
                      chooseService(service)
                    }
                  >

                    <div>

                      <strong>
                        {service.name}
                      </strong>

                      <span>
                        {service.description}
                      </span>

                    </div>

                    <b>
                      KSh{" "}
                      {service.price.toLocaleString()}
                    </b>

                  </button>

                )
              )}

            </div>

          </div>

        </div>

      )}

      {/* BOOKING FORM */}

      {selectedService && (

        <div className="modal-overlay">

          <div className="booking-modal">

            <button
              className="close-button"
              onClick={() =>
                setSelectedService(null)
              }
            >
              ×
            </button>

            <BookingForm
              initialService=""
              onClose={() =>
                setSelectedService(null)
              }
            />

          </div>

        </div>

      )}

      {/* CONTACT */}

      <section
        className="contact"
        id="contact"
      >

        <p className="eyebrow">
          GET IN TOUCH
        </p>

        <h2>
          Need a Technical Solution?
        </h2>

        <p>
          Contact Dr Doi Technologies for
          electrical, electronics, solar,
          networking and technology services.
        </p>

        <a
          href="https://wa.me/254114280995"
          className="whatsapp-button"
        >
          WhatsApp Us
        </a>

      </section>

      {/* FOOTER */}

      <footer>

        <div>
          <img
            src="/images/logo.svg"
            alt="Dr Doi Technologies"
          />
        </div>

        <p>
          © {new Date().getFullYear()} Dr Doi
          Technologies. All rights reserved.
        </p>

      </footer>

    </main>
  );
        }
