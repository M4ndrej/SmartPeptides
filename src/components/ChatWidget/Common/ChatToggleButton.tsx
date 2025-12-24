import { ChatToggleButtonProps } from "@/types/chat";
import classNames from "classnames";
import { FC } from "react";

export const ChatToggleButton: FC<ChatToggleButtonProps> = ({
  isChatWidgetOpen,
  setIsChatWidgetOpen,
}) => {
  const openCloseChat = () => {
    setIsChatWidgetOpen(!isChatWidgetOpen);
  };

  return (
    <div
      className={classNames({
        "cursor-pointer transition-all duration-300 sm:relative sm:z-[1]": true,
        "rotate-90 [&_#chatIconBg]:hover:fill-[#E7461E]": isChatWidgetOpen,
        "[&_#chatIconBg]:hover:fill-[#E7461E]": !isChatWidgetOpen,
      })}
      onClick={openCloseChat}
    >
      <svg
        width="58"
        height="58"
        viewBox="0 0 58 58"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d)">
          <circle id="chatIconBg" cx="29" cy="28" r="26" fill="#E7461E" />
        </g>
        {isChatWidgetOpen ? (
          <>
            <path
              d="M21 20.0031L36.9989 36.002"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M21 35.9989L36.9989 20"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </>
        ) : (
          <path
            d="M30 16C31.8122 16.001 33.6006 16.4125 35.231 17.2035C36.8614 17.9945 38.2915 19.1445 39.414 20.5672C40.5364 21.9899 41.3221 23.6483 41.712 25.418C42.1019 27.1877 42.086 29.0228 41.6653 30.7855C41.2447 32.5481 40.4303 34.1926 39.2832 35.5956C38.1362 36.9985 36.6863 38.1235 35.0424 38.886C33.3984 39.6485 31.6032 40.0288 29.7912 39.9983C27.9793 39.9678 26.1979 39.5274 24.5805 38.71L24.399 38.6125L18.9315 39.9775C18.8263 40.004 18.7166 40.0073 18.6099 39.9872C18.5033 39.9672 18.4023 39.9242 18.3139 39.8613C18.2255 39.7984 18.1518 39.7171 18.0978 39.623C18.0439 39.5288 18.011 39.4241 18.0015 39.316V39.193L18.0225 39.0685L19.3875 33.6025L19.293 33.4225C18.6066 32.0712 18.184 30.6015 18.048 29.092L18.0105 28.519L18 28C18 24.8174 19.2643 21.7652 21.5147 19.5147C23.7652 17.2643 26.8174 16 30 16ZM30 17.5C28.1677 17.4997 26.3672 17.9789 24.7775 18.89C23.1877 19.801 21.864 21.1122 20.938 22.6933C20.0119 24.2744 19.5158 26.0703 19.4988 27.9025C19.4817 29.7347 19.9445 31.5395 20.841 33.1375C20.9106 33.2618 20.9434 33.4033 20.9355 33.5455L20.9145 33.6865L19.7805 38.218L24.3165 37.087C24.4087 37.0643 24.5044 37.0592 24.5985 37.072L24.735 37.1035L24.8655 37.162C26.2655 37.9458 27.8265 38.3983 29.4287 38.4847C31.0308 38.5712 32.6315 38.2894 34.1077 37.6609C35.584 37.0324 36.8965 36.0739 37.9446 34.8591C38.9928 33.6443 39.7485 32.2054 40.1539 30.653C40.5593 29.1006 40.6035 27.4759 40.2832 25.9037C39.9629 24.3316 39.2865 22.8537 38.3061 21.5837C37.3256 20.3136 36.0671 19.2851 34.6273 18.5772C33.1874 17.8693 31.6045 17.5008 30 17.5ZM30.75 29.5C30.9374 29.4997 31.1182 29.5695 31.2567 29.6958C31.3952 29.822 31.4814 29.9956 31.4983 30.1822C31.5152 30.3689 31.4617 30.5551 31.3482 30.7042C31.2347 30.8534 31.0694 30.9546 30.885 30.988L30.75 31H26.25C26.0626 31.0003 25.8818 30.9305 25.7433 30.8042C25.6048 30.678 25.5186 30.5044 25.5017 30.3178C25.4848 30.1311 25.5383 29.9449 25.6518 29.7958C25.7653 29.6466 25.9306 29.5454 26.115 29.512L26.25 29.5H30.75ZM33.75 25C33.9374 24.9997 34.1182 25.0695 34.2567 25.1958C34.3952 25.322 34.4814 25.4956 34.4983 25.6822C34.5152 25.8689 34.4617 26.0551 34.3482 26.2042C34.2347 26.3534 34.0694 26.4546 33.885 26.488L33.75 26.5H26.25C26.0626 26.5003 25.8818 26.4305 25.7433 26.3042C25.6048 26.178 25.5186 26.0044 25.5017 25.8178C25.4848 25.6311 25.5383 25.4449 25.6518 25.2958C25.7653 25.1466 25.9306 25.0454 26.115 25.012L26.25 25H33.75Z"
            fill="white"
          />
        )}

        <defs>
          <filter
            id="filter0_d"
            x="0"
            y="0"
            width="58"
            height="58"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation="1.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};
