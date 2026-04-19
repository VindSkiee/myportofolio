// ============================================
// PROJECT DATA TYPES & CONSTANTS
// ============================================

export interface ProjectItem {
    id: number;
    title: string;
    category: string;
    description: string;
    fullDescription?: string; // Extended description for modal
    tech: string[];
    span: string;
    isUnderDevelopment: boolean;
    // Modal-specific data (only shown for finished projects)
    images?: string[]; // Max 2 images
    liveUrl?: string;
    repoUrl?: string;
}

export interface MegaProjectItem extends Omit<ProjectItem, 'span'> {
    status: 'ongoing' | 'finished';
    brandColor: string;
}

// ============================================
// MEGA PROJECT (Featured)
// ============================================
export const MEGA_PROJECT: MegaProjectItem = {
    id: 0,
    title: "Collabs",
    category: "Enterprise Platform",
    description: "A real-time collaboration platform AI integrated. Faster than Teams, simpler than Slack.",
    fullDescription: "Collabs is an enterprise-grade real-time collaboration platform designed to streamline team communication. Built with a microservices architecture, it features instant messaging, file sharing, video conferencing, and project management tools. The platform leverages WebSockets for real-time updates and Redis for high-performance caching.",
    tech: ["Express", "TypeScript", "TanStack Query", "WebSockets", "Redis", "Gemini API"],
    status: "ongoing",
    brandColor: "#14b8a6",
    isUnderDevelopment: true, // Ongoing = Under Development
    images: ["/projects/collabs_1.jpg", "/projects/collabs_2.jpg"],
    liveUrl: "https://collabs.example.com",
    repoUrl: "https://github.com/VindSkiee/collabs",
};

// ============================================
// PROJECTS DATA
// ============================================
export const PROJECTS_DATA: ProjectItem[] = [
    {
        id: 1,
        title: "Truck Monitoring System",
        category: "Monitoring System",
        description: "CRUD for truck packaging + real-time monitoring dashboard.",
        fullDescription: "A comprehensive truck fleet management system featuring real-time GPS tracking, package delivery status monitoring, driver performance analytics, and automated reporting. The dashboard provides live updates on truck locations, delivery schedules, and package conditions.",
        tech: ["Laravel", "MySQL"],
        span: "md:col-span-2",
        isUnderDevelopment: false,
        images: ["/projects/truck_1.jpg", "/projects/truck_2.jpg"],
        repoUrl: "https://github.com/VindSkiee/truck_arrival_monitoring_system",
    },
    {
        id: 2,
        title: "Brilliant Indonesia",
        category: "Landing Page",
        description: "Landing page for offline and e-learning platform.",
        fullDescription: "A modern, responsive landing page for an Indonesian e-learning platform. Features include course showcases, testimonials carousel, pricing tables, and seamless integration with the learning management system. Optimized for performance with lazy loading and SEO best practices.",
        tech: ["React", "Tailwind CSS"],
        span: "md:col-span-1",
        isUnderDevelopment: false,
        images: ["/projects/brilliant_1.png", "/projects/brilliant_2.png"],
        liveUrl: "https://www.bimbelbrilliantindonesia.id/",
        repoUrl: "https://github.com/VindSkiee/brilliant-indonesia",
    },
    {
        id: 3,
        title: "Attendance System",
        category: "RBAC + CRUD System",
        description: "Role-based access control system with attendance tracking features.",
        fullDescription: "An enterprise attendance management system with granular role-based access control. Features include biometric integration, leave management, overtime calculation, shift scheduling, and comprehensive reporting. Supports multiple departments and hierarchical approval workflows.",
        tech: ["Laravel", "MySQL", "Tailwind CSS"],
        span: "md:col-span-3",
        isUnderDevelopment: false,
        images: ["/projects/attendance_1.png", "/projects/attendance_2.png"],
        repoUrl: "https://github.com/VindSkiee/attendance_scheduler_system",
    },
    {
        id: 4,
        title: "Community Finance and Event Organizer System",
        category: "RBAC + CRUD + Payment Gateway",
        description: "Finance workflow + event funding with role-based permissions and Midtrans integration.",
        fullDescription: "A comprehensive financial management and event organizer system for community organizations. It supports configurable RBAC roles for administrators, finance officers, and members, complete with invoicing, expense tracking, and event funding workflows. Midtrans integration enables secure payment processing and reliable transaction handling.",
        tech: ["Nest.js", "TypeScript", "React", "MySQL", "Midtrans", "Tailwind CSS"],
        span: "md:col-span-3",
        isUnderDevelopment: false,
        images: ["/projects/event_1.png", "/projects/event_2.png"],
        repoUrl: "https://github.com/VindSkiee/event_organizer_system",
    },
];

// Type for modal data (lightweight version)
export type ModalProjectData = ProjectItem | MegaProjectItem;
