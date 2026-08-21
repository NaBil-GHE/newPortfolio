import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Java } from "@/components/ui/svgs/java";
import { Python } from "@/components/ui/svgs/python";
import { Flutter } from "@/components/ui/svgs/flutter";
import { Dart } from "@/components/ui/svgs/dart";
import { C } from "@/components/ui/svgs/c";
import { Cpp } from "@/components/ui/svgs/cpp";
import { Git } from "@/components/ui/svgs/git";
import { Html } from "@/components/ui/svgs/html";
import { Css } from "@/components/ui/svgs/css";
import { Prisma } from "@/components/ui/svgs/prisma";
import { RestApi } from "@/components/ui/svgs/restApi";

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
    { name: "Flutter", icon: Flutter },
    { name: "Dart", icon: Dart },
    { name: "Node.js", icon: Nodejs },
    { name: "TypeScript", icon: Typescript },
    { name: "PostgreSQL", icon: Postgresql },
    { name: "Java", icon: Java },
    { name: "C", icon: C },
    { name: "C++", icon: Cpp },
    { name: "Python", icon: Python },
    { name: "React", icon: ReactLight },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "HTML", icon: Html },
    { name: "CSS", icon: Css },
    { name: "Git", icon: Git },
    { name: "REST API", icon: RestApi },
    { name: "Prisma", icon: Prisma },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "ghenissanabil1@gmail.com",
    tel: "+213674301607",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/NaBil-GHE",
        icon: Icons.github,
        navbar: true,
      },

      Facebook: {
        name: "Facebook",
        url: "https://www.facebook.com/nabil.ghenissa1",
        icon: Icons.facebook,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:ghenissanabil1@gmail.com",
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
} as const;
