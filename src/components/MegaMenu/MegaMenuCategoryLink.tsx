import Link from "next/link";
import { FC } from "react";

interface MegaMenuCategoryLinkProps {
  linkTitle: string;
  link: string;
  categoryCount: number;
}

const MegaMenuCategoryLink: FC<MegaMenuCategoryLinkProps> = ({
  link,
  linkTitle,
  categoryCount,
}) => {
  return (
    <Link
      href={link}
      className="font-16px-ALL mega-menu-category-link group line-clamp-1 flex items-center justify-between text-gray2 transition duration-200 hover:text-gray"
    >
      <div className="flex items-center gap-[8px]">
        <span className="h-[8px] w-[8px] rounded-[8px] !bg-[#D9D9D9] transition duration-200 group-hover:!bg-[#D9D9D9]"></span>
        <p className="line-clamp-1">{linkTitle}</p>
      </div>
      <span>({categoryCount})</span>
    </Link>
  );
};

export default MegaMenuCategoryLink;
