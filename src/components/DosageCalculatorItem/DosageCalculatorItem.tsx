"use client";
import { ChangeEvent, FC, ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { DosageCalculator } from "@/types/dosageCalculatorItems";
import Input from "@/components/Input/Input";
import classNames from "classnames";

interface ItemsListProps {
  title: string;
  description: ReactNode;
  items: DosageCalculator;
  imageStyle?: string;
  setAmount?: (e: string) => void;
  setAmountLast?: (e: string) => void;
  amount?: string;
  doseVolume?: string;
  placeholder?: string;
  showDose?: boolean;
  customClass?: string;
  amountLast?: string;
  showMlMg?: boolean;
  mlMgText?: string;
  type?: string;
}
const DosageCalculatorItem: FC<ItemsListProps> = ({
  items,
  title,
  description,
  imageStyle,
  setAmount,
  amount,
  placeholder,
  showDose,
  customClass,
  showMlMg,
  amountLast,
  setAmountLast,
  mlMgText,
  type,
}) => {
  const [otherVolumes, setOtherVolumes] = useState<boolean>(false);
  const [otherVolumesSelected, setOtherVolumesSelected] =
    useState<boolean>(false);
  const [mcgOrMg, setMcgOrMg] = useState<string>("mcg");
  const [doseVolume, setDoseVolume] = useState<string>("250");
  const [widthOfinput, setWidthOfInput] = useState("140px");

  // Input for peptide amout and input for bacteriostatic water
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const volume = e.target.value;

    // if input field is empty set default value
    if (e.target.value.trim() === "") {
      if (items.item === "peptideAmount") {
        setAmount?.("5mg");
      } else if (items.item === "bacteriostaticWater") {
        setAmount?.("1ml");
      }
    } else {
      setAmount && setAmount(volume);
    }
  };

  // Input for Choose your required dose
  const doseEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const calculatedWidth = `${value.length * 8 + 140}px`;
    setWidthOfInput(calculatedWidth);

    setDoseVolume(e.target.value);
    setAmountLast && setAmountLast(e.target.value + mcgOrMg);
  };

  useEffect(() => {
    setAmountLast && setAmountLast(doseVolume + mcgOrMg);
  }, [doseVolume, mcgOrMg]);

  const setOtherVolumesHandler = () => {
    setOtherVolumes((prevState) => !prevState);
    setOtherVolumesSelected((prevState) => !prevState);
  };

  return (
    <>
      <div>
        <div className="font-D16px-M13px mb-[24px] font-bold">{title}</div>
        <div>{description}</div>
        <div className="flex items-center sm:flex-col sm:gap-[16px]">
          <Image
            src={
              type === "peptides" && amount && items.volumes?.includes(amount)
                ? `/images/peptide${amount}.png`
                : items.image
            }
            width={items.imageWidth}
            height={items.imageHeight}
            alt="Calculator"
            className={`h-[${items.imageHeight}px] w-[${items.imageWidth}}px] mr-[16px] select-none sm:mr-0 ${imageStyle}`}
          />
          <div className="flex flex-wrap gap-[16px] sm:justify-center">
            {items.volumes.map((item, index: number) => (
              <div
                key={index}
                className={`font-D16px-M14px transition-bg  flex h-[38px] cursor-pointer select-none items-center rounded-[2px] border px-[16px] py-[6px] duration-200 sm:max-h-[30px] sm:px-[14px] sm:py-[4px]  
                  ${
                    (item === amount && !otherVolumesSelected) ||
                    (item === amountLast && !otherVolumesSelected)
                      ? "border-[#333333] bg-[#333333] text-white"
                      : "border-gray2 text-gray2 hover:border-[#333333] hover:text-[#333333]"
                  }
                  `}
                onClick={() => {
                  setAmount && setAmount?.(item);
                  setAmountLast && setAmountLast?.(item);
                  setOtherVolumesSelected(false);
                }}
              >
                {item}
              </div>
            ))}
            {items?.otherVolumes?.length && (
              <div
                className={classNames({
                  "font-D16px-M14px flex h-[38px] cursor-pointer select-none items-center rounded-[2px] border border-gray bg-lightgray px-[16px] py-[6px] text-gray2 transition duration-300 hover:border-[#333333] hover:bg-white hover:text-[#333333] sm:max-h-[30px] sm:px-[14px] sm:py-[4px]":
                    true,
                  "!border-[#333333] !bg-[#333333] !text-white":
                    otherVolumesSelected,
                })}
                onClick={() => setOtherVolumesHandler()}
              >
                Other
              </div>
            )}
            {otherVolumesSelected && (
              <Input
                placeholder={placeholder}
                onChange={handleInput}
                dose={["mcg", "mg"]}
                showDose={showDose}
                type="number"
                showMlMg={showMlMg}
                mlMgText={mlMgText}
                doseEvent={doseEvent}
                mcgOrMgChange={setMcgOrMg}
                required={false}
                style={showDose ? widthOfinput : "100px"}
                customClass=" appearance:textfield font-16px-ALL remove-number-input-arrows !h-[38px] rounded-[2px] border border-[#333333] px-[16px] py-[7px] sm:px-[14px] sm:py-[4px] sm:max-h-[31px] text-gray2 outline-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DosageCalculatorItem;
