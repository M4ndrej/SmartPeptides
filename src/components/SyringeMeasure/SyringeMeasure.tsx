"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
interface Dose {
  peptideDose: string;
  peptideAmount: string;
  bacteriostaticWater: string;
  syringeVolume: string;
}
const SyringeMeasure: FC<Dose> = ({
  peptideDose,
  peptideAmount,
  bacteriostaticWater,
  syringeVolume,
}) => {
  const [finalDose, setFinalDose] = useState(0.25);
  const [syringeIsSmall, setSyringeIsSmall] = useState(false);
  const convertUnits = (value: number, unit: string) => {
    const cleanValue = (value: string) => {
      return value.replace(/[^\d\s.]/g, "");
    };

    const modifiedPeptideAmount = cleanValue(peptideAmount);
    const modifiedBacteriostaticWater = cleanValue(bacteriostaticWater);
    const liquidPeptideAmount = parseFloat(modifiedPeptideAmount);
    const liquidBacteriostaticWater = parseFloat(modifiedBacteriostaticWater);

    // Take mcg or mg from value recived for if else
    const McgOrMg = unit.replace(/[0-9]/g, "");
    // Check if is mcg or mg for calculation
    if (McgOrMg === "mcg") {
      const totalMcg =
        (((value / 1000) * liquidBacteriostaticWater) / liquidPeptideAmount) *
        100;
      if (totalMcg < 101) {
        // If syringe is smaller then value from totalMcg then show text
        if (syringeVolume === "0.5ml" && totalMcg < 51) {
          setSyringeIsSmall(false);
          return setFinalDose(
            Math.floor(
              (((value / 1000) * liquidBacteriostaticWater) /
                liquidPeptideAmount) *
                100
            )
          );
        } else if (syringeVolume === "1ml" && totalMcg < 101) {
          setSyringeIsSmall(false);
          return setFinalDose(
            Math.floor(
              (((value / 1000) * liquidBacteriostaticWater) /
                liquidPeptideAmount) *
                100
            )
          );
        }
        // If value is greater then 100 then show text that syringe is small
        else {
          setSyringeIsSmall(true);
        }
      } else {
        setSyringeIsSmall(true);
      }
    } else if (McgOrMg === "mg") {
      const totalMg =
        (value * 1000 * liquidBacteriostaticWater) / liquidPeptideAmount / 10;

      // Check if value is not greater then largest syringe
      if (totalMg < 101) {
        setSyringeIsSmall(false);
        // Check if syringe value is 0.5ml and if total is not greater  then it's value it is 50 max
        if (syringeVolume === "0.5ml" && totalMg < 51) {
          setSyringeIsSmall(false);
          return setFinalDose(
            Math.floor(
              (value * 1000 * liquidBacteriostaticWater) /
                liquidPeptideAmount /
                10
            )
          );
        }
        // Check if syringe value is 1ml and if total is not greater  then it's value it is 100 max
        else if (syringeVolume === "1ml" && totalMg < 101) {
          setSyringeIsSmall(false);
          return setFinalDose(
            Math.floor(
              (value * 1000 * liquidBacteriostaticWater) /
                liquidPeptideAmount /
                10
            )
          );
        }
        // If value is greater then 100 then show text that syringe is small
        else {
          setSyringeIsSmall(true);
        }
      } else {
        setSyringeIsSmall(true);
      }
    }
  };
  useEffect(() => {
    convertUnits(parseFloat(peptideDose), peptideDose);
  }, [peptideDose, peptideAmount, bacteriostaticWater, syringeVolume]);

  return (
    <div className="flex w-full flex-col items-center rounded-[20px] bg-[#333333] px-[90px] py-[56px] sm:px-[24px] sm:py-[24px] md:px-[16px] md:py-[40px]">
      <div className="font-D32px-M24px mb-[32px] text-center font-bold text-white sm:mb-[16px] md:mb-[24px]">
        {!syringeIsSmall ? (
          <span>
            {" "}
            To have a dose of {peptideDose}, pull the syringe to {finalDose}{" "}
            units
          </span>
        ) : (
          <span>Your syringe is too small for that dose.</span>
        )}
      </div>
      <div
        className={`w-fit-content relative h-[70px]  bg-contain bg-center bg-no-repeat`}
      >
        <Image
          src={
            syringeVolume === "0.5ml"
              ? "/images/syringe_measure.svg"
              : syringeVolume === "1ml"
                ? "/images/syringe_measure100.svg"
                : ""
          }
          width={1044}
          height={60}
          alt="Calculator"
          className={`relative z-10 h-[60px] w-[100%] select-none`}
        />

        {!syringeIsSmall && (
          <div
            className={`absolute left-[4px] top-[-2px] z-0 h-[62px] sm:left-[1.5px] sm:top-[16px] sm:h-[25px] w-[${
              syringeVolume === "0.5ml" ? finalDose * 2 : finalDose
            }%] bg-[#1B3E9073] sm:w-[$]`}
            style={{
              width: `${
                (syringeVolume === "0.5ml" && peptideDose === "2mg") ||
                (syringeVolume === "0.5ml" && peptideDose === "1mg")
                  ? finalDose * 1.97
                  : syringeVolume === "0.5ml"
                    ? finalDose * 2
                    : syringeVolume === "1ml" && peptideDose === "2mg"
                      ? finalDose * 0.985
                      : syringeVolume === "1ml" && peptideDose === "1mg"
                        ? finalDose * 0.99
                        : syringeVolume === "1ml" && peptideDose === "5mg"
                          ? finalDose * 0.98
                          : syringeVolume === "1ml" && peptideDose === "250mcg"
                            ? finalDose * 1.04
                            : finalDose
              }%`,
            }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default SyringeMeasure;
