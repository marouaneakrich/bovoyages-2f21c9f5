import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";
import SideRails from "./SideRails";
import RouteTransition from "./RouteTransition";

const SiteLayout = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <CustomCursor />
      <SideRails />
      <RouteTransition />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default SiteLayout;
