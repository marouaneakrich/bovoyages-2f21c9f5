import { cn } from "@/lib/utils";
import logoImg from "@/assets/logo.png";

const Logo = ({ light = false, className }: { light?: boolean; className?: string }) => {
  return (
    <span
      className={cn(
        "flex items-center gap-2.5 font-serif text-xl font-medium tracking-tight transition-colors",
        light ? "text-primary-foreground" : "text-foreground",
        className
      )}
    >
      <img
        src={logoImg}
        alt="Bo Voyages"
        className="h-9 w-auto object-contain"
        loading="eager"
        decoding="async"
      />
    </span>
  );
};

export default Logo;
