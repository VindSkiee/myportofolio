import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import BackToServices from "@/components/services/BackToService";


// Service data with comprehensive details for Midtrans verification
const servicesData = {
  "backend-development": {
    title: "Backend Development",
    subtitle: "Scalable & Secure Server-Side Solutions",
    price: "Rp 5.000.000",
    priceNote: "Mulai dari",
    description:
      "Build robust, high-performance backend systems designed to handle enterprise-grade workloads. Our backend development service covers everything from RESTful APIs to complex microservices architecture, ensuring your application can scale seamlessly as your business grows.",
    techStack: [
      { name: "Node.js", color: "bg-green-500/20 text-green-400 border-green-500/30" },
      { name: "Express", color: "bg-gray-500/20 text-gray-300 border-gray-500/30" },
      { name: "NestJS", color: "bg-red-500/20 text-red-400 border-red-500/30" },
      { name: "Go", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
      { name: "PostgreSQL", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
      { name: "Redis", color: "bg-red-600/20 text-red-400 border-red-600/30" },
      { name: "Docker", color: "bg-blue-600/20 text-blue-400 border-blue-600/30" },
    ],
    benefits: [
      "High concurrency handling for thousands of simultaneous requests",
      "Secure authentication & authorization (JWT/OAuth2)",
      "Automated CI/CD pipelines for seamless deployments",
      "Database optimization & query performance tuning",
      "Horizontal scaling architecture ready",
      "Real-time monitoring & logging integration",
    ],
    deliverables: [
      "API Documentation (Swagger/OpenAPI)",
      "ERD Diagram & Database Schema",
      "Clean Architecture Source Code",
      "Unit & Integration Test Suite",
      "Deployment Configuration (Docker/K8s)",
      "3 Months Bug Fixing Support",
    ],
    process: [
      { step: 1, title: "Requirement Analysis", desc: "Understanding your business logic and technical requirements" },
      { step: 2, title: "System Design", desc: "Architecture planning, database design, and API specification" },
      { step: 3, title: "Development", desc: "Iterative development with regular progress updates" },
      { step: 4, title: "Testing & QA", desc: "Comprehensive testing to ensure reliability and security" },
      { step: 5, title: "Deployment", desc: "Production deployment with monitoring setup" },
    ],
  },
  "web-application": {
    title: "Web Application",
    subtitle: "Full-Stack Modern Web Solutions",
    price: "Rp 8.000.000",
    priceNote: "Mulai dari",
    description:
      "Create stunning, high-performance web applications using the latest technologies. From landing pages to complex enterprise dashboards, we deliver pixel-perfect implementations with exceptional user experience and SEO optimization built-in.",
    techStack: [
      { name: "Next.js", color: "bg-white/20 text-white border-white/30" },
      { name: "React", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
      { name: "NestJS", color: "bg-red-500/20 text-red-400 border-red-500/30" },
      { name: "Express", color: "bg-gray-500/20 text-gray-300 border-gray-500/30" },
      { name: "TypeScript", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
      { name: "Tailwind CSS", color: "bg-teal-500/20 text-teal-400 border-teal-500/30" },
      { name: "Framer Motion", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
      { name: "WebSocket", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
    ],
    benefits: [
      "High concurrency handling with optimized server rendering",
      "Secure authentication & authorization (JWT/OAuth2)",
      "Automated CI/CD pipelines for continuous deployment",
      "SEO Optimized (SSR/ISR) for better search rankings",
      "Mobile First Design for all screen sizes",
      "PWA capabilities for offline functionality",
      "Real-time features with WebSocket integration",
    ],
    deliverables: [
      "API Documentation (Swagger/OpenAPI)",
      "ERD Diagram & Database Schema",
      "Clean Architecture Source Code",
      "Figma Design to Code Implementation",
      "Admin Dashboard with Analytics",
      "Google Analytics Integration",
      "Performance Optimization Report",
      "3 Months Bug Fixing Support",
    ],
    process: [
      { step: 1, title: "Discovery & Planning", desc: "Understanding goals, target audience, and feature requirements" },
      { step: 2, title: "UI/UX Design", desc: "Wireframes, prototypes, and design system creation" },
      { step: 3, title: "Frontend Development", desc: "Building responsive, accessible interfaces" },
      { step: 4, title: "Backend Integration", desc: "API development and database setup" },
      { step: 5, title: "Testing & Launch", desc: "QA testing, optimization, and production deployment" },
    ],
  },
  "api-integration": {
    title: "API Integration",
    subtitle: "Seamless Third-Party Connections",
    price: "Rp 3.000.000",
    priceNote: "Mulai dari",
    description:
      "Connect your systems with external services effortlessly. Whether it's payment gateways, shipping providers, CRM systems, or custom APIs, we ensure secure, reliable integrations that work flawlessly with your existing infrastructure.",
    techStack: [
      { name: "Axios", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
      { name: "GraphQL", color: "bg-pink-500/20 text-pink-400 border-pink-500/30" },
      { name: "Webhooks", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
      { name: "gRPC", color: "bg-green-500/20 text-green-400 border-green-500/30" },
    ],
    benefits: [
      "Real-time data synchronization between systems",
      "Comprehensive error handling & logging",
      "Secure credential management (encrypted secrets)",
      "Rate limiting & retry mechanism",
      "Webhook validation & processing",
      "API versioning support",
    ],
    deliverables: [
      "Postman Collection (API Testing)",
      "Integration Test Scripts",
      "Error Handling Documentation",
      "Webhook Setup & Configuration",
      "Monitoring Dashboard Integration",
      "1 Month Bug Fixing Support",
    ],
    process: [
      { step: 1, title: "API Analysis", desc: "Reviewing third-party API documentation and requirements" },
      { step: 2, title: "Integration Design", desc: "Planning data flow and error handling strategies" },
      { step: 3, title: "Implementation", desc: "Building secure, reliable API connections" },
      { step: 4, title: "Testing", desc: "End-to-end testing with real API endpoints" },
      { step: 5, title: "Deployment & Monitoring", desc: "Production setup with alerting configuration" },
    ],
  },
};

type ServiceSlug = keyof typeof servicesData;

export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData[slug as ServiceSlug];
  if (!service) return { title: "Service Not Found" };
  
  return {
    title: `${service.title} - Vind's Development Services`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesData[slug as ServiceSlug];

  if (!service) {
    notFound();
  }

  const whatsappNumber = "6281317099362";
  const whatsappMessage = encodeURIComponent(
    `Halo, saya tertarik dengan layanan ${service.title}. Boleh konsultasi lebih lanjut?`
  );

  return (
    <main className="min-h-screen bg-black">
      {/* Background */}
      <div className="fixed inset-0 z-0 h-full w-full bg-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="fixed left-1/2 top-0 -translate-x-1/2 -z-10 h-[600px] w-[600px] rounded-full bg-[#008cff] opacity-5 blur-[150px]"></div>

      <div className="relative z-10 container mx-auto px-6 py-12 md:py-20">
        {/* Back Navigation */}
        <BackToServices />


        {/* Header Section */}
        <div className="mb-12">
          <span className="text-[#008cff] font-mono text-sm tracking-widest uppercase mb-2 block">
            // Service Details
          </span>
          <h1 className="font-jakarta text-3xl md:text-5xl font-bold text-white mb-2">
            {service.title}
          </h1>
          <p className="text-white/50 text-lg mb-6">{service.subtitle}</p>
          
          {/* Price Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-zinc-900 border border-white/10">
            <span className="text-white/40 text-sm">{service.priceNote}</span>
            <span className="text-2xl md:text-3xl font-bold text-[#008cff]">{service.price}</span>
            <span className="text-white/40 text-sm">IDR</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="p-6 md:p-8 rounded-2xl bg-zinc-900/50 border border-white/10">
              <h2 className="font-jakarta text-xl font-semibold text-white mb-4">
                About This Service
              </h2>
              <p className="text-white/60 leading-relaxed">{service.description}</p>
            </div>

            {/* Tech Stack */}
            <div className="p-6 md:p-8 rounded-2xl bg-zinc-900/50 border border-white/10">
              <h2 className="font-jakarta text-xl font-semibold text-white mb-6">
                Technology Stack
              </h2>
              <div className="flex flex-wrap gap-3">
                {service.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border ${tech.color}`}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="p-6 md:p-8 rounded-2xl bg-zinc-900/50 border border-white/10">
              <h2 className="font-jakarta text-xl font-semibold text-white mb-6">
                Key Benefits
              </h2>
              <ul className="space-y-4">
                {service.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-white/60">
                    <svg
                      className="w-5 h-5 text-[#008cff] flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Process/Workflow */}
            <div className="p-6 md:p-8 rounded-2xl bg-zinc-900/50 border border-white/10">
              <h2 className="font-jakarta text-xl font-semibold text-white mb-6">
                Development Process
              </h2>
              <div className="space-y-4">
                {service.process.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#008cff]/10 border border-[#008cff]/30 flex items-center justify-center">
                      <span className="text-[#008cff] font-mono font-bold text-sm">{item.step}</span>
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">{item.title}</h3>
                      <p className="text-white/50 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Info */}
            <div className="p-6 md:p-8 rounded-2xl bg-[#008cff]/5 border border-[#008cff]/20">
              <h2 className="font-jakarta text-xl font-semibold text-[#008cff] mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Payment Information
              </h2>
              <ul className="space-y-2 text-white/60 text-sm mb-4">
                <li>• All prices in IDR (Rupiah)</li>
                <li>• 50% Down Payment to start</li>
                <li>• Payment via Midtrans / Bank Transfer</li>
              </ul>
              <Link
                href="/terms"
                className="inline-flex items-center gap-1 text-[#008cff]/70 text-sm hover:text-[#008cff] transition-colors"
              >
                Read Terms & Refund Policy
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-6">
            {/* Deliverables */}
            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10 sticky top-6">
              <h2 className="font-jakarta text-xl font-semibold text-white mb-6">
                What You Get
              </h2>
              <ul className="space-y-3 mb-8">
                {service.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-white/60 text-sm">
                    <svg
                      className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              {/* CTA Section */}
              <div className="border-t border-white/10 pt-6">
                <p className="text-white/40 text-xs mb-4 text-center">
                  Ready to start your project?
                </p>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-xl bg-[#008cff] text-white font-semibold text-center hover:bg-[#0070cc] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Book via WhatsApp
                </a>

                <p className="text-white/30 text-xs mt-4 text-center">
                  Or email: m.arvind.alaric@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
