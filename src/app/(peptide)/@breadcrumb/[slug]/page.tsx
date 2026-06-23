// import { PromoBanner } from "@/components/PromoBanner/PromoBanner";
import { fetchStaticParams } from "@/server/staticService";
import classNames from "classnames";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CategoryBreadcrumbs({
  params,
}: {
  params: { slug: string };
}) {
  const staticData = await fetchStaticParams();

  let breadcrumbTrail = [{ name: "Home", link: "/" }];

  // Handle Category Pages only
  const category = staticData.productCategories.find(
    (c) => c.slug === params.slug
  );

  if (category) {
    // Breadcrumb for category page
    breadcrumbTrail.push({
      name: category.name,
      link: `/${params.slug}`,
    });
  } else {
    notFound();
  }

  //SECOND PART
  let breadcrumbs = [];

  let cumulativePath = ""; //Starting point for the cumulative path
  breadcrumbs.push(
    <Link
      className="group relative transition duration-300 hover:text-[#333333]"
      key="home"
      href="/"
    >
      Home
    </Link>
  );

  //  Iterate over each part of the breadcrumbTrail to build the breadcrumbs
  for (let i = 1; i < breadcrumbTrail.length; i++) {
    cumulativePath += `${breadcrumbTrail[i].link}`;

    breadcrumbs.push(
      <span key={`separator-${i}`}> &nbsp; &gt; &nbsp; </span>, //Separator between breadcrumbs
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

// Helper function to format the breadcrumb titles
const formatTitle = (text: string) => {
  return text.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};
