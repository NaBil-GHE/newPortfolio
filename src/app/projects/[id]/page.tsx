/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

const PROJECTS_API_URL = "https://apis.nabilll.tech/api/portfolio";

type Project = {
    id: string;
    title: string;
    href: string;
    dates: string;
    description: string;
    technologies: string[];
    images: string[];
    video: string;
    links: { type: string; href: string }[];
};

async function getProject(id: string): Promise<Project | null> {
    try {
        const response = await fetch(`${PROJECTS_API_URL}/${encodeURIComponent(id)}`, {
            cache: "no-store",
        });
        if (!response.ok) return null;

        const result = (await response.json()) as { success: boolean; data: Project };
        return result.success ? result.data : null;
    } catch {
        return null;
    }
}

export default async function ProjectDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const project = await getProject(id);

    if (!project) notFound();

    return (
        <main className="mx-auto flex w-full max-w-3xl flex-col gap-8">
            <Link href="/#projects" className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" aria-hidden />
                Back to projects
            </Link>
            <header className="flex flex-col gap-3">
                <p className="text-sm text-muted-foreground">{project.dates}</p>
                <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">{project.title}</h1>
                <div className="flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                        <span key={technology} className="rounded-md border px-2 py-1 text-xs text-muted-foreground">{technology}</span>
                    ))}
                </div>
            </header>
            {project.video ? <video src={project.video} controls className="w-full rounded-xl border" /> : null}
            {project.images.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                    {project.images.map((image, index) => (
                        <img key={image} src={image} alt={`${project.title} screenshot ${index + 1}`} className="w-full rounded-xl border object-cover" />
                    ))}
                </div>
            ) : null}
            <article className="prose max-w-none text-muted-foreground dark:prose-invert">
                <Markdown>{project.description}</Markdown>
            </article>
            <div className="flex flex-wrap gap-3">
                <Link href={project.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
                    Open project <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
                {project.links.map((link) => (
                    <Link key={`${link.type}-${link.href}`} href={link.href} target="_blank" rel="noopener noreferrer" className="rounded-md border px-4 py-2 text-sm hover:bg-muted">
                        {link.type}
                    </Link>
                ))}
            </div>
        </main>
    );
}