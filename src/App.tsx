import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import HomePage from '@/components/home-page';
import ResidentialShareCalculator from '@/components/residential-share-calculator';
import LivingSpaceCalculator from '@/components/living-space-calculator';
import NotFound from '@/components/not-found';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/residential-share" element={<ResidentialShareCalculator />} />
            <Route path="/living-space" element={<LivingSpaceCalculator />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
