import { Mail, Linkedin, Github, Youtube } from 'lucide-react';

const roles = [
  { title: 'Unreal Engine Specialist', place: 'focusing on advanced game mechanics' },
  { title: '3D Level Designer', place: 'creating immersive environments' },
  { title: 'Game Mechanic Engineer', place: 'at Nova Labs' },
  { title: 'Lead Developer', place: 'for published mobile games' },
];

export function About() {
  return (
    <section id="about" className="py-16 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Text Content - 3 columns */}
          <div className="lg:col-span-3 space-y-6">
            <h2 className="text-text-primary text-2xl tracking-wide">Greetings!</h2>

            <p className="text-accent text-lg">
              My name is Fahim, a passionate Unreal Engine Developer & 3D Level Designer based in Kuala Lumpur, Malaysia.
            </p>

            <p className="text-text-secondary leading-relaxed">
              Since beginning my journey into game creation in 2022, I've had the privilege of experiencing 
              a path filled with creativity, collaboration, and growth. Each project I've worked on has not 
              only sharpened my technical and design skills but also strengthened my sense of purpose in this industry.
            </p>

            <p className="text-text-secondary leading-relaxed">
              Now, I've reached an exciting milestone in my journey as a game developer — working as a,
            </p>

            <ul className="space-y-2">
              {roles.map((role, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-text-muted">—</span>
                  <span>
                    <span className="text-text-primary font-medium">{role.title}</span>
                    {' '}
                    <span className="text-text-muted">{role.place}</span>
                  </span>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <a
                href="https://github.com/FahimKamal"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-surface-light rounded text-text-muted hover:text-accent transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/fk-ahmed"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-surface-light rounded text-text-muted hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@FK_1_3"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-surface-light rounded text-text-muted hover:text-accent transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="mailto:fahimkamal63@gmail.com"
                className="p-2.5 bg-surface-light rounded text-text-muted hover:text-accent transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Photo - 2 columns */}
          <div className="lg:col-span-2">
            <div className="aspect-[4/5] bg-surface-light rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-center p-8">
                <div>
                  <div className="text-6xl mb-4">👨‍💻</div>
                  <p className="text-text-primary font-medium">Fahim Kamal Ahmed</p>
                  <p className="text-text-muted text-sm mt-1">Unreal Engine Dev & Level Designer</p>
                  <p className="text-text-muted text-sm">Kuala Lumpur, Malaysia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
