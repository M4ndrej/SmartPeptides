"use client";

import { FC, useEffect, useState } from "react";
import DosageCalculatorItem from "../DosageCalculatorItem/DosageCalculatorItem";
import SyringeMeasure from "../SyringeMeasure/SyringeMeasure";
import {
  bacteriostaticWaterList,
  peptideDoseList,
  peptideAmountList,
  syringeVolumeList,
} from "@/data/dosage_calculator";

const DosageCalculator: FC = ({}) => {
  const [syringeVolume, setSyringeVolume] = useState("0.5ml");
  const [peptideAmount, setPeptideAmount] = useState("5mg");
  const [bacteriostaticWater, setBacteriostaticWater] = useState("1ml");
  const [peptideDose, setPeptideDose] = useState("250mcg");

  useEffect(() => {
    const containsNumberInPeptide: boolean = /\d/.test(peptideDose);
    !containsNumberInPeptide ? setPeptideDose("250mcg") : "";
  }, [peptideDose]);

  return (
    <>
      <div className="mt-[48px] w-full sm:mt-[48px] md:mt-[48px]">
        <div className="container-padding-inline m-[auto] w-[100%] max-w-[1264px] pb-[96px] sm:max-w-[100vw] sm:pb-[64px] md:max-w-[100vw] md:flex-col">
          <div className="sm:mr-0 sm:w-[100%] sm:pt-0 md:mr-0 md:w-[100%]">
            <h1 className="font-D32px-M24px pb-[16px] font-bold">
              Peptide Dosage Calculator
            </h1>
            <div className="mb-[4px] h-[2px] w-[48px] bg-[#9A9A9F]"></div>
            <div className="font-D16px-M13px mt-5">
              We already talked about the best way of storing and transporting
              peptides is when they’re in lyophilized (powder) form. But, this
              means you need to reconstitute them before using. This process is
              the same regardless of the exact peptide you want to use, whether
              it’s semaglutide, tirzepatide, cjc-1295, bpc 157 and others.
              <br />
              <br />
              But, how can you be sure you’re reconstituting your peptides
              correctly? This is where our peptide calculator comes in. Using
              our peptide dosage calculator allows you to put in the exact
              amount of peptide you need, choose the syringe volume and the
              required dosage.
              <br />
              <br />
              This is how it works:
            </div>

            <div className="mt-[16px] flex flex-col gap-[40px] sm:gap-[56px] lg:mt-[24px]">
              <DosageCalculatorItem
                title="Step 1 - Choose syringe volume:"
                description={
                  <div className="font-D16px-M13px mb-5">
                    If you’ve bought syringes on our website, you noticed we
                    offer two different sizes - 0.5 and 1 ml. These are the
                    standard volumes most of our customers use and these are the
                    volumes used in our calculations (if you bought your syringe
                    somewhere else and the volume is different, our calculator
                    might not work for you).
                    <div className="ml-3">
                      <br />
                      &#9679;{" "}
                      <span className="font-D16px-M13px mb-[24px] font-bold">
                        0.5ml syringe
                      </span>{" "}
                      - since the majority of our clients are labs studying the
                      properties and effectiveness of different peptides, we
                      opted for the smallest one available as it allows for the
                      most precise measurement.
                    </div>
                    <div className="mb-5 ml-3">
                      &#9679;{" "}
                      <span className="font-D16px-M13px mb-[24px] font-bold">
                        1ml
                      </span>{" "}
                      - this syringe is a bit larger and holds more volume
                    </div>
                    Both syringes are marked in 10 unit increments to make it
                    easy for you to pull the desired amount (based on our
                    calculation).
                    <br />
                    <br />
                    So, your first step is to pick the volume option you’ve
                    bought - 0.5 or 1ml.
                  </div>
                }
                items={syringeVolumeList}
                imageStyle={
                  "mr-[20px] h-[205px] object-cover h-[1] sm:!h-[185px] sm:w-[104px]"
                }
                amount={syringeVolume}
                setAmount={setSyringeVolume}
                placeholder={"Enter a value"}
                customClass={"text-center"}
              />

              <DosageCalculatorItem
                title="Step 2 - Choose peptide amount (mg):"
                description={
                  <div className="font-D16px-M13px mb-5">
                    This is one of the most crucial steps in our calculation
                    since we use this measurement to see how much peptide powder
                    you’ve got. Based on it, our calculator will tell you how
                    much solvent you need.
                    <br />
                    <br />
                    If you’ve ordered from our website before (or browsed it
                    casually), you see we primarily offer peptides in vials of 5
                    and 10 mg. But, our calculator features other common
                    measurements, including - 20 and 50 mg, as well as a field
                    where you can type in a custom measurement.
                  </div>
                }
                items={peptideAmountList}
                imageStyle={"mr-[16px] h-[191px] sm:w-[143px] object-cover"}
                amount={peptideAmount}
                setAmount={setPeptideAmount}
                placeholder={"5"}
                customClass={"text-center"}
                showMlMg={true}
                mlMgText="mg"
                type="peptides"
              />

              <DosageCalculatorItem
                title="Step 3 - Adding Solvent:"
                description={
                  <div className="font-D16px-M13px mb-5">
                    For this step, you’ll have to choose a solvent. In theory,
                    you can choose pretty much any solvent you’d like, but our
                    recommendation is to go with bacteriostatic water. Why?
                    Because bacteriostatic water is specially prepared water for
                    medicinal purposes. It is sterile, non-pyrogenic (does not
                    cause a fever) and comes with 0.9% benzyl alcohol that
                    serves as a bacteriostatic preservative. So, with
                    bacteriostatic water, you are limiting the possibility of
                    bacterial growth or other complications that might mess up
                    your lab testing/results.
                    <br />
                    <br />
                    You can also{" "}
                    <a href="https://smartpeptides.bio//product/bacteriostatic-water-30ml/">
                      buy bacteriostatic water
                    </a>{" "}
                    directly from our website.
                  </div>
                }
                items={bacteriostaticWaterList}
                imageStyle={"mr-[8px]"}
                amount={bacteriostaticWater}
                setAmount={setBacteriostaticWater}
                placeholder={"1"}
                customClass={"text-center"}
                showMlMg={true}
                mlMgText="ml"
              />
              <DosageCalculatorItem
                title="Step 4 - Choose your required dose (mcg/mg):"
                description={
                  <div className="font-D16px-M13px mb-5">
                    This is the step where you choose what peptide you want to
                    inject in the dose you&apos;re preparing, and is generally
                    calculated in micrograms (mcg). This number helps our
                    calculator figure out how concentrated you want your
                    solution to be, do you need more or less peptide powder for
                    your desired dosage.
                  </div>
                }
                items={peptideDoseList}
                imageStyle={"mr-[20px]"}
                amountLast={peptideDose}
                setAmountLast={setPeptideDose}
                placeholder={"250"}
                showDose={true}
                customClass={"pr-[85px]"}
              />
              <div>
                <div className="font-D16px-M13px mb-[24px] font-bold">
                  Step 5 - Checking Your Results:
                </div>
                <div className="font-D16px-M13px">
                  Once you’ve added the required parameters (syringe volume,
                  amount of peptides and solvent), you’ll see the end result -
                  dosage and how many units you need to pull using your syringe.
                  <br />
                  <br /> We’ve made it easy for you by modeling the units after
                  the syringe, so you don’t have to worry about missing your
                  dose!
                </div>
              </div>

              <SyringeMeasure
                peptideDose={peptideDose}
                peptideAmount={peptideAmount}
                bacteriostaticWater={bacteriostaticWater}
                syringeVolume={syringeVolume}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DosageCalculator;
