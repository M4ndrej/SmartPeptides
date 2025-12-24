const EmailShareButton = () => {
  const emailShareHandler = () => {
    const emailLink = `mailto:?subject=Check out this link&body=${encodeURIComponent(window.location.href)}`;
    window.location.href = emailLink;
  };

  return (
    <div onClick={emailShareHandler} className="cursor-pointer">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="[&_path]:transition [&_path]:duration-200 [&_path]:hover:stroke-[#E7461E] [&_rect]:transition [&_rect]:duration-200 [&_rect]:hover:stroke-[#E7461E]"
      >
        <rect
          x="1.5"
          y="5.25"
          width="21"
          height="14.25"
          rx="2"
          strokeWidth="1.5"
          className="stroke-black"
        />
        <path
          d="M2.25 6L10.2924 11.5678C11.3197 12.279 12.6803 12.279 13.7076 11.5678L21.75 6"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="stroke-black"
        />
      </svg>
    </div>
  );
};

export default EmailShareButton;
