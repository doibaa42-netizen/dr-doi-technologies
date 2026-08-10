"use client";

import { useState } from "react";
import BookingForm from "../components/BookingForm";

type Service = {
  name: string;
  description: string;
  price: number;
};

type ServiceGroup = {
  title: string;
  icon: string;
  description: string;
  services: Service[];
};

const serviceGroups: ServiceGroup[] = [
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
        price: 0,
      },
      {
        name: "Appliance Troubleshooting",
        description:
          "Diagnosis of faulty household electrical appliances.",
        price: 0,
      },
      {
        name: "Wiring Fault Troubleshooting",
        description:
          "Identify faulty wiring, loose connections and electrical faults.",
        price: 0,
      },
      {
        name: "Power Supply Troubleshooting",
        description:
          "Diagnose power supply, breaker and voltage problems.",
        price: 0,
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
        price: 0,
      },
      {
        name: "Electrical Installation",
        description:
          "Professional electrical installation services.",
        price: 0,
      },
      {
        name: "Socket & Switch Installation",
        description:
          "Installation and replacement of sockets and switches.",
        price: 0,
      },
      {
        name: "Lighting Installation",
        description:
          "Indoor and outdoor lighting installation.",
        price: 0,
      },
      {
        name: "DB & Distribution Board Work",
        description:
          "Distribution board installation, upgrades and maintenance.",
        price: 0,
      },
      {
        name: "MCB & Breaker Replacement",
        description:
          "Replacement and installation of electrical breakers.",
        price: 0,
      },
      {
        name: "Electrical Maintenance",
        description:
          "Routine electrical inspection and maintenance.",
        price: 0,
      },
    ],
  },

  {
    title: "Solar Solutions",
    icon: "☀️",
    description:
      "Professional solar energy installation and support.",
    services: [
      {
        name: "Solar System Installation",
        description:
          "Installation of residential and commercial solar systems.",
        price: 0,
      },
      {
        name: "Solar System Design",
        description:
          "Solar system sizing and design.",
        price: 0,
      },
      {
        name: "Inverter Installation",
        description:
          "Professional inverter installation and configuration.",
        price: 0,
      },
      {
        name: "Battery Installation",
        description:
          "Solar battery installation and connection.",
        price: 0,
      },
      {
        name: "Solar Maintenance",
        description:
          "Inspection, servicing and maintenance of solar systems.",
        price: 0,
      },
      {
        name: "Solar Fault Diagnosis",
        description:
          "Troubleshooting panels, batteries, controllers and inverters.",
        price: 0,
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
        name: "Electronic Equipment Troubleshooting",
        description:
          "Diagnosis of faulty electronic equipment.",
        price: 0,
      },
      {
        name: "Power Supply Repair",
        description:
          "Testing and repair of electronic power supplies.",
        price: 0,
      },
      {
        name: "Circuit Diagnosis",
        description:
          "Professional electronic circuit diagnosis.",
        price: 0,
      },
      {
        name: "Component Replacement",
        description:
          "Replacement of faulty electronic components.",
        price: 0,
      },
      {
        name: "Audio Equipment Repair",
        description:
          "Repair and maintenance of audio equipment.",
        price: 0,
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
        price: 0,
      },
      {
        name: "Ethernet Network Installation",
        description:
          "Structured Ethernet cabling and network setup.",
        price: 0,
      },
      {
        name: "Router Configuration",
        description:
          "Router setup, configuration and troubleshooting.",
        price: 0,
      },
      {
        name: "Computer Troubleshooting",
        description:
          "Diagnosis of software and hardware computer problems.",
        price: 0,
      },
      {
        name: "Network Troubleshooting",
        description:
          "Diagnosis and repair of network problems.",
        price: 0,
      },
    ],
  },
];

function getBookingCategory(
  category: string
): string {
  const categoryMap: Record<string, string> = {
    Troubleshooting: "General Troubleshooting",
    "Electrical Services": "Electrical Services",
    "Solar Solutions": "Solar Energy",
    Electronics: "Electronics",
    "ICT & Networking": "Networking & Wi-Fi",
  };

  return categoryMap[category] || category;
}

export default function Home() {
  const [selectedGroup, setSelectedGroup] =
    useState<ServiceGroup | null>(null);

  const [selectedService, setSelectedService] =
    useState<Service | null>(null);

  const [bookingCategory, setBookingCategory] =
    useState("");

  const openGroup = (group: ServiceGroup) => {
    setSelectedGroup(group);
  };

  const chooseService = (
    group: ServiceGroup,
    service: Service
  ) => {
    setSelectedService(service);

    setBookingCategory(
      getBookingCategory(group.title)
    );

    setSelectedGroup(null);
  };

  const closeBooking = () => {
    setSelectedService(null);
    setBookingCategory("");
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
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
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
                (service) => (

                  <button
                    key={service.name}
                    className="specific-service"
                    onClick={() =>
                      chooseService(
                        selectedGroup,
                        service
                      )
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
                      View Packages →
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
              onClick={closeBooking}
            >
              ×
            </button>

            <BookingForm
              initialService={bookingCategory}
              onClose={closeBooking}
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
