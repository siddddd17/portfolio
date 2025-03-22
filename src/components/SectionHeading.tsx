
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

const SectionHeading = ({
  title,
  subtitle,
  centered = false,
  className = "",
}: SectionHeadingProps) => {
  return (
    <div className={cn(
      "mb-12",
      centered && "text-center",
      className
    )}>
      <div className="inline-block">
        {subtitle && (
          <span className="inline-block mb-2 px-3 py-1 text-xs font-medium bg-gray-100 rounded-full">
            {subtitle}
          </span>
        )}
      </div>
      <h2 className="font-medium tracking-tight">{title}</h2>
    </div>
  );
};

export default SectionHeading;
