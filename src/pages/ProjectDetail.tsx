import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, ChevronRight } from 'lucide-react';
import { getProjectById, type ProjectData } from '../data/projects';
import { Navbar } from '../components/Navbar';

function QuickNav({ sections }: { sections: ProjectData['sections'] }) {
  return (
    <aside className="hidden lg:block absolute right-6 top-1/2 -translate-y-1/2">
      <p className="text-text-muted text-xs uppercase tracking-wider mb-3">Navigate</p>
      <nav className="space-y-2">
        <a href="#overview" className="block text-text-secondary text-sm hover:text-accent transition-colors">
          Project Overview
        </a>
        <a href="#screenshots" className="block text-text-secondary text-sm hover:text-accent transition-colors">
          Screenshots
        </a>
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="block text-text-secondary text-sm hover:text-accent transition-colors"
          >
            {section.title}
          </a>
        ))}
        <a href="#reflection" className="block text-text-secondary text-sm hover:text-accent transition-colors">
          Reflection
        </a>
      </nav>
    </aside>
  );
}

function SectionDivider({ title, id }: { title: string; id: string }) {
  return (
    <div id={id} className="py-6 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-accent text-sm font-medium tracking-wider uppercase">{title}</span>
          <div className="h-px flex-1 bg-border" />
        </div>
      </div>
    </div>
  );
}

function SectionWrapper({ 
  children, 
  variant = 'default',
  className = '' 
}: { 
  children: React.ReactNode; 
  variant?: 'default' | 'alt' | 'dark';
  className?: string;
}) {
  const bgClass = {
    default: 'bg-background',
    alt: 'bg-surface',
    dark: 'bg-surface-light',
  }[variant];

  return (
    <div className={`${bgClass} ${className}`}>
      <div className="max-w-5xl mx-auto px-6 py-10">
        {children}
      </div>
    </div>
  );
}

function Panel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-surface/50 rounded-lg p-6 md:p-8 ${className}`}>
      {children}
    </div>
  );
}

function PanelBar({ title }: { title: string }) {
  return (
    <div className="bg-surface-light -mx-6 md:-mx-8 -mt-6 md:-mt-8 mb-6 px-6 md:px-8 py-4 rounded-t-lg border-b border-border">
      <h2 className="text-text-primary font-medium">{title}</h2>
    </div>
  );
}

export function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = getProjectById(projectId || '');

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-text-primary mb-4">Project not found</h1>
          <Link to="/" className="text-accent hover:text-accent-light">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20">
        <div className="absolute inset-0 -z-10">
          <img
            src={project.image}
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/90 to-background" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24">
          {/* Back button beside genre */}
          <div className="flex items-center gap-4 mb-3">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-accent text-sm hover:text-accent-light transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Link>
            <span className="text-text-muted">|</span>
            <p className="text-text-muted text-sm tracking-wider uppercase">
              {project.genre}
            </p>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-text-primary mb-4">
            {project.title}
          </h1>
          <p className="text-accent text-lg">{project.role}</p>

          {/* Quick Nav - Desktop */}
          <QuickNav sections={project.sections} />
        </div>
      </section>

      {/* Hero Screenshot */}
      <div className="bg-background">
        <div className="max-w-5xl mx-auto px-6 -mt-8 pb-8">
          <figure>
            <img
              src={project.image}
              alt={`${project.title} main screenshot`}
              className="w-full rounded-lg shadow-lg"
            />
          </figure>
        </div>
      </div>

      {/* Overview & Role Section */}
      <SectionWrapper variant="alt" className="scroll-mt-24" id="overview">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Overview */}
          <div>
            <h2 className="text-text-primary text-lg font-medium mb-4">Project Overview</h2>
            <div className="space-y-3 text-text-secondary text-sm leading-relaxed">
              {project.overview.description.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <span className="text-text-muted">
                <strong className="text-text-primary">Engine:</strong> {project.overview.engine}
              </span>
              <span className="text-text-muted">
                <strong className="text-text-primary">Timeframe:</strong> {project.overview.timeframe}
              </span>
              <span className="text-text-muted">
                <strong className="text-text-primary">Team:</strong> {project.overview.team}
              </span>
            </div>
          </div>

          {/* Role & Skills */}
          <div>
            <h2 className="text-text-primary text-lg font-medium mb-4">Role & Skills</h2>
            <ul className="space-y-2 text-text-secondary text-sm mb-6">
              {project.roleSkills.description.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {project.roleSkills.badges.map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1 bg-accent/20 text-accent text-xs rounded"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Screenshots Gallery */}
      <SectionWrapper variant="default" id="screenshots" className="scroll-mt-24">
        <Panel>
          <PanelBar title="Screenshots" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {project.screenshots.map((src, i) => (
              <figure key={i} className="rounded overflow-hidden">
                <img src={src} alt={`Screenshot ${i + 1}`} className="w-full h-auto" />
              </figure>
            ))}
          </div>
        </Panel>
      </SectionWrapper>

      {/* Dynamic Sections with alternating backgrounds */}
      {project.sections.map((section, index) => (
        <div key={section.id}>
          <SectionDivider title={section.title} id={section.id} />
          
          <SectionWrapper variant={index % 2 === 0 ? 'alt' : 'default'}>
            {section.content.map((para, i) => (
              <p key={i} className="text-text-secondary text-sm leading-relaxed mb-4">
                {para}
              </p>
            ))}

            {section.bullets && (
              <ul className="space-y-2 text-text-secondary text-sm mb-6">
                {section.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            {section.subsections && (
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                {section.subsections.map((sub, i) => (
                  <div key={i} className="bg-surface-light/50 rounded-lg p-5 border border-border/50">
                    <h3 className="text-text-primary font-medium mb-4">{sub.title}</h3>
                    
                    {sub.bullets && (
                      <ul className="space-y-2 text-text-secondary text-sm">
                        {sub.bullets.map((bullet, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="text-accent mt-1">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {sub.pillars && (
                      <div className="grid grid-cols-2 gap-3">
                        {sub.pillars.map((pillar, j) => (
                          <div key={j} className="flex items-center gap-3 p-3 bg-background rounded border border-border/30">
                            <span className="text-2xl">{pillar.icon}</span>
                            <div>
                              <p className="text-text-primary text-sm font-medium">{pillar.title}</p>
                              <p className="text-text-muted text-xs">{pillar.subtitle}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {section.images && section.images.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mt-6">
                {section.images.map((img, i) => (
                  <figure key={i} className="rounded overflow-hidden">
                    <img src={img} alt={`${section.title} image ${i + 1}`} className="w-full h-auto" />
                  </figure>
                ))}
              </div>
            )}
          </SectionWrapper>
        </div>
      ))}

      {/* Reflection */}
      <SectionDivider title="Reflection" id="reflection" />
      <SectionWrapper variant={project.sections.length % 2 === 0 ? 'alt' : 'default'}>
        <p className="text-text-secondary text-sm leading-relaxed mb-6">
          This project was a valuable learning experience that helped me grow as a game developer.
          Each challenge encountered contributed to my understanding of {project.overview.engine} and 
          game development best practices.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            to={`/#${project.type}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-light text-white text-sm font-semibold rounded hover:bg-surface-elevated transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {project.type === 'personal' ? 'Personal' : 'Professional'} Projects
          </Link>
          
          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-text-primary text-sm rounded hover:border-accent hover:text-accent transition-colors"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
          )}
          
          {project.links?.playStore && (
            <a
              href={project.links.playStore}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-text-primary text-sm rounded hover:border-accent hover:text-accent transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View on Play Store
            </a>
          )}
        </div>
      </SectionWrapper>

      {/* Footer */}
      <footer className="bg-surface-light border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-text-primary font-medium">{project.title}</p>
              <p className="text-text-muted text-sm">{project.role}</p>
            </div>
            <nav className="flex flex-wrap items-center gap-6 text-sm">
              <a href="#overview" className="text-text-muted hover:text-text-primary transition-colors">
                Overview
              </a>
              {project.sections.slice(0, 3).map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-text-muted hover:text-text-primary transition-colors"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
