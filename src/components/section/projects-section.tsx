import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { Icons } from "@/components/icons";
import type { ReactNode } from "react";

const BLUR_FADE_DELAY = 0.04;
const PROJECTS_API_URL = "https://apim.nabill.tech/api/pprojects/";

type ApiProjectLink = {
    type: string;
    href: string;
    icon?: string;
};

type ApiProject = {
    _id: string;
    title: string;
    href: string;
    dates: string;
    active: boolean;
    description: string;
    technologies: string[];
    links: ApiProjectLink[];
    image?: string;
    video?: string;
};

type ProjectsApiResponse = {
    success: boolean;
    message: string;
    data: ApiProject[];
};

type ProjectsResult = {
    projects: ApiProject[];
    hasError: boolean;
};

const linkIcons: Record<string, (props: { className?: string }) => ReactNode> = {
    github: (props) => <Icons.github {...props} />,
    globe: (props) => <Icons.globe {...props} />,
    email: (props) => <Icons.email {...props} />,
    linkedin: (props) => <Icons.linkedin {...props} />,
    facebook: (props) => <Icons.facebook {...props} />,
    youtube: (props) => <Icons.youtube {...props} />,
};

async function getProjects(): Promise<ProjectsResult> {
    try {
        const response = await fetch(PROJECTS_API_URL, { cache: "no-store" });

        if (!response.ok) {
            return { projects: [], hasError: true };
        }

        const result = (await response.json()) as ProjectsApiResponse;

        if (!result.success || !Array.isArray(result.data)) {
            return { projects: [], hasError: true };
        }

        return {
            projects: result.data.filter((project) => project.active === true),
            hasError: false,
        };
    } catch {
        return { projects: [], hasError: true };
    }
}

function getLinkIcon(icon?: string) {
    return icon ? linkIcons[icon.toLowerCase()]?.({ className: "size-3" }) : undefined;
}

export default async function ProjectsSection() {
    const { projects, hasError } = await getProjects();

    return (
        <section id="projects">
            <div className="flex min-h-0 flex-col gap-y-8">
                <div className="flex flex-col gap-y-4 items-center justify-center">
                    <div className="flex items-center w-full">
                        <div
                            className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent"

                        />
                        <div className="border bg-primary z-10 rounded-xl px-4 py-1">
                            <span className="text-background text-sm font-medium">My Projects</span>
                        </div>
                        <div
                            className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent"

                        />
                    </div>
                    <div className="flex flex-col gap-y-3 items-center justify-center">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Check out my latest work</h2>
                        <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
                            I&apos;ve worked on a variety of projects, from simple
                            websites to complex web applications. Here are a few of my
                            favorites.
                        </p>
                    </div>
                </div>
                {hasError ? (
                    <p className="text-sm text-muted-foreground text-center">
                        Projects are temporarily unavailable.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-200 mx-auto auto-rows-fr">
                        {projects.map((project, id) => (
                            <BlurFade
                                key={project._id}
                                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                                className="h-full"
                            >
                                <ProjectCard
                                    href={project.href}
                                    title={project.title}
                                    description={project.description}
                                    dates={project.dates}
                                    tags={project.technologies}
                                    image={project.image}
                                    video={project.video}
                                    links={project.links.map((link) => ({
                                        type: link.type,
                                        href: link.href,
                                        icon: getLinkIcon(link.icon),
                                    }))}
                                />
                            </BlurFade>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

