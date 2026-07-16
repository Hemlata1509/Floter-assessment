import Header from "./components/Header";
import Hero from "./components/Hero";
import WhatWeDo from "./components/WhatWeDo";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import Stats from "./components/Stats";

function App() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <main>
        <Hero />
        <WhatWeDo />
        <Stats />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
