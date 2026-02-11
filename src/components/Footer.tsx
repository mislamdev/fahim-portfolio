import { FileText, Mail, Linkedin, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contact" className="bg-surface-light">
      {/* Main Footer Content */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left - Thank You Message */}
            <div>
              <h2 className="text-text-primary text-2xl tracking-wide mb-6">Thank you for stopping by!</h2>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>If you want to come in contact, I'm available by email or message on LinkedIn.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Open for business inquiries regarding Game Development, Level Design, and Game Production.</span>
                </li>
              </ul>
            </div>

            {/* Right - Contact Links */}
            <div className="space-y-4">
              <a
                href="/Fahim_Kamal_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-text-primary hover:text-accent transition-colors"
              >
                <FileText className="w-5 h-5 text-accent" />
                <span>Resume</span>
              </a>
              <a
                href="mailto:fahimkamal63@gmail.com"
                className="flex items-center gap-3 text-text-primary hover:text-accent transition-colors"
              >
                <Mail className="w-5 h-5 text-accent" />
                <span>fahimkamal63@gmail.com</span>
              </a>
              <a
                href="https://www.linkedin.com/in/fk-ahmed"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-text-primary hover:text-accent transition-colors"
              >
                <Linkedin className="w-5 h-5 text-accent" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/FahimKamal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-text-primary hover:text-accent transition-colors"
              >
                <Github className="w-5 h-5 text-accent" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="py-5 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-text-muted text-sm">Fahim Kamal Portfolio</p>
            <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <a href="#personal" className="text-text-muted hover:text-text-primary transition-colors">
                Personal Projects
              </a>
              <a href="#professional" className="text-text-muted hover:text-text-primary transition-colors">
                Professional Work
              </a>
              <a href="#about" className="text-text-muted hover:text-text-primary transition-colors">
                About
              </a>
              <a href="#contact" className="text-text-muted hover:text-text-primary transition-colors">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
