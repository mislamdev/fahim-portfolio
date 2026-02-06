import { Gamepad2, Building2, Cog } from 'lucide-react';

const capabilities = [
  {
    icon: Gamepad2,
    title: 'Game Development',
    description: 'Skilled in gameplay mechanics, game physics, and core development fundamentals to deliver engaging game experiences.',
  },
  {
    icon: Building2,
    title: 'Level Design',
    description: 'Strong understanding of player engagement and guidance to craft cohesive, immersive, and intuitive gameplay environments.',
  },
  {
    icon: Cog,
    title: 'Game Production',
    description: 'Excellent production proficiency with strong skills in effective communication, team dynamics, and technical leadership.',
  },
];

export function Hero() {
  return (
    <section id="home" className="relative">
      {/* Hero Background */}
      <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            src="/projects/unreal-paradise/unreal-paradise.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          {/* Gray Overlay with Opacity */}
          <div className="absolute inset-0 bg-black/20" />
          
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 py-20 mt-16">
          <h1 className="font-script text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-primary mb-2 tracking-wide">
            Fahim
          </h1>
          <h1 className="font-script text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary-light mb-6 tracking-wide">
            Kamal
          </h1>
          <p className="text-text-secondary text-base sm:text-lg tracking-widest uppercase">
            Game Developer & Level Designer
          </p>
        </div>
      </div>

      {/* Capabilities Strip */}
      <div className="bg-surface-light py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {capabilities.map((cap) => (
              <article key={cap.title} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 mb-4 text-accent">
                  <cap.icon className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h2 className="text-text-primary text-lg font-medium mb-3">{cap.title}</h2>
                <p className="text-text-muted text-sm leading-relaxed">{cap.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
