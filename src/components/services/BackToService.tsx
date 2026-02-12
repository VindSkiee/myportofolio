"use client";

export default function BackToServices() {
  const handleBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Use window.location for reliable navigation with hash
    window.location.href = "/#services";
  };

  return (
    <a
      href="/#services"
      onClick={handleBack}
      className="inline-flex items-center gap-2 text-white/50 hover:text-[#008cff] transition-colors mb-8 cursor-pointer"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      Back to Services
    </a>
  );
}
