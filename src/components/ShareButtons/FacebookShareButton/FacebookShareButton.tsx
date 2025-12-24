const FacebookShareButton = () => {
  const facebookShareHandler = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`
    );
  };

  return (
    <div onClick={facebookShareHandler} className="cursor-pointer">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="[&_path]:transition [&_path]:duration-200 [&_path]:hover:fill-[#E7461E] [&_rect]:transition [&_rect]:duration-200 [&_rect]:hover:fill-[#E7461E]"
      >
        <g clipPath="url(#clip0_10019_136869)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.7238 9.82464H12.9238V6.35146C13.1048 4.86854 13.9524 4.10756 15.381 4.10756H17V2.03927C16.8476 2.01976 16.7143 2.00024 16.5714 2.00024H14.4857C13.5524 2.00024 12.6571 2.26366 11.9524 2.75146C11.181 3.30756 10.6476 4.20512 10.5238 5.13195C10.4286 5.57098 10.381 6.00024 10.381 6.40024V9.87341H7V12.2734H10.3333V22.0002H13.0762V12.2246H16.4762L16.7238 9.82464Z"
            fill="#E7461E"
          />
        </g>
        <g clipPath="url(#clip1_10019_136869)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.7238 9.82439H12.9238V6.35122C13.1048 4.86829 13.9524 4.10732 15.381 4.10732H17V2.03902C16.8476 2.01951 16.7143 2 16.5714 2H14.4857C13.5524 2 12.6571 2.26341 11.9524 2.75122C11.181 3.30732 10.6476 4.20488 10.5238 5.13171C10.4286 5.57073 10.381 6 10.381 6.4V9.87317H7V12.2732H10.3333V22H13.0762V12.2244H16.4762L16.7238 9.82439Z"
            className="fill-black"
          />
        </g>
        <defs>
          <clipPath id="clip0_10019_136869">
            <rect
              width="10"
              height="20"
              fill="white"
              transform="translate(7 2.00024)"
            />
          </clipPath>
          <clipPath id="clip1_10019_136869">
            <rect
              width="10"
              height="20"
              fill="white"
              transform="translate(7 2)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default FacebookShareButton;
