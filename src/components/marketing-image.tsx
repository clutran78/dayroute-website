import Image from "next/image";
import { cn } from "../lib/utils";

interface MarketingImageProps {
  src: string;
  alt: string;
  /** max width of the graphic (marketing assets are 472×1024). */
  className?: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * Renders a DayRoute marketing graphic at its native aspect ratio (472×1024).
 * Use instead of phone-frame screenshots for the new brand assets.
 */
export function MarketingImage({
  src,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px",
}: MarketingImageProps) {
  return (
    <div
      className={cn(
        "relative w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[400px] mx-auto",
        "aspect-[472/1024] rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-card",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-contain"
        sizes={sizes}
      />
    </div>
  );
}
