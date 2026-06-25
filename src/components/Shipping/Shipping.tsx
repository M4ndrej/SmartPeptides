import { FC, ReactNode } from "react";

type ShippingBoxProps = {
  children: ReactNode;
};

const ShippingBox: FC<ShippingBoxProps> = ({ children }) => {
  return (
    <div className="font-D16px-T12px-M11px flex min-h-[72px] w-full max-w-[456px] flex-1 shrink-0 items-center justify-center rounded-[5px] border-[1px] border-solid border-[#9A9A9F] p-4 text-center sm:p-1">
      {children}
    </div>
  );
};

const Shipping = () => {
  return (
    <div className="flex items-center justify-center gap-4 xs:flex-col">
      <ShippingBox>
        <span>
          Free US shipping for orders over{" "}
          <strong className="sm:block">$250 USD</strong>
        </span>
      </ShippingBox>
      <ShippingBox>
        <span>
          Free Worldwide shipping for orders over{" "}
          <strong className="sm:block">$500 USD</strong>
        </span>
      </ShippingBox>
    </div>
  );
};

export default Shipping;
