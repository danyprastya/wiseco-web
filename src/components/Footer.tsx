import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaLinkedinIn, FaYoutube, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#2D2D2D] text-white">
      {/* Mobile Layout */}
      <div
        className="sm:hidden p-[20px]"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        {/* Logo - centered */}
        <div className="flex justify-center">
          <div className="relative w-[100px] h-[27px]">
            <Image
              src="/images/wiseco-logo-putih.png"
              alt="wiseco.id"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Pages title - 10px below, left aligned */}
        <h3 className="text-[16px] font-bold mt-[10px] text-left">Pages</h3>

        {/* Menu grid - two columns - 10px below */}
        <div className="flex mt-[10px] gap-[20px]">
          {/* Left column - Home and submenus */}
          <div className="text-[10px] leading-[1.6]">
            <p className="font-bold">
              <Link href="/" className="hover:text-[#D79C60] transition-colors">
                Home
              </Link>
            </p>
            <p className="pl-2 font-medium">
              <Link
                href="/#portfolio"
                className="hover:text-[#D79C60] transition-colors"
              >
                Portofolio
              </Link>
            </p>
            <p className="pl-2 font-medium">
              <Link
                href="/#services"
                className="hover:text-[#D79C60] transition-colors"
              >
                Services
              </Link>
            </p>
            <p className="pl-2 font-medium">
              <Link
                href="/#projects"
                className="hover:text-[#D79C60] transition-colors"
              >
                Projects
              </Link>
            </p>
            <p className="pl-2 font-medium">
              <Link
                href="/#events"
                className="hover:text-[#D79C60] transition-colors"
              >
                Events
              </Link>
            </p>
            <p className="pl-2 font-medium">
              <Link
                href="/#testimonies"
                className="hover:text-[#D79C60] transition-colors"
              >
                Testimonies
              </Link>
            </p>
            <p className="pl-2 font-medium">
              <Link
                href="/#videos"
                className="hover:text-[#D79C60] transition-colors"
              >
                Videos
              </Link>
            </p>
            <p className="pl-2 font-medium">
              <Link
                href="/#strategic-partners"
                className="hover:text-[#D79C60] transition-colors"
              >
                Strategic Partners
              </Link>
            </p>
            <p className="pl-2 font-medium">
              <Link
                href="/contact"
                className="hover:text-[#D79C60] transition-colors"
              >
                Contact
              </Link>
            </p>
          </div>

          {/* Right column - About Us, Services, Book Online, Contact */}
          <div className="text-[10px] leading-[1.6]">
            <p className="font-bold">
              <Link
                href="/aboutus"
                className="hover:text-[#D79C60] transition-colors"
              >
                About Us
              </Link>
            </p>
            <p className="pl-2 font-medium">
              <Link
                href="/aboutus#vision-mission"
                className="hover:text-[#D79C60] transition-colors"
              >
                Vision & Mission
              </Link>
            </p>
            <p className="pl-2 font-medium">
              <Link
                href="/aboutus#founders"
                className="hover:text-[#D79C60] transition-colors"
              >
                Founders
              </Link>
            </p>
            <p className="pl-2 font-medium">
              <Link
                href="/aboutus#virtual-c-level"
                className="hover:text-[#D79C60] transition-colors"
              >
                Virtual C-Level
              </Link>
            </p>
            <p className="pl-2 font-medium">
              <Link
                href="/aboutus#wisecosystem"
                className="hover:text-[#D79C60] transition-colors"
              >
                wisecosystem
              </Link>
            </p>
            <p className="font-bold mt-1">
              <Link
                href="/#services"
                className="hover:text-[#D79C60] transition-colors"
              >
                Service
              </Link>
            </p>
            <p className="pl-2 font-medium">
              <Link
                href="/wisevisory"
                className="hover:text-[#D79C60] transition-colors"
              >
                wisevisory
              </Link>
            </p>
            <p className="pl-2 font-medium">
              <Link
                href="/wisecubation"
                className="hover:text-[#D79C60] transition-colors"
              >
                wisecubation
              </Link>
            </p>
            <p className="font-bold mt-1">
              <Link
                href="/book-online"
                className="hover:text-[#D79C60] transition-colors"
              >
                Book Online
              </Link>
            </p>
            <p className="font-bold mt-1">
              <Link
                href="/contact"
                className="hover:text-[#D79C60] transition-colors"
              >
                Contact
              </Link>
            </p>
          </div>
        </div>

        {/* Tagline - 10px below, left aligned, 14px font */}
        <p className="text-[14px] leading-[1.4] mt-[10px] text-left">
          <span className="font-bold text-[#D79C60]">
            As a business and investment advisor
          </span>
          <br />
          <span className="text-white">
            we resolve the basics, prepare for growth and build investable
            business
          </span>
        </p>

        {/* Get in Touch - 10px below, 16px font */}
        <h3 className="text-[16px] font-bold mt-[10px] text-left">
          Get in Touch
        </h3>

        {/* Address - 10px below, 12px font */}
        <div className="mt-[10px] text-left">
          <p className="text-[12px] font-bold text-[#D79C60]">
            wiseco.id Headquarter
          </p>
          <p className="text-[12px] font-bold text-[#D79C60] mb-1">_________</p>
          <p className="text-[12px] font-medium leading-[1.6]">
            Jalan Bintaro Utara No. 14,
            <br />
            Bintaro, Pesanggrahan,
            <br />
            Jakarta Selatan
          </p>
        </div>

        {/* Buttons - 10px below, 160x42px, vertical stack, gap 10px, centered */}
        <div className="flex flex-col items-center gap-[10px] mt-[10px]">
          <Link
            href="https://wa.me/+6281299981708"
            target="_blank"
            className="flex items-center justify-center gap-2 w-[160px] h-[42px] bg-[#D79C60] text-[#333333] rounded-[500px] font-bold text-[14px]"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Ask wise
          </Link>
          <Link
            href="https://advisory.wiseco.id/"
            target="_blank"
            className="flex items-center justify-center w-[160px] h-[42px] bg-white text-[#2D2D2D] rounded-[500px] font-bold text-[14px]"
          >
            Advisory Now!
          </Link>
        </div>

        {/* Email section - 20px below, centered */}
        <div className="flex flex-col items-center mt-[20px]">
          <svg
            className="w-[26px] h-[26px] text-[#D79C60]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
          <Link
            href="mailto:info@wiseco.id"
            className="text-[16px] font-bold hover:text-[#D79C60] transition-colors mt-1"
          >
            info@wiseco.id
          </Link>
        </div>

        {/* Social Media - 10px below, centered, 25x25px each */}
        <div className="flex items-center justify-center gap-3 mt-[10px]">
          <Link
            href="https://www.instagram.com/wiseco.id/"
            target="_blank"
            className="w-[25px] h-[25px] rounded-full bg-white flex items-center justify-center hover:bg-[#D79C60] transition-colors"
          >
            <FaInstagram className="w-[14px] h-[14px] text-[#2D2D2D]" />
          </Link>
          <Link
            href="https://www.linkedin.com/company/wisecoindonesia"
            target="_blank"
            className="w-[25px] h-[25px] rounded-full bg-white flex items-center justify-center hover:bg-[#D79C60] transition-colors"
          >
            <FaLinkedinIn className="w-[14px] h-[14px] text-[#2D2D2D]" />
          </Link>
          <Link
            href="https://www.youtube.com/@wisecoid"
            target="_blank"
            className="w-[25px] h-[25px] rounded-full bg-white flex items-center justify-center hover:bg-[#D79C60] transition-colors"
          >
            <FaYoutube className="w-[14px] h-[14px] text-[#2D2D2D]" />
          </Link>
          <Link
            href="https://www.tiktok.com/@wiseco.id"
            target="_blank"
            className="w-[25px] h-[25px] rounded-full bg-white flex items-center justify-center hover:bg-[#D79C60] transition-colors"
          >
            <FaTiktok className="w-[14px] h-[14px] text-[#2D2D2D]" />
          </Link>
        </div>

        {/* Copyright - 20px below, left aligned, 11px font */}
        <div className="mt-[20px] text-[11px] text-[#D79C60] font-medium text-left">
          <p>Copyright © 2025</p>
          <p className="mt-1">wiseco.id | GROW YOUR BUSINESS WISELY</p>
          <p className="mt-1">All rights reserved</p>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:block max-w-7xl mx-auto px-6 md:px-8 py-8 md:py-10 lg:py-12 xl:py-16">
        <div className="flex flex-row justify-center gap-[35px] md:gap-[50px] lg:gap-[80px] xl:gap-[150px]">
          {/* Section 1 - Company Info (Left) */}
          <div className="flex flex-col justify-between">
            {/* Top Content */}
            <div>
              {/* Logo */}
              <div className="relative w-[100px] h-[28px] md:w-[115px] md:h-[32px] lg:w-[130px] lg:h-[36px] xl:w-[150px] xl:h-[42px]">
                <Image
                  src="/images/wiseco-logo-putih.png"
                  alt="wiseco.id"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Tagline - 35px below logo */}
              <div
                className="mt-[20px] md:mt-[25px] lg:mt-[30px] xl:mt-[35px] w-[180px] md:w-[200px] lg:w-[235px] xl:w-[269px] h-auto"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                <p className="text-[13px] md:text-[15px] lg:text-[18px] xl:text-[22px] leading-[1.4]">
                  <span className="font-bold text-[#D79C60]">
                    As a business and investment advisor
                  </span>
                  <br />
                  <span className="text-white">
                    we resolve the basics, prepare for growth and build
                    investable business
                  </span>
                </p>
              </div>
            </div>

            {/* Copyright */}
            <div
              className="mt-[120px] md:mt-[160px] lg:mt-[220px] xl:mt-[300px] text-[8px] md:text-[9px] lg:text-[9px] xl:text-[10px] text-[#D79C60] font-medium"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              <p>Copyright © 2025</p>
              <p className="mt-1">wiseco.id | GROW YOUR BUSINESS WISELY</p>
              <p className="mt-1">All rights reserved</p>
            </div>
          </div>

          {/* Section 2 - Pages (Middle) */}
          <div style={{ fontFamily: "Montserrat, sans-serif" }}>
            <h3 className="text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] font-bold mb-[20px] md:mb-[25px] lg:mb-[30px] xl:mb-[35px]">
              Pages
            </h3>
            <div className="text-[9px] md:text-[10px] lg:text-[11px] xl:text-[13px] leading-[1.5]">
              {/* Home */}
              <p className="font-bold">
                <Link
                  href="/"
                  className="hover:text-[#D79C60] transition-colors"
                >
                  Home
                </Link>
              </p>
              <p className="pl-4 font-medium">
                <Link
                  href="/#portfolio"
                  className="hover:text-[#D79C60] transition-colors"
                >
                  Portofolio
                </Link>
              </p>
              <p className="pl-4 font-medium">
                <Link
                  href="/#services"
                  className="hover:text-[#D79C60] transition-colors"
                >
                  Services
                </Link>
              </p>
              <p className="pl-4 font-medium">
                <Link
                  href="/#projects"
                  className="hover:text-[#D79C60] transition-colors"
                >
                  Projects
                </Link>
              </p>
              <p className="pl-4 font-medium">
                <Link
                  href="/#events"
                  className="hover:text-[#D79C60] transition-colors"
                >
                  Events
                </Link>
              </p>
              <p className="pl-4 font-medium">
                <Link
                  href="/#testimonies"
                  className="hover:text-[#D79C60] transition-colors"
                >
                  Testimonies
                </Link>
              </p>
              <p className="pl-4 font-medium">
                <Link
                  href="/#videos"
                  className="hover:text-[#D79C60] transition-colors"
                >
                  Videos
                </Link>
              </p>
              <p className="pl-4 font-medium">
                <Link
                  href="/#strategic-partners"
                  className="hover:text-[#D79C60] transition-colors"
                >
                  Strategic Partners
                </Link>
              </p>
              <p className="pl-4 font-medium">
                <Link
                  href="/contact"
                  className="hover:text-[#D79C60] transition-colors"
                >
                  Contact
                </Link>
              </p>

              {/* About Us */}
              <p className="font-bold mt-1">
                <Link
                  href="/aboutus"
                  className="hover:text-[#D79C60] transition-colors"
                >
                  About Us
                </Link>
              </p>
              <p className="pl-4 font-medium">
                <Link
                  href="/aboutus#vision-mission"
                  className="hover:text-[#D79C60] transition-colors"
                >
                  Vision & Mission
                </Link>
              </p>
              <p className="pl-4 font-medium">
                <Link
                  href="/aboutus#founders"
                  className="hover:text-[#D79C60] transition-colors"
                >
                  Founders
                </Link>
              </p>
              <p className="pl-4 font-medium">
                <Link
                  href="/aboutus#virtual-c-level"
                  className="hover:text-[#D79C60] transition-colors"
                >
                  Virtual C-Level
                </Link>
              </p>
              <p className="pl-4 font-medium">
                <Link
                  href="/aboutus#wisecosystem"
                  className="hover:text-[#D79C60] transition-colors"
                >
                  wisecosystem
                </Link>
              </p>

              {/* Service */}
              <p className="font-bold mt-1">
                <Link
                  href="/#services"
                  className="hover:text-[#D79C60] transition-colors"
                >
                  Service
                </Link>
              </p>
              <p className="pl-4 font-medium">
                <Link
                  href="/wisevisory"
                  className="hover:text-[#D79C60] transition-colors"
                >
                  wisevisory
                </Link>
              </p>
              <p className="pl-4 font-medium">
                <Link
                  href="/wisecubation"
                  className="hover:text-[#D79C60] transition-colors"
                >
                  wisecubation
                </Link>
              </p>

              {/* Book Online */}
              <p className="font-bold mt-1">
                <Link
                  href="/book-online"
                  className="hover:text-[#D79C60] transition-colors"
                >
                  Book Online
                </Link>
              </p>

              {/* Contact */}
              <p className="font-bold mt-1">
                <Link
                  href="/contact"
                  className="hover:text-[#D79C60] transition-colors"
                >
                  Contact
                </Link>
              </p>
            </div>
          </div>

          {/* Section 3 - Get in Touch (Right) */}
          <div style={{ fontFamily: "Montserrat, sans-serif" }}>
            <h3 className="text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] font-bold mb-[20px] md:mb-[25px] lg:mb-[30px] xl:mb-[35px]">
              Get in Touch
            </h3>

            {/* Address */}
            <div className="mb-[30px] md:mb-[40px] lg:mb-[50px] xl:mb-[60px]">
              <p className="text-[12px] md:text-[13px] lg:text-[14px] xl:text-[16px] font-bold text-[#D79C60]">
                wiseco.id Headquarter
              </p>
              <p className="text-[12px] md:text-[13px] lg:text-[14px] xl:text-[16px] font-bold text-[#D79C60] mb-2">
                _________
              </p>
              <p className="text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px] font-medium leading-[1.6]">
                Jalan Bintaro Utara No. 14,
                <br />
                Bintaro, Pesanggrahan,
                <br />
                Jakarta Selatan
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col">
              <Link
                href="https://wa.me/+6281299981708"
                target="_blank"
                className="flex items-center justify-center gap-2 w-[130px] md:w-[145px] lg:w-[158px] xl:w-[170px] h-[36px] md:h-[38px] lg:h-[42px] xl:h-[45px] bg-[#D79C60] text-[#333333] rounded-[500px] hover:bg-white hover:text-[#2D2D2D] transition-all font-bold text-[10px] md:text-[10px] lg:text-[11px] xl:text-[12px]"
              >
                <svg
                  className="w-3 h-3 md:w-[14px] md:h-[14px] lg:w-[16px] lg:h-[16px] xl:w-5 xl:h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Ask wise
              </Link>

              <Link
                href="https://advisory.wiseco.id/"
                target="_blank"
                className="flex items-center justify-center w-[130px] md:w-[145px] lg:w-[158px] xl:w-[170px] h-[36px] md:h-[38px] lg:h-[42px] xl:h-[45px] bg-white text-[#2D2D2D] rounded-[500px] hover:bg-[#D79C60] hover:text-[#333333] transition-all mt-[30px] md:mt-[38px] lg:mt-[48px] xl:mt-[60px] font-bold text-[10px] md:text-[10px] lg:text-[11px] xl:text-[12px]"
              >
                Advisory Now!
              </Link>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2 mt-[60px] md:mt-[80px] lg:mt-[100px] xl:mt-[120px]">
              <svg
                className="w-[18px] h-[18px] md:w-[20px] md:h-[20px] lg:w-[23px] lg:h-[23px] xl:w-[26px] xl:h-[26px] text-[#D79C60]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <Link
                href="mailto:info@wiseco.id"
                className="text-[12px] md:text-[13px] lg:text-[14px] xl:text-[16px] font-bold hover:text-[#D79C60] transition-colors"
              >
                info@wiseco.id
              </Link>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3 mt-[15px]">
              <Link
                href="https://www.instagram.com/wiseco.id/"
                target="_blank"
                className="w-[18px] h-[18px] md:w-[20px] md:h-[20px] lg:w-[22px] lg:h-[22px] xl:w-[25px] xl:h-[25px] rounded-full bg-white flex items-center justify-center hover:bg-[#D79C60] transition-colors"
              >
                <FaInstagram className="w-[10px] h-[10px] md:w-[11px] md:h-[11px] lg:w-[12px] lg:h-[12px] xl:w-[14px] xl:h-[14px] text-[#2D2D2D]" />
              </Link>
              <Link
                href="https://www.linkedin.com/company/wisecoindonesia"
                target="_blank"
                className="w-[18px] h-[18px] md:w-[20px] md:h-[20px] lg:w-[22px] lg:h-[22px] xl:w-[25px] xl:h-[25px] rounded-full bg-white flex items-center justify-center hover:bg-[#D79C60] transition-colors"
              >
                <FaLinkedinIn className="w-[10px] h-[10px] md:w-[11px] md:h-[11px] lg:w-[12px] lg:h-[12px] xl:w-[14px] xl:h-[14px] text-[#2D2D2D]" />
              </Link>
              <Link
                href="https://www.youtube.com/@wisecoid"
                target="_blank"
                className="w-[18px] h-[18px] md:w-[20px] md:h-[20px] lg:w-[22px] lg:h-[22px] xl:w-[25px] xl:h-[25px] rounded-full bg-white flex items-center justify-center hover:bg-[#D79C60] transition-colors"
              >
                <FaYoutube className="w-[10px] h-[10px] md:w-[11px] md:h-[11px] lg:w-[12px] lg:h-[12px] xl:w-[14px] xl:h-[14px] text-[#2D2D2D]" />
              </Link>
              <Link
                href="https://www.tiktok.com/@wiseco.id"
                target="_blank"
                className="w-[18px] h-[18px] md:w-[20px] md:h-[20px] lg:w-[22px] lg:h-[22px] xl:w-[25px] xl:h-[25px] rounded-full bg-white flex items-center justify-center hover:bg-[#D79C60] transition-colors"
              >
                <FaTiktok className="w-[10px] h-[10px] md:w-[11px] md:h-[11px] lg:w-[12px] lg:h-[12px] xl:w-[14px] xl:h-[14px] text-[#2D2D2D]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
