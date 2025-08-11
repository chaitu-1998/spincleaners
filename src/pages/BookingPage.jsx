import React, { useRef, useEffect, useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import drycleaning from "../images/drycleaning.jpeg";
import laundry from "../images/laundry.jpeg";
import carpet from "../images/carpet.jpeg";
import comforters from "../images/Comforter.jpeg";
import alteration from "../images/alteration.jpeg";

export default function BookingPage() {
  const scrollRef = useRef(null);
  const rafRef = useRef(null);
  const directionRef = useRef(1); // 1 => right, -1 => left
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return; // respect accessibility setting

    const speed = 0.6; // px per frame (~60fps). Adjust for faster/slower.
    const tick = () => {
      if (!paused) {
        el.scrollLeft += speed * directionRef.current;
        const max = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft <= 0) directionRef.current = 1;
        if (el.scrollLeft >= max) directionRef.current = -1;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    // Pause when tab is hidden (saves CPU/battery)
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [paused]);

  return (
    <div className="min-h-screen w-full bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow px-4 sm:px-6 py-4 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-gray-900 text-center sm:text-left">
            Spin Cleaners
          </h1>
          <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-right leading-tight">
            <p>Open:</p>
            <p>Mon–Fri, 7:00 AM – 6:00 PM</p>
            <p>Sat, 9:00 AM – 2:00 PM</p>
            <p>Sun, Closed</p>
          </div>
        </div>
      </header>

      {/* Title */}
      <div className="px-4 sm:px-6 mt-6">
        <h2 className="text-3xl sm:text-4xl font-black uppercase text-center">Our Services</h2>
        <p className="text-center text-gray-600 mt-2">
          Professional care for garments, rugs, and more.
        </p>
      </div>

      {/* Edge-to-edge auto-scrolling carousel */}
      <div
        className="-mx-4 px-4 sm:mx-0 sm:px-6 mt-4"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 sm:gap-6 scroll-hide"
        >
          <ServiceCard img={drycleaning} imgAlt="Dry Cleaning" category="Service" title="Dry Cleaning" description="Professional dry cleaning for all types of clothing." />
          <ServiceCard img={laundry} imgAlt="Laundry Wash & Fold" category="Service" title="Laundry Wash & Fold" description="Quick and easy laundry — wash, dry, and fold." />
          <ServiceCard img={carpet} imgAlt="Area Rugs" category="Service" title="Area Rugs" description="Delicate rug care with stain and odor removal." />
          <ServiceCard img={comforters} imgAlt="Comforters" category="Service" title="Comforters" description="Special care for comforters and bulky bedding." />
          <ServiceCard img={alteration} imgAlt="Alteration" category="Service" title="Alteration" description="Tailoring, hemming, resizing, and repairs." />
        </div>
      </div>

      {/* App Download Section */}
      <section className="bg-white mt-8 py-6 px-4 sm:px-6 text-center">
        <h3 className="text-xl font-semibold mb-4">Book Online with Our App</h3>
        <p className="mb-4 text-gray-600">
          Download the CleanCloud app and select “Spin Cleaners Acton” to schedule your pickup & delivery anytime.
        </p>
        <div className="flex justify-center gap-4">
          <a href="https://apps.apple.com/us/app/cleancloud/id1031182499" target="_blank" rel="noopener noreferrer">
            <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on the App Store" className="h-12" />
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.cleancloudapp.cleancloud&pli=1" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-12" />
          </a>
        </div>
      </section>
      <footer className="bg-white shadow px-4 sm:px-6 py-4 sticky top-0 z-20">
          <h1 className="text-xl font-bold uppercase text-center">Contact Us</h1>
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left" style={{ textAlign: "left" }}>
  <p className="flex items-center gap-2">
    <FaMapMarkerAlt className="text-sky-500" />
    <a href="https://maps.app.goo.gl/TfLsZ7tWCGAYK78G8" target="_blank" rel="noopener noreferrer">
      2890 Acton Rd, Birmingham, AL 35243
    </a>
  </p>
  <p className="flex items-center gap-2 mt-1">
    <FaPhoneAlt className="text-sky-500" />
    <a href="tel:+12053588754">(205) 358-8754</a>
  </p>
  <p className="flex items-center gap-2 mt-1">
    <FaEnvelope className="text-sky-500" />
    <a href="mailto:spincleaners@gmail.com">spincleaners@gmail.com</a>
  </p>
</div>
          <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-right" style={{ textAlign: "right" }}>
            &copy; {new Date().getFullYear()} Spin Cleaners. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function ServiceCard({ img, imgAlt, category, title, description }) {
  return (
    <div className="flex-shrink-0 w-[270px] sm:w-72 md:w-80 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden">
      <img src={img} alt={imgAlt} className="w-full h-40 sm:h-44 md:h-48 object-cover" />
      <div className="p-4">
        <div className="text-[10px] sm:text-xs font-bold text-sky-500 uppercase tracking-wide">{category}</div>
        <div className="mt-1 text-base sm:text-lg font-bold text-gray-800">{title}</div>
        <p className="mt-2 text-xs sm:text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}