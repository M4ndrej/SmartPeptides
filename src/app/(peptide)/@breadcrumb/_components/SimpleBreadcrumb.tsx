// import { PromoBanner } from "@/components/PromoBanner/PromoBanner";
import classNames from "classnames";
import Link from "next/link";

interface BreadcrumbItem {
  name: string;
  link: string;
}

export default function SimpleBreadcrumb({
  pageName,
  pageLink,
}: {
  pageName: string;
  pageLink: string;
}) {
  const breadcrumbTrail: BreadcrumbItem[] = [
    { name: "Home", link: "/" },
    { name: pageName, link: pageLink },
  ];

  const breadcrumbs = [];
  let cumulativePath = "";

  breadcrumbs.push(
    <Link
      className="group relative transition duration-300 hover:text-[#333333]"
      key="home"
      href="/"
    >
      Home
    </Link>
  );

  for (let i = 1; i < breadcrumbTrail.length; i++) {
    cumulativePath += `${breadcrumbTrail[i].link}`;

    breadcrumbs.push(
      <span key={`separator-${i}`}> &nbsp; &gt; &nbsp; </span>,
      i === breadcrumbTrail.length - 1 ? (
        <span key={breadcrumbTrail[i].name}>
          {formatTitle(breadcrumbTrail[i].name)}
        </span>
      ) : (
        <Link
          className="group relative transition duration-300 hover:text-[#333333]"
          key={breadcrumbTrail[i].name}
          href={cumulativePath}
        >
          {formatTitle(breadcrumbTrail[i].name)}
        </Link>
      )
    );
  }

  return (
    <>
      {/* <PromoBanner /> */}
      <div
        className={classNames({
          "bg-background-rgb w-[100%]": true,
        })}
      >
        <div className="flex items-center">
          <div className="font-D14px-M13px container-padding-inline m-[auto] flex max-h-[38px] w-[100%] max-w-[1264px] items-center py-[7px] sm:max-h-[32px] sm:leading-[16px]">
            <span className="sm:w-[360px] sm:overflow-hidden sm:text-ellipsis sm:whitespace-nowrap">
              {breadcrumbs}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

const formatTitle = (text: string) => {
  return text.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};
