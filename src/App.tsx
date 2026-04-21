import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import SiteLayout from "./components/SiteLayout";
import LoadingScreen from "./components/LoadingScreen";
import Index from "./pages/Index";

const Tours = lazy(() => import("./pages/Tours"));
const TourDetail = lazy(() => import("./pages/TourDetail"));
const Excursions = lazy(() => import("./pages/Excursions"));
const ExcursionDetail = lazy(() => import("./pages/ExcursionDetail"));
const Transfers = lazy(() => import("./pages/Transfers"));
const Booking = lazy(() => import("./pages/Booking"));
const Confirmation = lazy(() => import("./pages/Confirmation"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const Loader = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LoadingScreen />
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/tours" element={<Tours />} />
              <Route path="/tours/:slug" element={<TourDetail />} />
              <Route path="/excursions" element={<Excursions />} />
              <Route path="/excursions/:slug" element={<ExcursionDetail />} />
              <Route path="/transfers" element={<Transfers />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
