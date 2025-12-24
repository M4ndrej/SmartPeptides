import Image from "next/image";
import CopyButton from "./CopyButton/CopyButton";
import EmailShareButton from "./EmailShareButton/EmailShareButton";
import FacebookShareButton from "./FacebookShareButton/FacebookShareButton";
import TwitterShareButton from "./TwitterShareButton/TwitterShareButton";
import SkypeShareButton from "./SkypeShareButton/SkypeShareButton";
import PinterestShareButton from "./PinterestShareButton/PinterestShareButton";
import WhatsappShareButton from "./WhatsappShareButton/WhatsappShareButton";
import { FC } from "react";

interface ShareButtonsProps {
  productImage: string;
}

const ShareButtons: FC<ShareButtonsProps> = ({ productImage }) => {
  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex gap-[8px]">
        <Image
          className="select-none"
          src="/images/shareIcon.svg"
          width={24}
          height={24}
          priority={true}
          alt="share"
        />{" "}
        <p className="font-16px-ALL font-bold">SHARE:</p>
      </div>
      <div className="flex gap-[10px]">
        <CopyButton />
        <EmailShareButton />
        <FacebookShareButton />
        <TwitterShareButton />
        <SkypeShareButton />
        <PinterestShareButton image={productImage} />
        <WhatsappShareButton />
      </div>
    </div>
  );
};

export default ShareButtons;
