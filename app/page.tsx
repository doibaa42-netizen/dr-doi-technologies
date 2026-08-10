import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-content">
            <p className="hero-tag">PROFESSIONAL TECHNOLOGY SERVICES</p>

            <h1>
              Smart Electrical &amp; Technology Solutions
            </h1>

            <p className="hero-text">
              Reliable electrical, electronics, solar, networking and
              technology services in Nakuru and beyond.
            </p>

            <div className="hero-buttons">
              <a href="#contact" className="primary-button">
                Book a Service
              </a>

              <a href="#services" className="secondary-button">
                Our Services
              </a>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section">
          <div className="section-content">
            <p className="section-tag">ABOUT US</p>

            <h2>Dr Doi Technologies</h2>

            <p>
              We provide professional and affordable electrical,
              electronics, solar and technology solutions for homes,
              businesses and institutions.
            </p>

            <p>
              Our goal is to deliver reliable workmanship, practical
              solutions and excellent customer service.
            </p>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="section services-section">
          <div className="section-content">
            <p className="section-tag">WHAT WE DO</p>

            <h2>Our Services</h2>

            <div className="services-grid">
              <div className="service-card">
                <h3>Electrical Services</h3>
                <p>
                  Electrical installation, maintenance, troubleshooting
                  and repair services.
                </p>
              </div>

              <div className="service-card">
                <h3>Solar Solutions</h3>
                <p>
                  Solar installation, maintenance and energy solutions
                  for homes and businesses.
                </p>
              </div>

              <div className="service-card">
                <h3>Electronics Repair</h3>
                <p>
                  Diagnosis, repair and maintenance of electronic
                  equipment and systems.
                </p>
              </div>

              <div className="service-card">
                <h3>Networking</h3>
                <p>
                  Wi-Fi, Ethernet and network installation and
                  troubleshooting.
                </p>
              </div>

              <div className="service-card">
                <h3>Smart Technology</h3>
                <p>
                  IoT, automation and smart technology solutions for
                  modern homes and businesses.
                </p>
              </div>

              <div className="service-card">
                <h3>Technical Support</h3>
                <p>
                  Professional technical consultation, troubleshooting
                  and system support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="contact-section">
          <div className="section-content">
            <p className="section-tag">GET IN TOUCH</p>

            <h2>Need a Professional Solution?</h2>

            <p>
              Contact Dr Doi Technologies for reliable electrical,
              solar, electronics and technology services.
            </p>

            <div className="contact-details">
              <p>
                <strong>Phone:</strong> 0740 568 226
              </p>

              <p>
                <strong>Phone:</strong> 0114 280 995
              </p>

              <p>
                <strong>Email:</strong> drdoitechnologies@gmail.com
              </p>

              <p>
                <strong>Location:</strong> Nakuru, Kenya
              </p>
            </div>

            <a
              href="https://wa.me/254740568226"
              className="whatsapp-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          © {new Date().getFullYear()} Dr Doi Technologies. All rights
          reserved.
        </p>
      </footer>
    </>
  );
      }
