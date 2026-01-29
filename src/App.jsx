import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import StickySocials from './components/StickySocials';

function App() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-purple-500/30">
      <Navbar />
      <StickySocials />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Contact />
      <Footer />
      <ChatWidget />
    </main>
  );
}

export default App;
