export interface ProjectItem {
    id: number;
    title: string;
    category: string;
    description: string;
    tech: string[];
    photo: string;
    link: string;
    span: string;
}

export interface MegaProjectItem extends ProjectItem {
    status: 'ongoing' | 'finished';
    brandColor: string;
}

// --- MEGA PROJECT (Featured) ---
export const MEGA_PROJECT: MegaProjectItem = {
    id: 0,
    title: "Collabs",
    category: "Enterprise Platform",
    description: "A real-time collaboration platform. Faster than Teams, simpler than Slack.",
    tech: ["Express", "Next.js", "WebSockets", "Redis"],
    photo: "/mega-project.jpg",
    link: "/project/collabs",
    span: "w-full",
    status: "ongoing",
    brandColor: "#14b8a6", // Teal-500
};

export const PROJECTS_DATA: ProjectItem[] = [
    // --- ROW 1 (Span 2 + Span 1 = Full Width) ---
    {
        id: 1,
        title: "Papertech IoT Core",
        category: "IoT System",
        description: "Real-time truck monitoring system processing 5k+ data points/sec via MQTT.",
        tech: ["Laravel", "Redis", "MQTT"],
        photo: "/project1.jpg",
        link: "/project/papertech-iot",
        span: "md:col-span-2",
    },
    {
        id: 2,
        title: "GymOS & Store",
        category: "SaaS Ecosystem",
        description: "All-in-one gym membership engine merged with full-stack e-commerce.",
        tech: ["Node.js", "Stripe", "PostgreSQL"],
        photo: "/project2.jpg",
        link: "/project/gymos-store",
        span: "md:col-span-1",
    },

    // --- ROW 2 (Span 1 + Span 2 = Full Width) ---
    {
        id: 3,
        title: "AI Microservice",
        category: "AI Infrastructure",
        description: "Dedicated Python service for handling LLM prompts with rate-limiting.",
        tech: ["Python", "FastAPI", "Docker"],
        photo: "/project3.jpg",
        link: "/project/ai-microservice",
        span: "md:col-span-1",
    },
    {
        id: 4,
        title: "Wedding Platform",
        category: "Fullstack SaaS",
        description: "Digital invitation platform with customizable themes and RSVP management.",
        tech: ["Next.js", "Prisma", "AWS S3"],
        photo: "/project4.jpg",
        link: "/project/wedding-platform",
        span: "md:col-span-2",
    },

    // --- ROW 3 (Span 1 + Span 2 = Full Width) ---
    {
        id: 5,
        title: "CyberSec Scanner",
        category: "Security Tool",
        description: "Internal CLI tool to scan backend endpoints for vulnerabilities.",
        tech: ["Golang", "Linux", "Bash"],
        photo: "/project5.jpg",
        link: "/project/cybersec-scanner",
        span: "md:col-span-1",
    },
    {
        id: 6,
        title: "Distributed Gateway",
        category: "Backend Architecture",
        description: "Centralized entry point handling auth, load balancing, and routing.",
        tech: ["Nginx", "Lua", "Redis"],
        photo: "/project6.jpg",
        link: "/project/distributed-gateway",
        span: "md:col-span-2",
    },
];
