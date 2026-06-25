import { FC } from "react";

interface BacsInfoProps {
  includeInstructions?: boolean;
}

export const BacsInfo: FC<BacsInfoProps> = ({ includeInstructions = true }) => {
  return (
    <div className="font-D16px-M13px flex flex-col gap-4 rounded-[5px] border-2 border-dashed border-[#9A9A9F] bg-lightgray p-4 md:p-6 lg:p-6">
      {includeInstructions && (
        <p>
          You can send us a Wire or ACH payment with the following information.
        </p>
      )}
      {/* 2316 Wisconsin Ave, Downers Grove, IL 60515 */}
      <div className="flex flex-col gap-0">
        <span className="font-bold">Account name and address:</span>
        <span>PEPTIDE COM, Inc.</span>
        <span>2316 Wisconsin Ave</span>
        <span>Downers Grove, IL 60515 USA</span>
      </div>

      <div className="flex flex-col gap-0">
        <span className="font-bold">Receiving Bank Name and address:</span>
        {/* <span>Revolut Technologies Inc</span> */}
        <span> JPMorgan Chase Bank</span>
      </div>

      <div className="flex flex-col gap-0">
        <p className="font-bold">
          Account number:
          {/* <span className="text-darkgray">217422690586</span> */}
          <span className="text-darkgray"> 566086123</span>
        </p>
      </div>

      <div className="flex flex-col gap-0">
        <p className="font-bold">(USA Customers only)</p>
        <p>
          Wire Routing Number:
          {/* <span className="text-darkgray">101019644</span> */}
          <span className="text-darkgray"> 021000021</span>
        </p>
        <p>
          ACH Routing Number:
          {/* <span className="text-darkgray">101019644</span> */}
          <span className="text-darkgray"> 071000013</span>
        </p>
      </div>

      <div className="flex flex-col gap-0">
        <p className="font-bold">(Global Customers Only)</p>
        <p>
          Wire Routing Number:
          {/* <span className="text-darkgray">101019644</span> */}
          <span className="text-darkgray"> 021000021</span>
        </p>
        <p>
          Swift Code/BIC:
          {/* <span className="text-darkgray">REVOUS31</span> */}
          <span className="text-darkgray"> CHASUS33</span>
        </p>
        {/* <p>
          Intermediary BIC: <span className="text-darkgray">CHASGB2L</span>
        </p> */}
      </div>

      <div className="flex flex-col gap-0">
        <span className="font-bold">ORDER NUMBER</span>
        <span>Write your order number as a reference</span>
      </div>
      {includeInstructions && <p>Thank you</p>}
    </div>
  );
};
