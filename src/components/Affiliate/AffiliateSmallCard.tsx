import { FC, ReactNode } from "react";

interface AffiliateSmallCardProps {
  icon: ReactNode;
  title: string;
  color: string;
  description: string;
}

const AffiliateSmallCard: FC<AffiliateSmallCardProps> = ({
  icon,
  title,
  color,
  description,
}) => {
  return (
    <li className="flex w-full items-center justify-start gap-4 sm:flex-col sm:items-start">
      <div className="w- max flex items-center justify-start gap-2">
        <div className="flex h-10 w-10 items-center justify-center">{icon}</div>
        <span
          className="font-24px-ALL block font-bold"
          style={{ color: color }}
        >
          {title}
        </span>
      </div>
      <div
        className="h-[2px] w-[10px] rounded-full sm:hidden"
        style={{ backgroundColor: color }}
      />
      <p>{description}</p>
    </li>
  );
};

export default AffiliateSmallCard;
