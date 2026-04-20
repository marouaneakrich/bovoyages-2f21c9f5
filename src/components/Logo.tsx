import { cn } from "@/lib/utils";

const Logo = ({ light = false, className }: { light?: boolean; className?: string }) => {
  return (
    <span
      className={cn(
        "flex items-center gap-2 font-serif text-xl font-medium tracking-tight transition-colors",
        light ? "text-primary-foreground" : "text-foreground",
        className
      )}
    >
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="15" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path
          d="M10 22 L10 10 L17 10 C20 10 22 11.5 22 14 C22 15.5 21 16.5 19.5 17 C21.5 17.4 23 18.5 23 20.5 C23 22.5 21 22 18 22 Z"
          fill="currentColor"
        />
      </svg>
      <span className="leading-none">
        Bo<span className="text-accent">.</span>Voyages
      </span>
    </span>
  );
};

export default Logo;
