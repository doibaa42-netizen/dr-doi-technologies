"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href="/" className="nav-logo">
          <img
            src="/images/logo.svg"
            alt="Dr Doi Technologies"
            className="logo-image"
          />
        </Link>

        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/#about">About</Link>
          <Link href="/#services">Services</Link>
          <Link href="/#contact">Contact</Link>
        </div>

        <Link href="/#contact" className="nav-button">
          Book a Service
        </Link>
      </div>
    </nav>
  );
}
