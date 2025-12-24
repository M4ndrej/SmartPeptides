import DetailsAccordion from "../DetailsAccordion/DetailsAccordion";

const MerchGarment = () => {
  const content = [
    "Mid-weight PREMIUM garment",
    "Softer and smoother feel than regular cotton",
    "Natural color, 100% premium combed cotton",
    "Soft touch",
    "Printed in the USA",
    "Durable water-based ink",
    "Vibrant colors",
  ];

  return (
    <DetailsAccordion title="Product Details" initialOpen={true}>
      <ul className="font-D16px-M15px ml-2 flex list-disc flex-col gap-[8px] text-ellipsis ">
        {content.map((item, i) => (
          <li key={i} className="flex items-start gap-[16px] sm:gap-[8px]">
            <span className="mt-[8px] block min-h-[6px] min-w-[6px] rounded-[6px] bg-black sm:min-h-[4px] sm:min-w-[4px]"></span>
            <p>{item}</p>
          </li>
        ))}
      </ul>
    </DetailsAccordion>
  );
};

export default MerchGarment;
