import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <>
      <SEO title="Not found — Bo Voyages" />
      <section className="container-luxe flex min-h-[80vh] flex-col items-center justify-center text-center">
        <div className="font-serif text-7xl text-accent md:text-9xl">404</div>
        <h1 className="display-3 mt-6">This page took a wrong turn.</h1>
        <p className="mt-3 max-w-md text-muted-foreground">The page you are looking for has wandered off. Let's get you back.</p>
        <Link to="/" className="mt-8 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          {t("confirmation.home")}
        </Link>
      </section>
    </>
  );
};

export default NotFound;
