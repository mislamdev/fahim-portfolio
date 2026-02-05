import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Projects } from '../components/Projects';
import { About } from '../components/About';
import { Journey } from '../components/Journey';
import { Footer } from '../components/Footer';

export function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
        <Journey />
      </main>
      <Footer />
    </div>
  );
}
