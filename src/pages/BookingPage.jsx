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
      <header className="fixed inset-x-0 top-0 z-50 bg-white shadow supports-[backdrop-filter]:bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-3 mb-25">
          {/* Left: brand pill (fixed, no wrap) */}
          <div className="bg-black px-[17px] py-[12px] rounded-md flex-none">
            <h1
              className="whitespace-nowrap leading-none text-white font-extrabold uppercase tracking-tight
                     text-[clamp(22px,6vw,56px)]"
            >
              Spin Cleaners
            </h1>
          </div>

          {/* Right: hours (shrinks if needed) */}
          <div className="min-w-0 flex-1 text-right">
            <div className="text-[11px] sm:text-sm text-gray-600 leading-tight inline-block text-left">
              <p>Open:</p>
              <p>Mon–Fri, 7:00 AM – 6:00 PM</p>
              <p>Sat, 9:00 AM – 2:00 PM</p>
              <p>Sun, Closed</p>
            </div>
          </div>
        </div>
      </header>

      {/* Title */}
      <div className="px-4 sm:px-6 mt-20">
        <h2 className="text-3xl sm:text-4xl font-black uppercase text-center">
          Our Services
        </h2>
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
          <ServiceCard
            img={drycleaning}
            imgAlt="Dry Cleaning"
            category="Service"
            title="Dry Cleaning"
            description="Professional dry cleaning for all types of clothing."
          />
          <ServiceCard
            img={laundry}
            imgAlt="Laundry Wash & Fold"
            category="Service"
            title="Laundry Wash & Fold"
            description="Quick and easy laundry — wash, dry, and fold."
          />
          <ServiceCard
            img={carpet}
            imgAlt="Area Rugs"
            category="Service"
            title="Area Rugs"
            description="Delicate rug care with stain and odor removal."
          />
          <ServiceCard
            img={comforters}
            imgAlt="Comforters"
            category="Service"
            title="Comforters"
            description="Special care for comforters and bulky bedding."
          />
          <ServiceCard
            img={alteration}
            imgAlt="Alteration"
            category="Service"
            title="Alteration"
            description="Tailoring, hemming, resizing, and repairs."
          />
        </div>
      </div>

      {/* App Download Section */}
      <section className="bg-white mt-8 py-6 px-4 sm:px-6 text-center">
        <h3 className="text-xl font-semibold mb-4">Book Online with Our App</h3>
        <p className="mb-4 text-gray-600">
          Download the CleanCloud app and select “Spin Cleaners Acton” to
          schedule your pickup & delivery anytime.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://apps.apple.com/us/app/cleancloud/id1031182499"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="Download on the App Store"
              className="h-12"
            />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.cleancloudapp.cleancloud&pli=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              className="h-12"
            />
          </a>
        </div>
      </section>
      <footer className="mt-10 bg-white text-gray-100 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          {/* Heading */}
          <h2 className="text-center text-2xl text-black sm:text-3xl font-extrabold tracking-tight">
            Contact Us
          </h2>

          {/* Grid */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: NAP + CTAs */}
            <div className="bg-gray-800 rounded-2xl p-6 shadow">
              <ul className="space-y-3 text-sm sm:text-base">
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-1 text-sky-400 shrink-0" />
                  <a
                    href="https://maps.app.goo.gl/TfLsZ7tWCGAYK78G8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    2890 Acton Rd, Birmingham, AL 35243
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <FaPhoneAlt className="mt-1 text-sky-400 shrink-0" />
                  <a href="tel:+12053588754" className="hover:underline">
                    (205) 358-8754
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <FaEnvelope className="mt-1 text-sky-400 shrink-0" />
                  <a
                    href="mailto:spincleaners@gmail.com"
                    className="hover:underline"
                  >
                    spincleaners@gmail.com
                  </a>
                </li>
              </ul>

              {/* CTA buttons */}
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="tel:+12053588754"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold"
                >
                  Call Now
                </a>
                <a
                  href="https://maps.app.goo.gl/TfLsZ7tWCGAYK78G8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-white text-gray-900 font-semibold hover:bg-gray-100"
                >
                  Get Directions
                </a>
                <a
                  href="mailto:spincleaners@gmail.com"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-semibold"
                >
                  Email Us
                </a>
              </div>
            </div>

            {/* Right: FAQs */}
            <section className="bg-gray-800 rounded-2xl p-6 shadow">
              <h3 className="text-lg sm:text-xl font-bold mb-4">FAQs</h3>
              <div className="space-y-4 text-sm sm:text-base">
                <div>
                  <p className="font-semibold">
                    Do you offer pickup & delivery?
                  </p>
                  <p className="text-gray-300">
                    Yes, schedule pickup & delivery through the CleanCloud app
                    any time.
                  </p>
                </div>
                <div>
                  <p className="font-semibold">
                    What are your turnaround times?
                  </p>
                  <p className="text-gray-300">
                    Most dry cleaning is ready next business day; same-day is
                    available for early drop-offs.
                  </p>
                </div>
                <div>
                  <p className="font-semibold">
                    Do you clean comforters and area rugs?
                  </p>
                  <p className="text-gray-300">
                    Yes, we specialize in bulky items including comforters and
                    rugs.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 border-t border-gray-700 pt-4 text-center text-xs sm:text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Spin Cleaners. All rights
            reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function ServiceCard({ img, imgAlt, category, title, description }) {
  return (
    <div className="flex-shrink-0 w-[270px] sm:w-72 md:w-80 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden">
      <img
        src={img}
        alt={imgAlt}
        className="w-full h-40 sm:h-44 md:h-48 object-cover"
      />
      <div className="p-4">
        <div className="text-[10px] sm:text-xs font-bold text-sky-500 uppercase tracking-wide">
          {category}
        </div>
        <div className="mt-1 text-base sm:text-lg font-bold text-gray-800">
          {title}
        </div>
        <p className="mt-2 text-xs sm:text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
