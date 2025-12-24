export const PromoBanner = () => {
  return (
    <div className="flex h-12 w-full items-center justify-center gap-2 border-b-[1px] border-t-[1px] border-borderColor bg-gradient-to-r from-[#FE3520] to-[#FE8410] sm:h-auto sm:px-[10px] sm:py-[10px] xl:border-t-0 dark:border-none dark:bg-gradient-to-r dark:from-[#FE3520] dark:to-[#FE8410]">
      <div className="h-2 w-2 select-none rounded-full bg-textWhite sm:hidden" />
      <div className="font-D20px-M12px font-bold text-textWhite sm:text-center">
        New customer bonus: Get 15% off when you register
      </div>
      <div className="h-2 w-2 select-none rounded-full bg-textWhite sm:hidden" />
    </div>
  );
};
