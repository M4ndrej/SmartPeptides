import classNames from "classnames";
import { Dispatch, FC, SetStateAction } from "react";

interface ViewToggleProps {
  selectedView: string;
  setSelectedView: Dispatch<SetStateAction<string>>;
  views?: string[];
}

const ViewToggle: FC<ViewToggleProps> = ({
  selectedView,
  setSelectedView,
  views = ["List", "Chart"],
}) => {
  return (
    <ul className="flex items-center justify-start gap-2">
      {views.map((view) => (
        <li key={view}>
          <button
            type="button"
            onClick={() => setSelectedView(view)}
            className={classNames(
              "font-D16px-M13px p-0.5 text-gray2 transition duration-300 hover:text-[#E7461E]",
              selectedView === view && "font-bold !text-[#E7461E]"
            )}
          >
            {view}
          </button>
          <div
            className={classNames(
              "h-0.5 w-full rounded-full bg-transparent",
              selectedView === view && "!bg-[#E7461E]"
            )}
          />
        </li>
      ))}
    </ul>
  );
};

export default ViewToggle;
