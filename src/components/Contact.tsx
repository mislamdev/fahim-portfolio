import { Mail, Phone, MapPin, Send } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-text-primary text-2xl tracking-wide mb-2">Get In Touch</h2>
          <div className="w-16 h-px bg-border mx-auto mb-6" />
          <p className="text-text-secondary max-w-lg mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities 
            to be part of your vision.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-surface rounded">
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-text-muted text-sm">Email</p>
                <a href="mailto:fahimkamal63@gmail.com" className="text-text-primary hover:text-accent transition-colors">
                  fahimkamal63@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-surface rounded">
                <Phone className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-text-muted text-sm">Phone</p>
                <a href="tel:+8801917447979" className="text-text-primary hover:text-accent transition-colors">
                  +880 1917 447979
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-surface rounded">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-text-muted text-sm">Location</p>
                <p className="text-text-primary">Dhaka, Bangladesh</p>
              </div>
            </div>

            <div className="pt-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-light rounded text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-text-secondary">Open to opportunities • Willing to relocate</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            action="mailto:fahimkamal63@gmail.com"
            method="GET"
            className="space-y-4"
          >
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 bg-surface border border-border rounded text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full px-4 py-3 bg-surface border border-border rounded text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
              />
            </div>
            <div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                className="w-full px-4 py-3 bg-surface border border-border rounded text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
              />
            </div>
            <div>
              <textarea
                name="body"
                rows={4}
                placeholder="Your Message"
                required
                className="w-full px-4 py-3 bg-surface border border-border rounded text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-background font-medium rounded hover:bg-accent-light transition-colors"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
