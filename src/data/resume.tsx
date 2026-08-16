import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import type { ReactNode } from "react";

type Project = {
  title: string;
  href?: string;
  dates: string;
  active?: boolean;
  description: string;
  technologies: string[];
  links?: {
    type: string;
    href: string;
    icon: ReactNode;
  }[];
  image?: string;
  video?: string;
};

export const DATA = {
  name: "GHENISSA Nabil",
  initials: "GN",
  url: "https://example.com",
  location: "Oran, Algeria",
  locationLink: "https://www.google.com/maps/search/?api=1&query=Oran%2C%20Algeria",
  description:
    "Computer Science graduate and software developer focused on building modern web and mobile applications.",
  summary:
    "Computer Science graduate and software developer focused on building modern web and mobile applications. I enjoy creating reliable software across frontend, backend, and database-driven systems, with a strong interest in APIs, scalable development workflows, and modern tools used in contemporary web and mobile development.",
  avatarUrl: "/me.png",
  skills: [
    { name: "React", icon: ReactLight },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "TypeScript", icon: Typescript },
    { name: "Node.js", icon: Nodejs },
    { name: "PostgreSQL", icon: Postgresql },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "your-email@example.com",
    tel: "+0000000000",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/your-github-username",
        icon: Icons.github,
        navbar: true,
      },

      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/your-linkedin-username",
        icon: Icons.linkedin,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:your-email@example.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },
  education: [
    {
      school: "Université des Sciences et de la Technologie d'Oran Mohamed Boudiaf (USTO-MB)",
      href: "https://www.univ-usto.dz/",
      degree: "Licence en Informatique",
      logoUrl: "https://www.univ-usto.dz/wp-content/uploads/2023/11/cropped-USTOLOGO-1024x1024.png",
      start: "2023",
      end: "2026",
    },
    {
      school: "Université des Sciences et de la Technologie d'Oran Mohamed Boudiaf (USTO-MB)",
      href: "https://www.univ-usto.dz/",
      degree: "Master en Réseaux et Systèmes Distribués",
      logoUrl: "https://www.univ-usto.dz/wp-content/uploads/2023/11/cropped-USTOLOGO-1024x1024.png",
      start: "2026",
      end: "Present",
    },
  ],
  projects: [] as Project[],
} as const;
