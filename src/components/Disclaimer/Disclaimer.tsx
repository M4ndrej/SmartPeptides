"use client";

import { FC, useState } from "react";
import classNames from "classnames";

interface disclamerProps {
  expand?: boolean;
}

const Disclaimer: FC<disclamerProps> = ({ expand }) => {
  const [isExapnded, handleExpand] = useState(false);
  return (
    <div className="flex flex-col gap-y-[12px]">
      <div className="font-16px-ALL font-bold">DISCLAIMER:</div>
      <div className="border-1 rounded-[5px] border border-red px-[24px] py-[16px] sm:px-[16px]">
        <div
          className={classNames({
            "font-16px-ALL sm:font-13px-ALL": true,
            "overflow-hidden text-ellipsis transition-all duration-300 ease-in-out sm:h-[168px] sm:max-h-[168px] from834:max-h-[202px] lg:max-h-[248px] xl:max-h-full":
              expand,
            "sm:!h-max sm:!max-h-[1000px] from834:!max-h-[1000px] lg:!max-h-[1000px]":
              isExapnded,
          })}
        >
          <ul className="flex list-disc flex-col gap-[8px] text-ellipsis">
            <li className="flex items-start gap-[16px] sm:gap-[8px]">
              <span className="mt-[8px] block min-h-[6px] min-w-[6px] rounded-[6px] bg-black sm:min-h-[4px] sm:min-w-[4px]"></span>
              <p>
                Products sold on our website are designed for in vitro testing
                and lab experimentation exclusively.
              </p>
            </li>
            <li className="flex items-start gap-[16px] sm:gap-[8px]">
              <span className="mt-[8px] block min-h-[6px] min-w-[6px] rounded-[6px] bg-black sm:min-h-[4px] sm:min-w-[4px]"></span>
              <p>
                All the products you see on the website are being sold in a
                lyophilized powder state (freeze-dried), in a sealed sterile
                vial; and should be reconstituted.
              </p>
            </li>
            <li className="flex items-start gap-[16px] sm:gap-[8px]">
              <span className="mt-[8px] block min-h-[6px] min-w-[6px] rounded-[6px] bg-black sm:min-h-[4px] sm:min-w-[4px]"></span>
              <p>
                The product’s label clearly states the amount of product a vial
                contains; some products are offered in different variations.
              </p>
            </li>
            <li className="flex items-start gap-[16px] sm:gap-[8px]">
              <span className="mt-[8px] block min-h-[6px] min-w-[6px] rounded-[6px] bg-black sm:min-h-[4px] sm:min-w-[4px]"></span>
              <p>
                The products we are selling come in a sealed vial but require
                additional lab equipment for proper testing.
              </p>
            </li>
          </ul>
        </div>
        {expand && !isExapnded && (
          <div
            className={classNames({
              "w-full items-center justify-center pt-[16px] text-center sm:flex xl:hidden":
                true,
              hidden: isExapnded && expand,
            })}
            onClick={() => {
              handleExpand(true);
            }}
          >
            <div className="font-D16px-M16px mr-[8px] inline-flex items-center text-gray2">
              Load more
              <svg
                className="ml-[4px]"
                width="13"
                height="6"
                viewBox="0 0 13 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 0.5L6.5 5.5L12 0.5"
                  stroke="#999999"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Disclaimer;
