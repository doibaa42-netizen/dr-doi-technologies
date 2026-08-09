import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link className="brand" href="#home">
        <img src="/images/logo.svg" alt="Dr Doi Technologies" />
      </Link>

      <div className="nav-links">
        <Link href="#home">Home</Link>
        <Link href="#about">About</Link>
        <Link href="#services">Services</Link>
        <Link href="#gallery">Gallery</Link>
        <Link href="#contact">Contact</Link>
      </div>

      <div className="nav-phone">
        <a href="tel:+254740568226">☎</a>
        <span>0740 568 226<br />0114 280 995</span>
      </div>
    </nav>
  );
}
