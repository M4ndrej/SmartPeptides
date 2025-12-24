import DetailsAccordion from "../DetailsAccordion/DetailsAccordion";

const MerchQuality = () => {
  const content = [
    "Excellent color accuracy and detail.",
    "Digital print",
    "Extreme durability",
    "Fantastic look",
    "Durable water-based ink",
    "Vibrant colors",
  ];

  return (
    <DetailsAccordion title="Print Quality" initialOpen={false}>
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

export default MerchQuality;
