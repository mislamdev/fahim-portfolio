import { Link } from 'react-router-dom';
import { ExternalLink, Github } from 'lucide-react';
import { getProjectsByType, type ProjectData } from '../data/projects';

function ProjectCard({ project }: { project: ProjectData }) {
  return (
    <article className="group">
      {/* Genre Meta */}
      <p className="text-text-muted text-xs tracking-wide uppercase mb-2 text-center">
        {project.genre}
      </p>

      {/* Image with Title Overlay - Clickable */}
      <Link
        to={`/project/${project.id}`}
        className="relative block aspect-video rounded-lg overflow-hidden mb-3"
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent flex items-end p-4">
          <h3 className="text-text-primary text-lg font-medium group-hover:text-accent transition-colors">
            {project.title}
          </h3>
        </div>
      </Link>

      {/* Role */}
      <p className="text-accent text-sm text-center">{project.role}</p>

      {/* Links */}
      {project.links && (
        <div className="flex justify-center gap-4 mt-2">
          {project.links.playStore && (
            <a
              href={project.links.playStore}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-text-muted text-xs hover:text-accent transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-3 h-3" />
              Play Store
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-text-muted text-xs hover:text-accent transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-3 h-3" />
              GitHub
            </a>
          )}
        </div>
      )}
    </article>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-text-primary text-xl tracking-wide">{title}</h2>
      <div className="w-12 h-px bg-border mx-auto mt-3" />
    </div>
  );
}

export function Projects() {
  const personalProjects = getProjectsByType('personal');
  const professionalProjects = getProjectsByType('professional');

  return (
    <>
      {/* Personal Projects */}
      <section id="personal" className="py-16 bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader title="Personal Projects" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {personalProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Professional Projects */}
      <section id="professional" className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader title="Professional Work" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {professionalProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
