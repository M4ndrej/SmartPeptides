import { ProductNew } from "@/types/product";
import SingleProductAttributes from "../SingleProductWidgets/SingleProductAttributes";
import { FC, useMemo } from "react";
import classNames from "classnames";
import AuthorizedImage from "../Image/Image";

interface SingleMerchVersionProps {
  version: string;
  mainProduct?: ProductNew;
  selectedVersion?: string;
}

const SingleMerchVersion: FC<SingleMerchVersionProps> = ({
  version,
  mainProduct,
  selectedVersion,
}) => {
  const versionImage = useMemo(() => {
    return mainProduct?.variations.find((v) => {
      const versionAttribute = v.attributes.find((a) => a.name === "Version");
      const colorAttribute = v.attributes.find((a) => a.name === "Color");
      return (
        versionAttribute?.option === version &&
        colorAttribute?.option === "White"
      );
    })?.image?.[0];
  }, [mainProduct, version]);

  return (
    <div className="relative flex flex-col items-center gap-2">
      <div
        className={classNames(
          "relative h-16 w-16 overflow-hidden rounded-[5px] border-2",
          selectedVersion === version ? "border-[#E7461E]" : "border-lightgray"
        )}
      >
        {!!versionImage && (
          <AuthorizedImage
            src={versionImage.src}
            width={128}
            height={128}
            alt={versionImage.alt}
            className="pointer-events-none absolute left-0 top-[-32px] h-[128px] w-[128px] object-cover object-center"
          />
        )}
      </div>
      <span className="text-center">#{version}</span>
    </div>
  );
};

interface MerchVersionsProps {
  mainProduct: ProductNew;
  selectedVersion: string | undefined;
  handleChangeVersion: (option: string) => void;
  handleClearVersion: () => void;
  hasOverlay?: boolean;
  setHasOverlay?: (val: boolean) => void;
  redBorder?: boolean;
}

const MerchVersions: FC<MerchVersionsProps> = ({
  mainProduct,
  selectedVersion,
  handleChangeVersion,
  handleClearVersion,
  hasOverlay,
  setHasOverlay,
  redBorder,
}) => {
  const versionAttribute = mainProduct.attributes.find(
    (a) => a.name === "Version"
  );

  const numberOfVersions = versionAttribute?.options?.length ?? 0;

  if (!versionAttribute) return null;

  return (
    <SingleProductAttributes
      title={`VERSIONS (${numberOfVersions})`}
      mainProduct={mainProduct}
      options={versionAttribute.options}
      selectedOption={selectedVersion}
      handleChangeOption={handleChangeVersion}
      handleClearOption={handleClearVersion}
      hasOverlay={hasOverlay}
      setHasOverlay={setHasOverlay}
      redBorder={redBorder}
      renderOption={(option) => (
        <SingleMerchVersion
          version={option}
          selectedVersion={selectedVersion}
          mainProduct={mainProduct}
        />
      )}
    />
  );
};

export default MerchVersions;
