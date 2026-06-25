const SingleProductShippingInfo = () => {
  return (
    <>
      <div className="font-16px-ALL font-bold">AVAILABILITY:</div>
      <div className="border-1px font-D16px-M13px mt-[12px] rounded-[5px] border border-[#9A9A9F] px-[23px] py-[23px] sm:px-[16px] sm:py-[16px] sm:leading-[16px] from834:text-[14px] lg:text-[16px] ">
        <div>
          Ships today if you order and pay by{" "}
          <span className="font-bold">12 PM CST</span>
        </div>
        <div className="pt-[8px]">
          Some product may take up to{" "}
          <span className="font-bold ">72 hours to ship</span>
        </div>
        <div className="pt-[8px]">
          Backordered items will ship in{" "}
          <span className="font-bold ">3-5 days</span>
        </div>
      </div>
    </>
  );
};

export default SingleProductShippingInfo;
