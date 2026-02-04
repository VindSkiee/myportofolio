export interface ProjectDetail {
    id: string;
    slug: string;
    isMega: boolean;
    title: string;
    type: string;
    description: string;
    client: string | null;
    techStack: string[];
    photos: string[];
    year: string;
    role: string;
    liveUrl?: string;
    repoUrl?: string;
}

export const PROJECT_DETAILS: ProjectDetail[] = [
    // --- MEGA PROJECT (Teal Theme) ---
    {
        id: "collabs",
        slug: "collabs",
        isMega: true,
        title: "Collabs",
        type: "Enterprise Platform",
        description: `Collabs is a real-time collaboration platform designed to revolutionize team communication. Built from the ground up with performance in mind, it delivers faster message delivery than Microsoft Teams while maintaining the simplicity that made Slack popular.

The platform features real-time presence indicators, threaded conversations, file sharing with preview capabilities, and a powerful search engine that indexes all team communications. The architecture leverages WebSockets for instant message delivery and Redis for caching frequently accessed data.

Key technical achievements include sub-100ms message latency, support for 10,000+ concurrent users per workspace, and a plugin system that allows teams to extend functionality with custom integrations. The frontend is built with Next.js for optimal performance and SEO, while the backend uses Express.js with a microservices architecture.`,
        client: "Internal Startup Project",
        techStack: ["Express", "Next.js", "WebSockets", "Redis", "PostgreSQL", "Docker", "AWS"],
        photos: [
            "/projects/collabs/hero.jpg",
            "/projects/collabs/dashboard.jpg",
            "/projects/collabs/chat.jpg",
            "/projects/collabs/settings.jpg",
        ],
        year: "2025 - Present",
        role: "Lead Full-Stack Engineer",
        liveUrl: "https://collabs.app",
        repoUrl: "https://github.com/VindSkiee/collabs",
    },

    // --- STANDARD PROJECT (Blue Theme) ---
    {
        id: "truck-monitoring-system",
        slug: "truck-monitoring-system",
        isMega: false,
        title: "Truck Monitoring System",
        type: "Monitoring System",
        description: `A comprehensive truck fleet monitoring and packaging management system developed for a logistics company. The system provides real-time tracking of truck locations, cargo status, and delivery schedules through an intuitive dashboard.

The application features role-based access control allowing different permission levels for drivers, dispatchers, and administrators. The packaging module enables efficient cargo management with barcode scanning integration and automated weight/dimension logging.

Built with Laravel's robust MVC architecture, the system handles high-volume data processing with optimized MySQL queries. The dashboard displays live statistics including active deliveries, fuel consumption metrics, and driver performance analytics. Integration with GPS devices provides accurate location updates every 30 seconds.`,
        client: "PT. Logistik Nusantara",
        techStack: ["Laravel", "MySQL", "Livewire", "Alpine.js", "Tailwind CSS"],
        photos: [
            "/projects/truck/hero.jpg",
            "/projects/truck/dashboard.jpg",
            "/projects/truck/tracking.jpg",
        ],
        year: "2024",
        role: "Backend Developer",
        repoUrl: "https://github.com/VindSkiee/truck-monitoring",
    },

    // --- STANDARD PROJECT (Blue Theme) ---
    {
        id: "brilliant-indonesia",
        slug: "brilliant-indonesia",
        isMega: false,
        title: "Brilliant Indonesia",
        type: "Landing Page",
        description: `A modern landing page designed for Brilliant Indonesia, an educational platform offering both offline and online learning experiences. The website showcases their course catalog, instructor profiles, and registration process with a clean, engaging design.

The page features smooth scroll animations, an interactive course carousel, and a testimonial section with real student reviews. Special attention was given to mobile responsiveness ensuring a seamless experience across all devices.

Performance optimization techniques including lazy loading, image optimization, and code splitting result in a Lighthouse score above 95. The contact form integrates with their CRM system for automated lead management.`,
        client: "Brilliant Indonesia Education",
        techStack: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
        photos: [
            "/projects/brilliant_1.png",
            "/projects/brilliant_2.png",
            "/projects/brilliant/testimonials.jpg",
            "/projects/brilliant/mobile.jpg",
        ],
        year: "2024",
        role: "Frontend Developer",
        liveUrl: "https://brilliant-indonesia.co.id",
    },

    // --- STANDARD PROJECT (Blue Theme) ---
    {
        id: "attendance-system",
        slug: "attendance-system",
        isMega: false,
        title: "Attendance System",
        type: "RBAC + CRUD System",
        description: `An enterprise-grade attendance management system featuring comprehensive role-based access control. The system supports multiple organizational hierarchies with configurable permission levels for HR managers, department heads, and employees.

Core features include QR code-based clock-in/out, geolocation verification to prevent buddy punching, and overtime calculation with customizable rules. The reporting module generates detailed attendance reports exportable in PDF and Excel formats.

The RBAC implementation uses Laravel's policy system with a custom middleware for fine-grained permission checks. The UI is built with Tailwind CSS and Livewire for real-time updates without page refreshes. Integration with existing HRIS systems is supported through a RESTful API.`,
        client: null,
        techStack: ["Laravel", "MySQL", "Livewire", "Tailwind CSS", "Chart.js"],
        photos: [
            "/projects/attendance/hero.jpg",
            "/projects/attendance/dashboard.jpg",
            "/projects/attendance/reports.jpg",
        ],
        year: "2024",
        role: "Full-Stack Developer",
        repoUrl: "https://github.com/VindSkiee/attendance-system",
    },
];

// Helper function to get project by slug
export function getProjectBySlug(slug: string): ProjectDetail | undefined {
    return PROJECT_DETAILS.find((project) => project.slug === slug);
}

// Helper function to get all project slugs (for generateStaticParams)
export function getAllProjectSlugs(): string[] {
    return PROJECT_DETAILS.map((project) => project.slug);
}
