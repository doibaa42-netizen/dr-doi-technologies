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
"Professional diagnosis and repair of electrical, electronic and appliance faults.",
services: [
{
name: "Electrical Fault Diagnosis",
description:
"Professional diagnosis of electrical faults, short circuits and power problems.",
price: 1500,
},
{
name: "Appliance Troubleshooting",
description:
"Diagnosis and troubleshooting of faulty household appliances.",
price: 1500,
},
{
name: "Wiring Fault Troubleshooting",
description:
"Identification and correction of faulty wiring and loose connections.",
price: 2000,
},
{
name: "Power Supply Troubleshooting",
description:
"Diagnosis of breakers, voltage problems and power supply faults.",
price: 1500,
},
],
},

{
title: "Electrical Services",
icon: "⚡",
description:
"Professional electrical installation, repair and maintenance.",
services: [
{
name: "House Wiring",
description:
"Professional electrical wiring for homes, offices and buildings.",
price: 7500,
},
{
name: "Electrical Installation",
description:
"Electrical installation services for homes and businesses.",
price: 5000,
},
{
name: "Socket & Switch Installation",
description:
"Professional installation and replacement of sockets and switches.",
price: 1500,
},
{
name: "Lighting Installation",
description:
"Indoor and outdoor lighting installation.",
price: 2000,
},
{
name: "DB & Distribution Board Work",
description:
"Distribution board installation, repair and organization.",
price: 5000,
},
{
name: "MCB & Breaker Replacement",
description:
"Replacement and installation of electrical breakers and MCBs.",
price: 2000,
},
{
name: "Electrical Maintenance",
description:
"Professional electrical inspection and preventive maintenance.",
price: 2500,
},
],
},

{
title: "Solar Solutions",
icon: "☀️",
description:
"Solar installation, maintenance, troubleshooting and system support.",
services: [
{
name: "Solar System Installation",
description:
"Professional installation of residential and commercial solar systems.",
price: 15000,
},
{
name: "Solar System Design",
description:
"Solar sizing and system design according to your energy requirements.",
price: 5000,
},
{
name: "Inverter Installation",
description:
"Professional inverter installation and configuration.",
price: 5000,
},
{
name: "Battery Installation",
description:
"Battery installation, connection and system configuration.",
price: 4000,
},
{
name: "Solar Maintenance",
description:
"Inspection, servicing and maintenance of solar systems.",
price: 3500,
},
{
name: "Solar Fault Diagnosis",
description:
"Diagnosis of solar panels, batteries, controllers and inverter faults.",
price: 2500,
},
{
name: "Solar Water Heater Service",
description:
"Installation, servicing and maintenance of solar water heaters.",
price: 5000,
},
],
},

{
title: "Solar Water Heaters",
icon: "♨️",
description:
"Solar water heater installation, servicing and maintenance.",
services: [
{
name: "Solar Water Heater Installation",
description:
"Professional installation of solar water heating systems.",
price: 10000,
},
{
name: "System Inspection",
description:
"Inspection and performance assessment of the system.",
price: 2500,
},
{
name: "Leak Troubleshooting",
description:
"Detection and repair of solar water heater leaks.",
price: 2500,
},
{
name: "Controller Installation",
description:
"Installation and configuration of solar water heater controllers.",
price: 3000,
},
{
name: "Heating Element Replacement",
description:
"Replacement of faulty heating elements.",
price: 3500,
},
{
name: "Maintenance",
description:
"Complete solar water heater maintenance.",
price: 3500,
},
],
},

{
title: "Air Conditioning",
icon: "❄️",
description:
"Professional air conditioner installation, servicing and repair.",
services: [
{
name: "AC Installation",
description:
"Professional air conditioner installation.",
price: 10000,
},
{
name: "AC Servicing",
description:
"Complete air conditioner servicing and performance check.",
price: 3500,
},
{
name: "AC Cleaning",
description:
"Professional cleaning of indoor and outdoor AC units.",
price: 2500,
},
{
name: "AC Troubleshooting",
description:
"Diagnosis of air conditioner electrical and cooling faults.",
price: 2500,
},
{
name: "Electrical Fault Diagnosis",
description:
"Diagnosis of electrical faults affecting AC systems.",
price: 2500,
},
{
name: "AC Maintenance",
description:
"Preventive maintenance for air conditioning systems.",
price: 3500,
},
],
},

{
title: "Refrigeration",
icon: "🧊",
description:
"Refrigerator, freezer and refrigeration system services.",
services: [
{
name: "Refrigerator Repair",
description:
"Diagnosis and repair of refrigerator faults.",
price: 2500,
},
{
name: "Freezer Repair",
description:
"Diagnosis and repair of freezer faults.",
price: 2500,
},
{
name: "Cooling Fault Diagnosis",
description:
"Diagnosis of cooling and temperature problems.",
price: 2000,
},
{
name: "Electrical Troubleshooting",
description:
"Diagnosis of electrical faults in refrigeration equipment.",
price: 2000,
},
{
name: "Thermostat Replacement",
description:
"Replacement and testing of faulty thermostats.",
price: 2500,
},
{
name: "Refrigeration Maintenance",
description:
"Professional maintenance and inspection.",
price: 3500,
},
],
},

{
title: "Electronics",
icon: "🔌",
description:
"Professional electronics diagnosis, repair and maintenance.",
services: [
{
name: "TV Troubleshooting",
description:
"Diagnosis and repair of common television faults.",
price: 2000,
},
{
name: "Power Supply Repair",
description:
"Testing and repair of electronic power supply systems.",
price: 2000,
},
{
name: "Electronic Circuit Repair",
description:
"Professional diagnosis and repair of electronic circuit boards.",
price: 3500,
},
{
name: "Electronic Device Diagnosis",
description:
"Professional diagnosis of faulty electronic devices.",
price: 1500,
},
{
name: "Audio Equipment Repair",
description:
"Diagnosis and repair of speakers, amplifiers and audio systems.",
price: 2500,
},
{
name: "Electronic Maintenance",
description:
"Professional maintenance of electronic equipment.",
price: 2500,
},
],
},

{
title: "Networking & Wi-Fi",
icon: "🌐",
description:
"Professional networking, Wi-Fi and internet connectivity solutions.",
services: [
{
name: "Wi-Fi Installation",
description:
"Professional router configuration and Wi-Fi installation.",
price: 2500,
},
{
name: "Router Configuration",
description:
"Router setup, configuration and troubleshooting.",
price: 1500,
},
{
name: "LAN Installation",
description:
"Professional local area network installation.",
price: 5000,
},
{
name: "Ethernet Cabling",
description:
"Structured Ethernet cabling and network setup.",
price: 5000,
},
{
name: "Network Troubleshooting",
description:
"Diagnosis and correction of network connectivity problems.",
price: 2000,
},
{
name: "Network Maintenance",
description:
"Professional network inspection and maintenance.",
price: 2500,
},
],
},

{
title: "CCTV & Security",
icon: "📹",
description:
"CCTV installation, configuration and security system support.",
services: [
{
name: "CCTV Camera Installation",
description:
"Professional CCTV camera installation.",
price: 5000,
},
{
name: "DVR/NVR Configuration",
description:
"DVR/NVR setup and configuration.",
price: 3500,
},
{
name: "Remote CCTV Viewing",
description:
"Configure CCTV remote viewing on phones and computers.",
price: 3500,
},
{
name: "Camera Troubleshooting",
description:
"Diagnosis and repair of CCTV camera faults.",
price: 2000,
},
{
name: "Security System Maintenance",
description:
"Inspection and maintenance of CCTV systems.",
price: 3500,
},
],
},

{
title: "Computers & IT",
icon: "💻",
description:
"Computer repair, software installation and IT support.",
services: [
{
name: "Computer Troubleshooting",
description:
"Diagnosis of computer hardware and software problems.",
price: 1500,
},
{
name: "Windows Installation",
description:
"Professional Windows installation and configuration.",
price: 2000,
},
{
name: "Software Installation",
description:
"Installation and configuration of required software.",
price: 1000,
},
{
name: "Computer Maintenance",
description:
"Computer cleaning, optimization and preventive maintenance.",
price: 2000,
},
{
name: "Hardware Diagnosis",
description:
"Professional computer hardware diagnosis.",
price: 1500,
},
{
name: "IT Support",
description:
"General technical and IT support.",
price: 2000,
},
],
},

{
title: "Printers",
icon: "🖨️",
description:
"Printer installation, troubleshooting and maintenance.",
services: [
{
name: "Printer Installation",
description:
"Printer installation and configuration.",
price: 1500,
},
{
name: "Printer Troubleshooting",
description:
"Diagnosis and repair of printer problems.",
price: 1500,
},
{
name: "Network Printer Setup",
description:
"Connect printers to Wi-Fi or Ethernet networks.",
price: 2500,
},
{
name: "Driver Installation",
description:
"Printer driver installation and configuration.",
price: 1000,
},
{
name: "Printer Maintenance",
description:
"Professional printer cleaning and maintenance.",
price: 2000,
},
],
},

{
title: "Plumbing",
icon: "🚰",
description:
"Professional plumbing installation, repair and maintenance.",
services: [
{
name: "Pipe Installation",
description:
"Water pipe installation and replacement.",
price: 3000,
},
{
name: "Leak Repair",
description:
"Detection and repair of water leaks.",
price: 2000,
},
{
name: "Tap Installation",
description:
"Installation and replacement of taps.",
price: 1500,
},
{
name: "Water System Troubleshooting",
description:
"Diagnosis of water supply problems.",
price: 2000,
},
{
name: "Drainage Troubleshooting",
description:
"Diagnosis and correction of drainage problems.",
price: 2500,
},
{
name: "Plumbing Maintenance",
description:
"Inspection and preventive plumbing maintenance.",
price: 2500,
},
],
},

{
title: "Welding & Fabrication",
icon: "🔩",
description:
"Professional welding, metalwork and fabrication.",
services: [
{
name: "Metal Welding",
description:
"Professional welding and metal repair.",
price: 2500,
},
{
name: "Gate Fabrication",
description:
"Custom metal gate fabrication.",
price: 15000,
},
{
name: "Door Fabrication",
description:
"Custom metal door fabrication.",
price: 12000,
},
{
name: "Metal Repairs",
description:
"Repair of damaged metal structures.",
price: 2500,
},
{
name: "Frame Fabrication",
description:
"Custom metal frame fabrication.",
price: 7500,
},
{
name: "General Fabrication",
description:
"Custom welding and fabrication services.",
price: 5000,
},
],
},

{
title: "General Troubleshooting",
icon: "🛠️",
description:
"Professional diagnosis of electrical, electronic and equipment faults.",
services: [
{
name: "Electrical Fault Diagnosis",
description:
"Professional electrical fault diagnosis.",
price: 1500,
},
{
name: "Electronic Fault Diagnosis",
description:
"Diagnosis of electronic equipment faults.",
price: 1500,
},
{
name: "Appliance Troubleshooting",
description:
"Professional appliance troubleshooting.",
price: 1500,
},
{
name: "Dispenser Troubleshooting",
description:
"Diagnosis and repair of water dispenser faults.",
price: 2000,
},
{
name: "Power-Related Faults",
description:
"Diagnosis of power-related equipment problems.",
price: 1500,
},
{
name: "Equipment Inspection",
description:
"Professional equipment inspection and diagnosis.",
price: 1500,
},
],
},
];

export default function Home() {
const [selectedGroup, setSelectedGroup] =
useState<ServiceGroup | null>(null);

const [selectedService, setSelectedService] =
useState<Service | null>(null);

const [showBooking, setShowBooking] =
useState(false);

const [bookingCategory, setBookingCategory] =
useState("");

const [bookingService, setBookingService] =
useState("");

function openGroup(group: ServiceGroup) {
setSelectedGroup(group);
}

function chooseService(
service: Service
) {
setSelectedService(service);
setBookingCategory(
selectedGroup?.title || ""
);
setBookingService(service.name);
setSelectedGroup(null);
setShowBooking(true);
}

function openGeneralBooking() {
setBookingCategory("");
setBookingService("");
setShowBooking(true);
}

function closeBooking() {
setShowBooking(false);
setSelectedService(null);
}

return (
<main>

  {/* LIVE BACKGROUND */}

  <div className="live-background">
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
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

    <button
      type="button"
      className="nav-button"
      onClick={openGeneralBooking}
    >
      Book a Service
    </button>

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

        <button
          type="button"
          className="primary-button"
          onClick={openGeneralBooking}
        >
          Book a Service
        </button>

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
      electronics, solar, ICT, networking,
      refrigeration, air conditioning,
      plumbing, welding and technology
      solutions for homes, businesses
      and institutions.
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
        available services and pricing.
      </p>

    </div>

    <div className="service-grid">

      {serviceGroups.map(
        (group) => (

          <button
            type="button"
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

        )
      )}

    </div>

  </section>

  {/* SERVICE MODAL */}

  {selectedGroup && (

    <div className="modal-overlay">

      <div className="service-modal">

        <button
          type="button"
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
                type="button"
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

  {/* BOOKING MODAL */}

  {showBooking && (

    <div className="modal-overlay">

      <div className="booking-modal">

        <button
          type="button"
          className="close-button"
          onClick={closeBooking}
        >
          ×
        </button>

        <BookingForm
          initialService={
            bookingCategory
          }
          initialSpecificService={
            bookingService
          }
          onClose={
            closeBooking
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
      Contact Dr Doi Technologies
      for electrical, electronics,
      solar, networking, refrigeration,
      air conditioning and technology
      services.
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
      ©{" "}
      {new Date().getFullYear()}{" "}
      Dr Doi Technologies.
      All rights reserved.
    </p>

  </footer>

</main>

);
 }
