import classNames from "classnames";
import Link from "next/link";

interface DropdownListProps {
  page: { title: string; link: string };
  peptidesDropMenuLinks: { id: number; title: string; link: string }[];
  selectPeptideCategoriesHandler: (
    category: string,
    event: React.MouseEvent
  ) => void;
  activeCategoryInDropdown: string;
  closePopover?: () => void;
}

export const DropdownList: React.FC<DropdownListProps> = ({
  page,
  peptidesDropMenuLinks,
  selectPeptideCategoriesHandler,
  activeCategoryInDropdown,
  closePopover,
}) => {
  return (
    <div className="w-full bg-[#424242] ">
      {page.title === "Buy Peptides" && (
        <ul className="m-0 flex w-full flex-col items-start gap-4 py-4 pl-8 font-normal">
          {/* All Products link */}
          <li
            onClick={(e) => selectPeptideCategoriesHandler("All Products", e)}
            className={classNames({
              "cursor-pointer group-hover/link:text-textWhite": true,
              "animate-font-weight font-bold !text-textWhite":
                activeCategoryInDropdown === "All Products",
            })}
          >
            <Link href="/shop" onClick={closePopover}>
              All Products
            </Link>
          </li>
          {peptidesDropMenuLinks?.map((item) => (
            <li
              key={item.id}
              onClick={(e) => selectPeptideCategoriesHandler(item.title, e)}
              className={classNames({
                "cursor-pointer group-hover/link:text-textWhite": true,
                "animate-font-weight font-bold !text-textWhite":
                  item.title === activeCategoryInDropdown,
              })}
            >
              {item.title}{" "}
            </li>
          ))}
        </ul>
      )}{" "}
    </div>
  );
};
