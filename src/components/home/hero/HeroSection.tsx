import React from "react";
import BackendPanel from "./BackendPanel";
import FrontendPanel from "./FrontendPanel";
import FullstackPanel from "./FullstackPanel";

export default function HeroSection() {
  return (
    <section className="h-screen w-full flex flex-col">
      {/* Top Half - Split into Backend and Frontend */}
      <div className="h-1/2 flex flex-col md:flex-row">
        {/* Backend Panel - Left Side */}
        <div className="flex-1">
          <BackendPanel />
        </div>
        
        {/* Frontend Panel - Right Side */}
        <div className="flex-1">
          <FrontendPanel />
        </div>
      </div>

      {/* Bottom Half - Fullstack */}
      <div className="h-1/2">
        <FullstackPanel />
      </div>
    </section>
  );
}
