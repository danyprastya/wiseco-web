"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  // Helper function to check if a path is active
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        // Scrolling up or at top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling down
        setIsVisible(false);
        setActiveDropdown(null); // Close dropdown when scrolling down
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 bg-white shadow-sm z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{ height: "80px" }}
    >
      {/* Navbar Content with Padding */}
      <div className="relative w-full h-full container-padding flex items-center justify-between">
        {/* Logo - Left */}
        <Link href="/" className="flex items-center z-10">
          <div className="relative" style={{ width: "150px", height: "42px" }}>
            <Image
              src="/images/Logo wise.png"
              alt="wiseco.id"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation - Absolute Center */}
        <nav className="hidden lg:flex items-center gap-20 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* Home with Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("home")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              href="/"
              className={`${
                isActive("/") ? "text-[#D79C60]" : "text-[#333333]"
              } hover:text-[#D79C60] transition-colors font-bold text-[14px] whitespace-nowrap`}
            >
              Home
            </Link>
            {activeDropdown === "home" && (
              <div
                className="absolute left-1/2 -translate-x-1/2 bg-white z-50 flex flex-col"
                style={{
                  top: "calc(100%)",
                  paddingTop: "18px",
                  paddingBottom: "16px",
                  borderRadius: "8px",
                  gap: "4px",
                }}
              >
                <Link
                  href="/portfolio"
                  className="block text-[#333333] hover:text-[#D79C60] text-[14px] font-bold text-center whitespace-nowrap"
                  style={{
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}
                >
                  Portfolio
                </Link>
                <Link
                  href="/services"
                  className="block text-[#333333] hover:text-[#D79C60] text-[14px] font-bold text-center whitespace-nowrap"
                  style={{
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}
                >
                  Services
                </Link>
                <Link
                  href="/projects"
                  className="block text-[#333333] hover:text-[#D79C60] text-[14px] font-bold text-center whitespace-nowrap"
                  style={{
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}
                >
                  Projects
                </Link>
                <Link
                  href="/events"
                  className="block text-[#333333] hover:text-[#D79C60] text-[14px] font-bold text-center whitespace-nowrap"
                  style={{
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}
                >
                  Events
                </Link>
                <Link
                  href="/testimonies"
                  className="block text-[#333333] hover:text-[#D79C60] text-[14px] font-bold text-center whitespace-nowrap"
                  style={{
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}
                >
                  Testimonies
                </Link>
                <Link
                  href="/videos"
                  className="block text-[#333333] hover:text-[#D79C60] text-[14px] font-bold text-center whitespace-nowrap"
                  style={{
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}
                >
                  Videos
                </Link>
                <Link
                  href="/strategic-partners"
                  className="block text-[#333333] hover:text-[#D79C60] text-[14px] font-bold text-center whitespace-nowrap"
                  style={{
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}
                >
                  Strategic Partners
                </Link>
                <Link
                  href="/contact"
                  className="block text-[#333333] hover:text-[#D79C60] text-[14px] font-bold text-center whitespace-nowrap"
                  style={{
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}
                >
                  Contact
                </Link>
              </div>
            )}
          </div>

          {/* About Us with Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("about")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              href="/aboutus"
              className={`${
                isActive("/aboutus") ? "text-[#D79C60]" : "text-[#333333]"
              } hover:text-[#D79C60] transition-colors font-bold text-[14px] whitespace-nowrap`}
            >
              About Us
            </Link>
            {activeDropdown === "about" && (
              <div
                className="absolute left-1/2 -translate-x-1/2 bg-white z-50 flex flex-col"
                style={{
                  top: "calc(100%)",
                  paddingTop: "16px",
                  paddingBottom: "16px",
                  borderRadius: "8px",
                  gap: "4px",
                }}
              >
                <Link
                  href="/aboutus#vision-mission"
                  className="block text-[#333333] hover:text-[#D79C60] text-[14px] font-bold text-center whitespace-nowrap"
                  style={{
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}
                >
                  Vision & Mission
                </Link>
                <Link
                  href="/aboutus#founders"
                  className="block text-[#333333] hover:text-[#D79C60] text-[14px] font-bold text-center whitespace-nowrap"
                  style={{
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}
                >
                  Founders
                </Link>
                <Link
                  href="/aboutus#virtual-c-level"
                  className="block text-[#333333] hover:text-[#D79C60] text-[14px] font-bold text-center whitespace-nowrap"
                  style={{
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}
                >
                  Virtual C-Level
                </Link>
                <Link
                  href="/aboutus#wisecosystem"
                  className="block text-[#333333] hover:text-[#D79C60] text-[14px] font-bold text-center whitespace-nowrap"
                  style={{
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}
                >
                  wisecosystem
                </Link>
              </div>
            )}
          </div>

          {/* Services with Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("services")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              href="/#services"
              className={`${
                isActive("/wisevisory") || isActive("/wisecubation")
                  ? "text-[#D79C60]"
                  : "text-[#333333]"
              } hover:text-[#D79C60] transition-colors font-bold text-[14px] whitespace-nowrap`}
            >
              Services
            </Link>
            {activeDropdown === "services" && (
              <div
                className="absolute left-1/2 -translate-x-1/2 bg-white z-50 flex flex-col"
                style={{
                  top: "calc(100%)",
                  paddingTop: "16px",
                  paddingBottom: "16px",
                  borderRadius: "8px",
                  gap: "4px",
                }}
              >
                <Link
                  href="/wisevisory"
                  className="block text-[#333333] hover:text-[#D79C60] text-[14px] font-bold text-center whitespace-nowrap"
                  style={{
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}
                >
                  wisevisory
                </Link>
                <Link
                  href="/wisecubation"
                  className="block text-[#333333] hover:text-[#D79C60] text-[14px] font-bold text-center whitespace-nowrap"
                  style={{
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}
                >
                  wisecubation
                </Link>
              </div>
            )}
          </div>

          {/* Book Online - No Dropdown */}
          <Link
            href="/book-online"
            className={`${
              isActive("/book-online") ? "text-[#D79C60]" : "text-[#333333]"
            } hover:text-[#D79C60] transition-colors font-bold text-[14px] whitespace-nowrap`}
          >
            Book Online
          </Link>

          {/* Contact - No Dropdown */}
          <Link
            href="/contact"
            className={`${
              isActive("/contact") ? "text-[#D79C60]" : "text-[#333333]"
            } hover:text-[#D79C60] transition-colors font-bold text-[14px] whitespace-nowrap`}
          >
            Contact
          </Link>
        </nav>

        {/* Ask wise Button - Right */}
        <Link
          href="https://wa.me/+6281299981708"
          target="_blank"
          className="hidden lg:flex bg-[#2D2D2D] text-[#D79C60] hover:bg-[#D79C60] hover:text-[#2D2D2D] transition-all items-center justify-center gap-2 font-medium text-[12px] z-10"
          style={{
            width: "120px",
            height: "32px",
            borderRadius: "500px",
          }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Ask wise
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-[#333333]"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-white shadow-lg border-t">
          <nav className="flex flex-col p-4 gap-4">
            <Link
              href="/"
              className={`${
                isActive("/") ? "text-[#D79C60]" : "text-[#333333]"
              } hover:text-[#D79C60] transition-colors font-bold text-[14px]`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/aboutus"
              className={`${
                isActive("/aboutus") ? "text-[#D79C60]" : "text-[#333333]"
              } hover:text-[#D79C60] transition-colors font-bold text-[14px]`}
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/#services"
              className={`${
                isActive("/wisevisory") || isActive("/wisecubation")
                  ? "text-[#D79C60]"
                  : "text-[#333333]"
              } hover:text-[#D79C60] transition-colors font-bold text-[14px]`}
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/portfolio"
              className={`${
                isActive("/portfolio") ? "text-[#D79C60]" : "text-[#333333]"
              } hover:text-[#D79C60] transition-colors font-bold text-[14px]`}
              onClick={() => setIsMenuOpen(false)}
            >
              Portfolio
            </Link>
            <Link
              href="/projects"
              className={`${
                isActive("/projects") ? "text-[#D79C60]" : "text-[#333333]"
              } hover:text-[#D79C60] transition-colors font-bold text-[14px]`}
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="/events"
              className={`${
                isActive("/events") ? "text-[#D79C60]" : "text-[#333333]"
              } hover:text-[#D79C60] transition-colors font-bold text-[14px]`}
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            <Link
              href="/testimonies"
              className={`${
                isActive("/testimonies") ? "text-[#D79C60]" : "text-[#333333]"
              } hover:text-[#D79C60] transition-colors font-bold text-[14px]`}
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonies
            </Link>
            <Link
              href="/contact"
              className={`${
                isActive("/contact") ? "text-[#D79C60]" : "text-[#333333]"
              } hover:text-[#D79C60] transition-colors font-bold text-[14px]`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="https://wa.me/+6281299981708"
              target="_blank"
              className="bg-[#2D2D2D] text-[#D79C60] hover:bg-[#D79C60] hover:text-[#2D2D2D] transition-all flex items-center justify-center gap-2 font-medium text-[12px] py-2"
              style={{ borderRadius: "500px" }}
              onClick={() => setIsMenuOpen(false)}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Ask wise
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
