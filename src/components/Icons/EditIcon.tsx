import React from "react";

interface EditIconProps {
  width?: number;
  height?: number;
  className?: string;
}

const EditIcon: React.FC<EditIconProps> = ({ width, height, className }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M8.28 1H3C1.89543 1 1 1.89543 1 3V14C1 15.1046 1.89543 16 3 16H13C14.1046 16 15 15.1046 15 14V9.86364"
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="stroke-gray2"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.07822 10.4009C4.06699 10.2286 4.13057 10.0598 4.25269 9.93764L10.0819 4.10845L12.8476 6.87414L7.01838 12.7033C6.89626 12.8255 6.72743 12.889 6.55509 12.8778L4.22978 12.7262L4.07822 10.4009ZM13.4133 6.30845L14.1774 5.54434C14.4117 5.31002 14.4117 4.93012 14.1774 4.69581L12.2602 2.77865C12.0259 2.54433 11.646 2.54433 11.4117 2.77864L10.6476 3.54276L13.4133 6.30845ZM3.687 9.37196C3.40205 9.65691 3.25371 10.0508 3.27992 10.453L3.44289 12.9534C3.46248 13.2541 3.70197 13.4935 4.0026 13.5131L6.50306 13.6761C6.90519 13.7023 7.29911 13.554 7.58407 13.269L14.7431 6.11002C15.2898 5.56329 15.2898 4.67686 14.7431 4.13012L12.8259 2.21296C12.2792 1.66623 11.3927 1.66622 10.846 2.21296L3.687 9.37196Z"
      className="fill-gray2"
    />
  </svg>
);

export default EditIcon;
