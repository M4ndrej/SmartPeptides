import React from "react";
import Spinner from "../SvgComponents/Spinner";
import EditIcon from "./EditIcon";
import classNames from "classnames";

interface ChangeEmailIconProps {
  emailEditState?: string;
  handleEmailIconClick?: () => void;
}

const ChangeEmailIcon: React.FC<ChangeEmailIconProps> = ({
  emailEditState,
  handleEmailIconClick,
}) => {
  return (
    <>
      {emailEditState === "loading" ? (
        <div className="flex w-[121px] items-center justify-end rounded-[4px] border border-transparent">
          <Spinner customClass="mr-2" />
        </div>
      ) : (
        <div
          onClick={handleEmailIconClick}
          className={classNames(
            "flex cursor-pointer items-center rounded-[4px] border border-transparent bg-borderColor px-[6px] py-[5px] text-gray2 transition-colors duration-200 hover:bg-transparent",
            emailEditState === "edit" &&
              "!bg-[#E7461E] !text-white hover:!bg-[#2B6DA3]"
          )}
        >
          <span className="ml-[6px] mr-[4px] text-[12px] ">
            {emailEditState === "view" ? "Change Email" : "Save Email"}
          </span>
          {emailEditState !== "edit" && emailEditState !== "loading" && (
            <EditIcon
              width={15}
              height={15}
              className="stroke-current fill-current"
            />
          )}
        </div>
      )}
    </>
  );
};

export default ChangeEmailIcon;
