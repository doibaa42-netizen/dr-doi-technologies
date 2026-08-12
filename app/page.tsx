"use client";

import { useState } from "react";

import BookingForm from 
"@/app/components/BookingForm";

import Navbar from 
"@/app/components/Navbar";
type Service = {
  name: string;
  image: string;
  description: string;
  details: string[];
};

type ServiceGroup = {
  name: string;
  icon: string;
  description: string;
  services: Service[];
};

const serviceGroups: ServiceGroup[] = [
  {
    name: "Electrical Services",
    icon: "⚡",
    description:
      "Professional electrical installation, repair, maintenance and troubleshooting.",
    services: [
      {
        name: "House Wiring",
        image: "/images/services/house-wiring.jpg",
        description:
          "Complete electrical wiring for homes, apartments, offices and buildings.",
        details: [
          "New electrical installations",
          "Rewiring",
          "Lighting installation",
          "Socket installation",
          "Distribution board installation",
        ],
      },
      {
        name: "Electrical Troubleshooting",
        image: "/images/services/troubleshooting.jpg",
        description:
          "Diagnosis and repair of electrical faults and power problems.",
        details: [
          "Power failure diagnosis",
          "Short-circuit detection",
          "Breaker tripping",
          "Fault finding",
          "Socket and switch faults",
        ],
      },
      {
        name: "Electrical Repairs",
        image: "/images/services/electrical-repair.jpg",
        description:
          "Repair and replacement of damaged electrical components.",
        details: [
          "Socket repairs",
          "Switch replacement",
          "MCB replacement",
          "Fuse replacement",
          "Distribution board repairs",
        ],
      },
      {
        name: "Lighting Installation",
        image: "/images/services/lighting.jpg",
        description:
          "Indoor, outdoor, security and decorative lighting installation.",
        details: [
          "LED lighting",
          "Security lights",
          "Outdoor lighting",
          "Motion sensor lights",
          "Decorative lighting",
        ],
      },
      {
        name: "Earthing & Safety",
        image: "/images/services/earthing.jpg",
        description:
          "Electrical earthing, testing and safety improvements.",
        details: [
          "Earthing installation",
          "Earth resistance testing",
          "Safety inspection",
          "Surge protection",
          "Equipment protection",
        ],
      },
      {
        name: "Generator & Backup Power",
        image: "/images/services/generator.jpg",
        description:
          "Generator connections and backup power solutions.",
        details: [
          "Generator connection",
          "Changeover installation",
          "Backup wiring",
          "Fault diagnosis",
          "Maintenance",
        ],
      },
    ],
  },

  {
    name: "Air Conditioning & Refrigeration",
    icon: "❄️",
    description:
      "Air conditioner, refrigerator, freezer and cooling-system services.",
    services: [
      {
        name: "Air Conditioner Installation",
        image: "/images/services/air-conditioner.jpg",
        description:
          "Professional installation of domestic and commercial air conditioners.",
        details: [
          "Split AC installation",
          "Indoor unit installation",
          "Outdoor unit installation",
          "Electrical connection",
          "System testing",
        ],
      },
      {
        name: "Air Conditioner Repair",
        image: "/images/services/air-conditioner-repair.jpg",
        description:
          "Diagnosis and repair of air conditioning problems.",
        details: [
          "AC not cooling",
          "Electrical faults",
          "Control board faults",
          "Fan problems",
          "Routine servicing",
        ],
      },
      {
        name: "AC Servicing",
        image: "/images/services/ac-servicing.jpg",
        description:
          "Professional cleaning, inspection and maintenance of AC systems.",
        details: [
          "Filter cleaning",
          "Coil cleaning",
          "Electrical inspection",
          "Performance testing",
          "Preventive maintenance",
        ],
      },
      {
        name: "Refrigerator Repair",
        image: "/images/services/refrigerator.jpg",
        description:
          "Repair and troubleshooting of refrigerators and freezers.",
        details: [
          "Fridge not cooling",
          "Electrical faults",
          "Thermostat problems",
          "Compressor faults",
          "Control system diagnosis",
        ],
      },
      {
        name: "Freezer Repair",
        image: "/images/services/freezer.jpg",
        description:
          "Diagnosis and repair of domestic and commercial freezers.",
        details: [
          "Cooling problems",
          "Electrical diagnosis",
          "Thermostat replacement",
          "Control faults",
          "Maintenance",
        ],
      },
      {
        name: "Cold Room Services",
        image: "/images/services/cold-room.jpg",
        description:
          "Maintenance and troubleshooting of commercial refrigeration systems.",
        details: [
          "Cold room diagnosis",
          "Electrical faults",
          "Temperature problems",
          "Controller troubleshooting",
          "Preventive maintenance",
        ],
      },
    ],
  },

  {
    name: "Solar Energy",
    icon: "☀️",
    description:
      "Solar power, solar water heating and backup-energy solutions.",
    services: [
      {
        name: "Solar Panel Installation",
        image: "/images/services/solar-installation.jpg",
        description:
          "Professional installation and setup of solar PV systems.",
        details: [
          "Solar panel installation",
          "System sizing",
          "Panel positioning",
          "Solar wiring",
          "System testing",
        ],
      },
      {
        name: "Solar Water Heater",
        image: "/images/services/solar-water-heater.jpg",
        description:
          "Installation, repair and maintenance of solar water heaters.",
        details: [
          "Solar water heater installation",
          "Pipe connection",
          "Controller installation",
          "Fault diagnosis",
          "Maintenance",
        ],
      },
      {
        name: "Solar Inverter",
        image: "/images/services/solar-inverter.jpg",
        description:
          "Installation and troubleshooting of solar inverter systems.",
        details: [
          "Inverter installation",
          "Configuration",
          "Battery connection",
          "Fault diagnosis",
          "System testing",
        ],
      },
      {
        name: "Solar Batteries",
        image: "/images/services/solar-battery.jpg",
        description:
          "Solar battery installation, testing and backup solutions.",
        details: [
          "Battery sizing",
          "Battery installation",
          "Battery testing",
          "Cable inspection",
          "Backup solutions",
        ],
      },
      {
        name: "Solar Maintenance",
        image: "/images/services/solar-maintenance.jpg",
        description:
          "Inspection and maintenance of existing solar systems.",
        details: [
          "Panel inspection",
          "Cable inspection",
          "Battery testing",
          "Inverter inspection",
          "Performance testing",
        ],
      },
    ],
  },

  {
    name: "Electronics & Appliances",
    icon: "🔧",
    description:
      "Repair and troubleshooting of electronics and household appliances.",
    services: [
      {
        name: "TV Repair",
        image: "/images/services/tv-repair.jpg",
        description:
          "Diagnosis and repair of television electrical and electronic faults.",
        details: [
          "TV power faults",
          "Display problems",
          "Backlight problems",
          "Power supply faults",
          "Board diagnosis",
        ],
      },
      {
        name: "Washing Machine Repair",
        image: "/images/services/washing-machine.jpg",
        description:
          "Repair and troubleshooting of washing machines.",
        details: [
          "Power problems",
          "Motor faults",
          "Control board faults",
          "Sensor problems",
          "Drainage problems",
        ],
      },
      {
        name: "Microwave Repair",
        image: "/images/services/microwave.jpg",
        description:
          "Diagnosis and repair of microwave electrical faults.",
        details: [
          "Power failure",
          "Heating problems",
          "Control faults",
          "Door-switch faults",
          "General diagnosis",
        ],
      },
      {
        name: "Electric Cooker & Oven",
        image: "/images/services/electric-cooker.jpg",
        description:
          "Repair and installation of electric cookers and ovens.",
        details: [
          "Heating faults",
          "Element replacement",
          "Thermostat problems",
          "Electrical faults",
          "Installation",
        ],
      },
      {
        name: "Water Dispenser",
        image: "/images/services/water-dispenser.jpg",
        description:
          "Repair and troubleshooting of water dispensers.",
        details: [
          "Power faults",
          "Heating problems",
          "Cooling problems",
          "Thermostat faults",
          "General servicing",
        ],
      },
      {
        name: "Electronics Repair",
        image: "/images/services/electronics-repair.jpg",
        description:
          "Professional diagnosis and repair of electronic equipment.",
        details: [
          "PCB diagnosis",
          "Power supply repair",
          "Component testing",
          "Circuit troubleshooting",
          "Electronic fault finding",
        ],
      },
    ],
  },

  {
    name: "Networking & ICT",
    icon: "🌐",
    description:
      "Computer, Wi-Fi, Ethernet, internet and networking services.",
    services: [
      {
        name: "Wi-Fi Installation",
        image: "/images/services/wifi.jpg",
        description:
          "Professional Wi-Fi installation and configuration.",
        details: [
          "Router installation",
          "Wi-Fi configuration",
          "Coverage improvement",
          "Password configuration",
          "Network troubleshooting",
        ],
      },
      {
        name: "Ethernet Networking",
        image: "/images/services/ethernet.jpg",
        description:
          "Structured Ethernet cabling and LAN installation.",
        details: [
          "LAN cabling",
          "RJ45 termination",
          "Network testing",
          "Switch installation",
          "Office networking",
        ],
      },
      {
        name: "Computer Repair",
        image: "/images/services/computer-repair.jpg",
        description:
          "Computer troubleshooting, repair and software installation.",
        details: [
          "Computer diagnosis",
          "Windows installation",
          "Software installation",
          "System optimization",
          "Hardware troubleshooting",
        ],
      },
      {
        name: "Laptop Repair",
        image: "/images/services/laptop-repair.jpg",
        description:
          "Laptop troubleshooting, maintenance and repair.",
        details: [
          "Operating system problems",
          "Slow laptop diagnosis",
          "Hardware diagnosis",
          "Software installation",
          "System maintenance",
        ],
      },
      {
        name: "Printer Services",
        image: "/images/services/printer.jpg",
        description:
          "Printer installation, configuration and troubleshooting.",
        details: [
          "Printer setup",
          "Driver installation",
          "Network printer setup",
          "Printing problems",
          "Troubleshooting",
        ],
      },
      {
        name: "Network Troubleshooting",
        image: "/images/services/network-troubleshooting.jpg",
        description:
          "Diagnosis and repair of internet and network problems.",
        details: [
          "Internet connection problems",
          "Router troubleshooting",
          "Network configuration",
          "Slow network diagnosis",
          "Network optimization",
        ],
      },
    ],
  },

  {
    name: "CCTV & Security",
    icon: "📹",
    description:
      "CCTV, surveillance, access control and security systems.",
    services: [
      {
        name: "CCTV Installation",
        image: "/images/services/cctv.jpg",
        description:
          "Professional CCTV camera installation and configuration.",
        details: [
          "Camera installation",
          "DVR/NVR installation",
          "Camera positioning",
          "Cable installation",
          "System testing",
        ],
      },
      {
        name: "CCTV Repair",
        image: "/images/services/cctv-repair.jpg",
        description:
          "Troubleshooting and repair of CCTV surveillance systems.",
        details: [
          "Camera faults",
          "No display",
          "Recording problems",
          "Power problems",
          "DVR/NVR diagnosis",
        ],
      },
      {
        name: "Access Control",
        image: "/images/services/access-control.jpg",
        description:
          "Electronic access control installation and configuration.",
        details: [
          "Electronic locks",
          "Keypad systems",
          "Card access",
          "Access controllers",
          "System configuration",
        ],
      },
      {
        name: "Security Lighting",
        image: "/images/services/security-lighting.jpg",
        description:
          "Installation of security and outdoor lighting systems.",
        details: [
          "Security floodlights",
          "Motion sensor lights",
          "Outdoor lighting",
          "Automatic lighting",
          "Maintenance",
        ],
      },
    ],
  },

  {
    name: "Smart Technology & Automation",
    icon: "💻",
    description:
      "IoT, smart-home, automation and energy-monitoring solutions.",
    services: [
      {
        name: "Smart Home Systems",
        image: "/images/services/smart-home.jpg",
        description:
          "Smart automation solutions for homes and businesses.",
        details: [
          "Smart lighting",
          "Smart switches",
          "Remote control",
          "Smart plugs",
          "Home automation",
        ],
      },
      {
        name: "IoT Solutions",
        image: "/images/services/iot.jpg",
        description:
          "Internet of Things systems for monitoring and automation.",
        details: [
          "IoT devices",
          "Sensors",
          "Remote monitoring",
          "Data collection",
          "Automation",
        ],
      },
      {
        name: "Energy Monitoring",
        image: "/images/services/energy-monitoring.jpg",
        description:
          "Electrical energy monitoring and consumption analysis.",
        details: [
          "Power measurement",
          "Energy monitoring",
          "Load monitoring",
          "Overload monitoring",
          "Energy-saving assessment",
        ],
      },
      {
        name: "Automation Systems",
        image: "/images/services/automation.jpg",
        description:
          "Electrical and electronic automation solutions.",
        details: [
          "Automatic switching",
          "Relay control",
          "Sensor systems",
          "Motor control",
          "Custom automation",
        ],
      },
    ],
  },

  {
    name: "Industrial Services",
    icon: "⚙️",
    description:
      "Industrial electrical maintenance, motors and control systems.",
    services: [
      {
        name: "Motor Troubleshooting",
        image: "/images/services/motors.jpg",
        description:
          "Diagnosis and troubleshooting of electrical motors.",
        details: [
          "Motor fault diagnosis",
          "Winding inspection",
          "Starting problems",
          "Overload problems",
          "Motor control",
        ],
      },
      {
        name: "Control Panel Wiring",
        image: "/images/services/control-panel.jpg",
        description:
          "Electrical control panel wiring and troubleshooting.",
        details: [
          "Control panel wiring",
          "Contactor installation",
          "Relay installation",
          "Protection devices",
          "Testing",
        ],
      },
      {
        name: "Industrial Maintenance",
        image: "/images/services/industrial-maintenance.jpg",
        description:
          "Preventive and corrective electrical maintenance.",
        details: [
          "Equipment inspection",
          "Fault diagnosis",
          "Electrical maintenance",
          "Motor maintenance",
          "Safety inspection",
        ],
      },
      {
        name: "Electrical Automation",
        image: "/images/services/industrial-automation.jpg",
        description:
          "Industrial automation and control solutions.",
        details: [
          "Motor control",
          "Sensors",
          "Relays",
          "Contactors",
          "Automation troubleshooting",
        ],
      },
    ],
  },
];

export default function Home() {
  const [selectedGroup, setSelectedGroup] =
    useState<ServiceGroup | null>(null);

  const [selectedService, setSelectedService] =
    useState<Service | null>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

const [bookingCategory, setBookingCategory] =
  useState("");

const [bookingSpecificService, setBookingSpecificService] =
  useState("");
function openBooking(
  category: string,
  specificService: string
) {
  const categoryMap: Record<string, string> = {
    "Electrical Services": "Electrical Services",
    "Air Conditioning & Refrigeration": "Air Conditioning",
    "Solar Energy": "Solar Solutions",
    "Electronics & Appliances": "Electronics",
    "Networking & ICT": "Networking & Wi-Fi",
    "CCTV & Security": "CCTV & Security",
    "Smart Technology & Automation": "General Troubleshooting",
    "Industrial Services": "Electrical Services",
  };

  let mappedCategory =
    categoryMap[category] || "General Troubleshooting";

  // Correctly separate AC from refrigeration
  if (
    category === "Air Conditioning & Refrigeration"
  ) {
    if (
      specificService.toLowerCase().includes("refrigerator") ||
      specificService.toLowerCase().includes("freezer") ||
      specificService.toLowerCase().includes("cold room") ||
      specificService.toLowerCase().includes("refrigeration")
    ) {
      mappedCategory = "Refrigeration";
    } else {
      mappedCategory = "Air Conditioning";
    }
  }

  setBookingCategory(mappedCategory);
  setBookingSpecificService(specificService);
  setBookingOpen(true);
}
  const whatsappNumber = "254114280995";

  function bookService(
  category: string,
  specificService: string = ""
) {
  setBookingCategory(category);
  setBookingSpecificService(specificService);
  setBookingOpen(true);
}

  function showServices() {
    document
      .getElementById("services")
      ?.scrollIntoView({ behavior: "smooth" });

    setMenuOpen(false);
  }

  return (
    <main className="site">

      {/* NAVIGATION */}

      <nav className="navbar">
        <div className="nav-inner">

          <button
            className="logo-button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            <img
              src="/images/logo.svg"
              alt="Dr Doi Technologies"
              className="logo"
            />
          </button>

          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <div
            className={`nav-links ${
              menuOpen ? "open" : ""
            }`}
          >
            <button
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
                setMenuOpen(false);
              }}
            >
              Home
            </button>

            <button
              onClick={() => {
                document
                  .getElementById("about")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
                setMenuOpen(false);
              }}
            >
              About
            </button>

            <button onClick={showServices}>
              Services
            </button>

            <button
              onClick={() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
                setMenuOpen(false);
              }}
            >
              Contact
            </button>

            <button
              className="nav-book"
              onClick={() =>
  bookService(
    selectedGroup?.name || "General Troubleshooting",
    selectedService?.name || ""
  )
}
            >
              Book Now
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}

      <section className="hero">
        <div className="hero-content">

          <div className="eyebrow">
            DR DOI TECHNOLOGIES
          </div>

          <h1>
            Professional Electrical &
            Technology Solutions
          </h1>

          <p>
            Reliable electrical, electronics, solar,
            refrigeration, air conditioning, ICT,
            networking, CCTV and automation services.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() =>
                bookService("a general service")
              }
            >
              Book a Service
            </button>

            <button
              className="secondary-btn"
              onClick={showServices}
            >
              Explore Services
            </button>

          </div>
        </div>
      </section>

      {/* ABOUT */}

      <section
        className="section about"
        id="about"
      >
        <div className="eyebrow">
          ABOUT US
        </div>

        <h2>
          Complete technical solutions
          under one roof.
        </h2>

        <p>
          Dr Doi Technologies provides
          professional technical services for
          homes, businesses and institutions.
          We focus on reliable installations,
          repairs, maintenance and modern
          technology solutions.
        </p>
      </section>

      {/* SERVICES */}

      <section
        className="section"
        id="services"
      >
        <div className="eyebrow">
          OUR SERVICES
        </div>

        <h2>
          What can we help you with?
        </h2>

        <p className="section-intro">
          Select a service category below to
          view the available services.
        </p>

        {!selectedGroup && (
          <div className="groups">

            {serviceGroups.map((group) => (
              <button
                key={group.name}
                className="group-card"
                onClick={() => {
                  setSelectedGroup(group);
                  setSelectedService(null);
                }}
              >
                <span className="group-icon">
                  {group.icon}
                </span>

                <h3>
                  {group.name}
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
        )}

        {selectedGroup && (
          <div className="service-area">

            <button
              className="back-button"
              onClick={() => {
                setSelectedGroup(null);
                setSelectedService(null);
              }}
            >
              ← Back to Categories
            </button>

            <h2 className="category-title">
              {selectedGroup.icon}{" "}
              {selectedGroup.name}
            </h2>

            <p className="section-intro">
              Select a service below to view
              details and book the service.
            </p>

            <div className="service-grid">

              {selectedGroup.services.map(
                (service) => (
                  <button
                    key={service.name}
                    className="service-card"
                    onClick={() =>
                      setSelectedService(service)
                    }
                  >

                    <img
                      src={service.image}
                      alt={service.name}
                      className="service-image"
                    />

                    <div className="service-card-content">

                      <h3>
                        {service.name}
                      </h3>

                      <p>
                        {service.description}
                      </p>

                      <span>
                        View Details →
                      </span>

                    </div>

                  </button>
                )
              )}

            </div>

            {/* SERVICE DETAILS */}

            {selectedService && (
              <div className="service-details">

                <img
                  src={selectedService.image}
                  alt={selectedService.name}
                />

                <div className="service-details-content">

                  <div className="eyebrow">
                    SERVICE DETAILS
                  </div>

                  <h2>
                    {selectedService.name}
                  </h2>

                  <p>
                    {selectedService.description}
                  </p>

                  <h3>
                    Services included
                  </h3>

                  <ul>
                    {selectedService.details.map(
                      (detail) => (
                        <li key={detail}>
                          {detail}
                        </li>
                      )
                    )}
                  </ul>

                  <button
                    className="primary-btn"
                    onClick={() =>
                      bookService(
                        selectedService.name
                      )
                    }
                  >
                    Book This Service
                  </button>

                </div>
              </div>
            )}

          </div>
        )}

      </section>

      {/* CONTACT / BOOKING */}

      <section
        className="booking"
        id="contact"
      >
        <div className="booking-content">

          <div className="eyebrow">
            NEED OUR SERVICES?
          </div>

          <h2>
            Let's solve your technical problem.
          </h2>

          <p>
            Contact Dr Doi Technologies today
            for professional electrical,
            electronics, solar, refrigeration,
            ICT and technology services.
          </p>

          <button
            className="booking-button"
            onClick={() =>
              bookService("a general service")
            }
          >
            Book Through WhatsApp
          </button>

        </div>
      </section>

      {/* FOOTER */}

      <footer className="footer">

        <h3>
          DR DOI TECHNOLOGIES
        </h3>

        <p>
          Electrical • Electronics • Solar •
          Refrigeration • ICT • Security •
          Automation
        </p>

        <p>
          Nakuru, Kenya
        </p>

        <p>
          © {new Date().getFullYear()} Dr Doi Technologies.
          All rights reserved.
        </p>
 </footer>
      {bookingOpen && (
  <div className="booking-overlay">
    <div className="booking-modal">

      <button
        type="button"
        className="booking-close"
        onClick={() => setBookingOpen(false)}
        aria-label="Close booking"
      >
        ×
      </button>

      <BookingForm
        initialService={bookingCategory}
        initialSpecificService={bookingSpecificService}
        onClose={() => setBookingOpen(false)}
      />

    </div>
  </div>
)}

 </main>
);
}
      
