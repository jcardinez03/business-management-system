import { Navbar } from "@/layout/Navbar";
import { Hero } from "@/layout/Hero";
import { Features } from "@/layout/Features";
import { CTA } from "@/layout/CTA";
import { Footer } from "@/layout/Footer";


function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />

      <main>
        <Hero />
        <Features/>
        <CTA />
      </main>

      <Footer/>
    </div>
  )
}

export default App
