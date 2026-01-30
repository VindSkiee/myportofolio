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
        title: "Truck Monitoring System",
        category: "Monitoring System",
        description: "CRUD for truck packaging + real-time monitoring dashboard.",
        tech: ["Laravel", "MySQL"],
        photo: "/project1.jpg",
        link: "/project/truck-monitoring-system",
        span: "md:col-span-2",
    },
    {
        id: 2,
        title: "Brilliant Indonesia",
        category: "Landing Page",
        description: "Landing page for offline and e-learning platform.",
        tech: ["React", "Tailwind CSS"],
        photo: "/project2.jpg",
        link: "/project/brilliant-indonesia",
        span: "md:col-span-1",
    },

    // --- ROW 2 (Full Width) ---
    {
        id: 3,
        title: "Attendance System",
        category: "RBAC + CRUD System",
        description: "Role-based access control system with attendance tracking features.",
        tech: ["Laravel", "MySQL", "Tailwind CSS"],
        photo: "/project3.jpg",
        link: "/project/attendance-system",
        span: "md:col-span-3",
    },
];
