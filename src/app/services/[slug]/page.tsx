import { notFound } from "next/navigation";
import { Metadata } from "next";
import ServiceDetailClient, {
  type ServiceData,
} from "@/components/services/ServiceDetailClient";

// ---------------------------------------------------------------------------
//  Service data – enriched with hero visuals, tech descriptions & FAQ
// ---------------------------------------------------------------------------
const servicesData: Record<string, ServiceData> = {
  "backend-development": {
    title: "Backend Development",
    subtitle: "Scalable & Secure Server-Side Solutions",
    price: "Rp 5.000.000",
    priceNote: "Mulai dari",
    heroGradient:
      "bg-gradient-to-br from-green-900/40 via-zinc-900 to-blue-900/30 border border-white/[0.06]",
    heroEmoji: "⚙️",
    description:
      "Build robust, high-performance backend systems designed to handle enterprise-grade workloads. Our backend development service covers everything from RESTful APIs to complex microservices architecture, ensuring your application can scale seamlessly as your business grows.",
    techStack: [
      { name: "Node.js", desc: "Runtime" },
      { name: "Express", desc: "HTTP Framework" },
      { name: "NestJS", desc: "Enterprise Framework" },
      { name: "Go", desc: "High-perf services" },
      { name: "PostgreSQL", desc: "Relational DB" },
      { name: "Redis", desc: "Cache & Queue" },
      { name: "Docker", desc: "Containerisation" },
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
    faq: [
      { q: "How long does a typical backend project take?", a: "Most backend projects are delivered within 4–8 weeks depending on complexity. We provide a detailed timeline after the requirement analysis phase." },
      { q: "Do I own the source code?", a: "Yes. After full payment you receive complete ownership of all source code, documentation, and deployment configurations." },
      { q: "What payment methods do you accept?", a: "We accept Midtrans (credit/debit card, e-wallet) and direct bank transfer. A 50% down payment is required to start, with the remainder due upon delivery." },
      { q: "Can I request changes after delivery?", a: "Minor bug fixes are covered for 3 months at no extra cost. Feature changes or additions can be quoted separately." },
      { q: "Do you provide hosting or server management?", a: "We help configure deployment on your preferred cloud provider (AWS, GCP, Vercel, etc.). Ongoing server management can be arranged as a separate retainer." },
    ],
  },
  "web-application": {
    title: "Web Application",
    subtitle: "Full-Stack Modern Web Solutions",
    price: "Rp 8.000.000",
    priceNote: "Mulai dari",
    heroGradient:
      "bg-gradient-to-br from-blue-900/40 via-zinc-900 to-purple-900/30 border border-white/[0.06]",
    heroEmoji: "🌐",
    description:
      "Create stunning, high-performance web applications using the latest technologies. From landing pages to complex enterprise dashboards, we deliver pixel-perfect implementations with exceptional user experience and SEO optimization built-in.",
    techStack: [
      { name: "Next.js", desc: "Full-stack Framework" },
      { name: "React", desc: "UI Library" },
      { name: "NestJS", desc: "Backend Framework" },
      { name: "Express", desc: "API Layer" },
      { name: "TypeScript", desc: "Type Safety" },
      { name: "Tailwind CSS", desc: "Utility CSS" },
      { name: "Framer Motion", desc: "Animations" },
      { name: "WebSocket", desc: "Real-time" },
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
    faq: [
      { q: "Can you work with my existing Figma design?", a: "Absolutely. We can implement pixel-perfect code from your Figma files or create the design from scratch if needed." },
      { q: "Will the website be mobile-friendly?", a: "Every project is built mobile-first. We test across all major devices and browsers before delivery." },
      { q: "Do I own the source code?", a: "Yes. After full payment you receive complete ownership of all source code, design assets, and documentation." },
      { q: "What payment methods do you accept?", a: "We accept Midtrans (credit/debit card, e-wallet) and direct bank transfer. A 50% down payment is required to start." },
      { q: "How long does the project take?", a: "A typical full-stack web application takes 6–12 weeks. We'll share a detailed timeline after the discovery phase." },
      { q: "Do you offer post-launch support?", a: "Yes, 3 months of free bug-fix support is included. Extended maintenance plans are available on request." },
    ],
  },
  "api-integration": {
    title: "API Integration",
    subtitle: "Seamless Third-Party Connections",
    price: "Rp 3.000.000",
    priceNote: "Mulai dari",
    heroGradient:
      "bg-gradient-to-br from-orange-900/40 via-zinc-900 to-pink-900/30 border border-white/[0.06]",
    heroEmoji: "🔗",
    description:
      "Connect your systems with external services effortlessly. Whether it's payment gateways, shipping providers, CRM systems, or custom APIs, we ensure secure, reliable integrations that work flawlessly with your existing infrastructure.",
    techStack: [
      { name: "Axios", desc: "HTTP Client" },
      { name: "GraphQL", desc: "Query Language" },
      { name: "Webhooks", desc: "Event-driven" },
      { name: "gRPC", desc: "RPC Protocol" },
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
    faq: [
      { q: "Which third-party services can you integrate?", a: "We work with any provider that exposes a REST, GraphQL, or gRPC API — payment gateways (Midtrans, Stripe), shipping (JNE, SiCepat), CRMs, email services, and more." },
      { q: "Will you need access to my existing codebase?", a: "In most cases yes, read access to the repository is required. We can sign an NDA before starting." },
      { q: "What if the third-party API changes?", a: "Our integrations include versioned abstraction layers, making it easy to update without breaking your app. Bug fixes for 1 month are included." },
      { q: "What payment methods do you accept?", a: "We accept Midtrans (credit/debit card, e-wallet) and direct bank transfer. A 50% down payment is required to start." },
      { q: "How quickly can an integration be completed?", a: "Simple integrations (single API) can be done in 1–2 weeks. Complex multi-service integrations typically take 3–5 weeks." },
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

  return <ServiceDetailClient service={service} slug={slug} />;
}
