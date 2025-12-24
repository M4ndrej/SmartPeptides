import Image, { ImageProps } from "next/image";
import { FC } from "react";

type AuthorizedImageProps = ImageProps & {
  testImage?: boolean;
};

const AuthorizedImage: FC<AuthorizedImageProps> = (props) => {
  const { src, ...restProps } = props;
  let imageSrc = (src as string).replace(
    `${process.env.NEXT_PUBLIC_APP_MAIN}`,
    `${process.env.NEXT_PUBLIC_CDN_MAIN}`
  );

  return <Image {...restProps} src={imageSrc} />;
};

export default AuthorizedImage;
