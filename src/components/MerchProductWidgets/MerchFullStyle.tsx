import { ProductNew } from "@/types/product";
import { FC, useEffect, useMemo, useState } from "react";
import MerchFit from "./MerchFit";
import MerchStyle from "./MerchStyle";
import classNames from "classnames";

const validFullStyles = ["Male Regular", "Female Regular", "Female Loose"];

interface MerchFullStyleProps {
  mainProduct: ProductNew;
  selectedFullStyle: string | undefined;
  handleChangeFullStyle: (option: string) => void;
  handleClearFullStyle: () => void;
  hasOverlay?: boolean;
  setHasOverlay?: (val: boolean) => void;
  redBorder?: boolean;
}

const MerchFullStyle: FC<MerchFullStyleProps> = ({
  mainProduct,
  selectedFullStyle,
  handleChangeFullStyle,
  handleClearFullStyle,
  hasOverlay,
  setHasOverlay,
  redBorder,
}) => {
  const [selectedFit, setSelectedFit] = useState("Male fit");
  const [selectedStyle, setSelectedStyle] = useState<string | undefined>();

  const subStyleOptions = useMemo(() => {
    if (selectedFit === "Male fit") return ["Regular"];
    return ["Regular", "Loose"];
  }, [selectedFit]);

  useEffect(() => {
    if (selectedFullStyle) {
      const [fit, style] = selectedFullStyle.split(" ");
      setSelectedFit(fit + " fit");
      setSelectedStyle(style);
    }
  }, [selectedFullStyle]);

  const handleChangeFit = (val: string) => {
    setSelectedFit(val);
    const newVal = `${val.slice(0, -4)} ${selectedStyle ?? ""}`;
    if (validFullStyles.includes(newVal)) {
      handleChangeFullStyle(newVal);
    } else {
      handleClearFullStyle();
      setSelectedStyle(undefined);
    }
  };

  const handleChangeStyle = (val: string) => {
    setSelectedStyle(selectedStyle === val ? undefined : val);
    const newVal = `${selectedFit.slice(0, -4)} ${val}`;
    if (validFullStyles.includes(newVal)) {
      handleChangeFullStyle(newVal);
    } else {
      handleClearFullStyle();
      setSelectedFit("");
    }
  };

  const handleClearStyle = () => {
    setSelectedStyle(undefined);
    handleClearFullStyle();
  };

  return (
    <div
      className={classNames(
        "flex w-max flex-col gap-2 border-2 border-transparent",
        hasOverlay &&
          !selectedFullStyle &&
          !redBorder &&
          "z-[99999999999991] bg-white",
        hasOverlay &&
          !selectedFullStyle &&
          redBorder &&
          "z-[99999999999991] rounded-[5px] border-2 !border-red"
      )}
    >
      <MerchFit
        mainProduct={mainProduct}
        selectedFit={selectedFit}
        handleChangeFit={handleChangeFit}
        options={["Male fit", "Female fit"]}
      />

      <MerchStyle
        mainProduct={mainProduct}
        selectedStyle={selectedStyle}
        handleChangeStyle={handleChangeStyle}
        handleClearStyle={handleClearStyle}
        options={subStyleOptions}
        selectedFit={selectedFit}
      />
    </div>
  );
};

export default MerchFullStyle;
