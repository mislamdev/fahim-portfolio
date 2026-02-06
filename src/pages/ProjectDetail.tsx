import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  X, 
  ChevronLeft, 
  Maximize2 
} from 'lucide-react';
import { getProjectById, type ProjectData } from '../data/projects';
import { Navbar } from '../components/Navbar';

function QuickNav({ sections }: { sections: ProjectData['sections'] }) {
  const [activeSection, setActiveSection] = useState('overview');

  const navItems = [
    { id: 'overview', title: 'Overview' },
    { id: 'screenshots', title: 'Screenshots' },
    ...sections,
    { id: 'reflection', title: 'Reflection' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the section that is intersecting most prominently
        const visibleSections = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      { 
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        rootMargin: '-20% 0px -70% 0px' 
      }
    );

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [navItems]);

  return (
    <aside className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50">
      <nav className="flex flex-col gap-6">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => {
                // Smooth scroll handled by CSS, but we can set active section immediately
                setActiveSection(item.id);
              }}
              className="group flex items-center gap-3 transition-all duration-300"
              title={item.title}
            >
              <div className={`w-2 h-2 rounded-full border-2 transition-all duration-300 ${
                isActive 
                  ? 'bg-accent border-accent scale-125' 
                  : 'bg-transparent border-accent/40 group-hover:border-accent group-hover:scale-110'
              }`} />
              <span className={`hidden lg:block text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
                isActive 
                  ? 'text-accent font-bold opacity-100' 
                  : 'text-text-secondary font-medium opacity-40 group-hover:opacity-100'
              }`}>
                {item.title}
              </span>
            </a>
          );
        })}
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
  className = '',
  id
}: { 
  children: React.ReactNode; 
  variant?: 'default' | 'alt' | 'dark';
  className?: string;
  id?: string;
}) {
  const bgClass = {
    default: 'bg-background',
    alt: 'bg-surface',
    dark: 'bg-surface-light',
  }[variant];

  return (
    <div id={id} className={`${bgClass} ${className}`}>
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

function ImageGallery({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const nextLightboxImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  }, [selectedIndex, images.length]);

  const prevLightboxImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  }, [selectedIndex, images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex !== null) {
        if (e.key === 'ArrowRight') nextLightboxImage();
        if (e.key === 'ArrowLeft') prevLightboxImage();
        if (e.key === 'Escape') setSelectedIndex(null);
      } else {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, nextLightboxImage, prevLightboxImage, nextImage, prevImage]);

  return (
    <Panel>
      <PanelBar title="Screenshots" />
      
      <div className="flex flex-col items-center gap-10">
        {/* Main Featured Image (80% width) */}
        <div 
          className="relative w-full md:w-[80%] aspect-video rounded-xl overflow-hidden cursor-zoom-in group shadow-2xl bg-surface-light border border-white/5"
          onClick={() => setSelectedIndex(currentIndex)}
        >
          <img 
            src={images[currentIndex]} 
            alt={`Project visual ${currentIndex + 1}`} 
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <Maximize2 className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Quick Nav Overlay for Main Image */}
          {images.length > 1 && (
            <>
              <button 
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full text-white opacity-0 group-hover:opacity-100 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full text-white opacity-0 group-hover:opacity-100 transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail Carousel */}
        <div className="w-full relative group/carousel">
          <div className="overflow-x-auto pb-4 no-scrollbar scroll-smooth">
            <div className="flex gap-4 px-4 justify-center">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`relative flex-shrink-0 w-32 md:w-44 aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    currentIndex === i 
                      ? 'border-accent ring-4 ring-accent/20 scale-105 shadow-lg shadow-accent/10' 
                      : 'border-white/5 opacity-40 hover:opacity-100 hover:border-white/20'
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
          onClick={() => setSelectedIndex(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-3 hover:bg-white/10 rounded-full z-[110]"
            onClick={() => setSelectedIndex(null)}
          >
            <X className="w-8 h-8" />
          </button>

          {images.length > 1 && (
            <>
              <button 
                className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all p-4 hover:bg-white/10 rounded-full z-[110]"
                onClick={prevLightboxImage}
              >
                <ChevronLeft className="w-12 h-12" />
              </button>
              <button 
                className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all p-4 hover:bg-white/10 rounded-full z-[110]"
                onClick={nextLightboxImage}
              >
                <ChevronRight className="w-12 h-12" />
              </button>
            </>
          )}

          <div className="relative max-w-7xl max-h-full flex flex-col items-center gap-6" onClick={(e) => e.stopPropagation()}>
            <img 
              src={images[selectedIndex]} 
              alt="Project screenshot full view" 
              className="max-w-full max-h-[80vh] object-contain shadow-2xl rounded-lg animate-in zoom-in-95 duration-300"
            />
            
            <div className="flex flex-col items-center gap-4">
              <div className="text-white/60 text-sm font-medium tracking-[0.3em] uppercase">
                {selectedIndex + 1} / {images.length}
              </div>

              {images.length > 1 && (
                <div className="hidden md:flex gap-3 px-4 py-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedIndex(idx)}
                      className={`w-16 h-10 rounded-md border-2 transition-all overflow-hidden ${
                        selectedIndex === idx ? 'border-accent scale-110 shadow-lg' : 'border-transparent opacity-30 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Panel>
  );
}

function ProjectMedia({ project }: { project: ProjectData }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent play/pause toggle when clicking mute
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="bg-background">
      <div className="max-w-5xl mx-auto px-6 -mt-8 pb-8">
        <div className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg" onClick={togglePlay}>
          {project.video ? (
            <>
              <video
                ref={videoRef}
                src={project.video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              />
              {/* Mute/Unmute Overlay */}
              <button
                onClick={toggleMute}
                className="absolute bottom-4 right-4 p-2 bg-background/40 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-background/60 transition-all z-10"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              
              {/* Subtle Pause Indicator (only shows briefly or on hover if you prefer, but requirement said no button) */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-accent/20 border border-accent/40">
                    <div className="w-4 h-6 border-l-4 border-r-4 border-white" />
                  </div>
                </div>
              )}
            </>
          ) : (
            <img
              src={project.image}
              alt={`${project.title} main screenshot`}
              className="w-full h-auto"
            />
          )}
        </div>
      </div>
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

      {/* Quick Nav */}
      <QuickNav sections={project.sections} />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={project.image}
            alt=""
            className="w-full h-full object-cover"
          />
          {/* Transparent Gray Overlay */}
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[1px]" />
          
          {/* Fade to background color at the bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-20 flex flex-col items-center text-center">
          <p className="text-accent text-xs md:text-sm tracking-[0.4em] uppercase mb-6 font-semibold opacity-80">
            {project.genre}
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-text-primary mb-8 tracking-tight leading-tight">
            {project.title}
          </h1>
          <div className="h-px w-24 bg-accent/50 mb-8" />
          <p className="text-text-secondary text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
            {project.role}
          </p>
        </div>
      </section>

      {/* Hero Screenshot / Video */}
      <ProjectMedia project={project} />

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
        <ImageGallery images={project.screenshots} />
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
