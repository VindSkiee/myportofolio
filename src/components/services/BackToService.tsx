"use client"

import { useRouter } from "next/navigation"

export default function BackToServices() {
  const router = useRouter()

  const handleBack = () => {
    router.push("/?scroll=services")
  }

  return (
    <button
      onClick={handleBack}
      className="inline-flex items-center gap-2 text-white/50 hover:text-[#008cff] transition-colors mb-8"
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
    </button>
  )
}
