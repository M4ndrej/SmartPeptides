"use client";
import Link from "next/link";
import Image from "next/image";
import { FC, useMemo } from "react";
import { Blog as BlogItem, BlogResponse } from "@/types/blog";
import { formatDate } from "@/helpers/date_format";
import { replaceLinks } from "@/helpers/replace_links_helper";
import classNames from "classnames";
import useSWR from "swr";
import { fetcher } from "@/helpers/fetchers";

type BlogProps = {
  blog: BlogResponse;
};

const Blog: FC<BlogProps> = ({ blog }) => {
  const { data: blogs } = useSWR<BlogItem[]>("/api/blogs/all", fetcher);

  const prevBlog = useMemo(
    () => blogs?.find((b) => b.id == blog.id - 1),
    [blogs, blog]
  );
  const nextBlog = useMemo(
    () => blogs?.find((b) => b.id == blog.id + 1),
    [blogs, blog]
  );

  const blogImage = blog.jetpack_featured_media_url.replace(
    `${process.env.NEXT_PUBLIC_APP_MAIN}`,
    `${process.env.NEXT_PUBLIC_CDN_MAIN}`
  );

  return (
    <>
      <div className="!mb-[32px] grid gap-[8px] xl:max-w-[693px]">
        <h1
          className=" text-center font-bold"
          dangerouslySetInnerHTML={{
            __html: blog.title,
          }}
        ></h1>
        <div>
          <div className="flex justify-center gap-[40px]">
            <div className="text-[14px] uppercase italic text-gray2">
              {formatDate(blog.date)}
            </div>
            <div className="text-[14px] italic text-gray2">
              by Smart Peptides
            </div>
          </div>
        </div>
      </div>

      <Link
        href="/blog/"
        className="font-16px-ALL group !mb-[32px] flex w-fit items-center gap-[10px] sm:mx-auto"
      >
        <svg
          width="7"
          height="13"
          viewBox="0 0 7 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 1L1 6.5L6 12"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-black transition duration-200 group-hover:stroke-[#333333]"
          />
        </svg>
        <span className="transition duration-200 group-hover:text-[#333333]">
          Return to all blogs
        </span>
      </Link>

      <div className="border-1 relative flex !h-[441px] !max-h-[441px] w-[100%] items-center justify-center border border-borderColor sm:h-[auto] sm:items-start md:h-[346px] md:w-[100%]">
        {blog.jetpack_featured_media_url && (
          <Image
            src={blogImage}
            width={341}
            height={341}
            alt="Blog image"
            className="pointer-events-none h-full w-full select-none object-contain sm:max-w-[400px] md:w-[270px]"
          />
        )}

        {blog?.categories?.length ? (
          <div className="font-13px-ALL absolute bottom-0 left-[50%] flex translate-x-[-50%] translate-y-[50%] items-center justify-center rounded-[5px] bg-[#333333] !px-[16px] !py-[8px] text-center text-gray4 sm:w-[max-content] sm:max-w-[100%] sm:text-[13px] sm:leading-[16px]">
            {blog.categories.map((cat, i) => (
              <div
                key={i}
                className="cursor-pointer uppercase"
                //onClick={() => handleCategory(cat.cat_ID)}
              >
                {i > 0 ? ", " : ""}
                {cat.name}
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
      {/* <div className="!mt-[32px] w-[100%]">
        <div className="flex justify-between">
          <div className="text-[13px] uppercase text-gray2">
            {formatDate(blog.date)}
          </div>
          <div className="text-[13px] text-gray2">
            by Smart Peptides
          </div>
        </div>
      </div> */}
      <div className="!mt-[40px]">
        {/* <h1
          className="font-D32px-M24px !mb-[16px] font-bold "
          dangerouslySetInnerHTML={{
            __html: blog.title,
          }}
        ></h1> */}
        <div
          className="font-D16px-M13px entry-content single-entry-content mt-[16px]"
          dangerouslySetInnerHTML={{
            __html: replaceLinks(blog.content || blog.description),
          }}
        ></div>
      </div>
      <div className="!mt-[40px]">
        <div className="h-[1px] w-[100%] bg-gray"></div>
        <div className="!mb-[32px] !mt-[32px] flex items-center justify-between sm:!mb-[40px] sm:!mt-[40px]">
          <div className="w-[100%] max-w-[416px]">
            {prevBlog && (
              <Link href={`/${prevBlog.slug}`}>
                <div className="flex items-center gap-x-[16px] [&_button]:transition [&_button]:duration-300 [&_button]:hover:!border-[#333333] [&_button]:hover:!bg-[#f0f0f0] dark:[&_button]:hover:!bg-transparent [&_div]:hover:!text-[#333333] [&_path]:hover:stroke-[#333333] [&div]:duration-300 [&path]:transition [&path]:duration-300">
                  <button
                    className={classNames({
                      "border-1.5 flex h-[42px] min-h-[42px] w-[42px] min-w-[42px] items-center justify-center border border-gray2 bg-white p-0 text-light-gray-v2 hover:bg-white":
                        true,
                    })}
                  >
                    <div className="flex h-[100%] w-[100%] items-center justify-center">
                      <svg width="7" height="13" fill="none">
                        <path
                          stroke="#999999"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M6 1 1 6.5 6 12"
                        />
                      </svg>
                    </div>
                  </button>
                  <div className="sm:hidden">
                    <div className="text-gray2 transition duration-300">
                      PREVIOUS
                    </div>
                    <div className="font-13px-ALL line-clamp-1 break-all transition duration-300">
                      {prevBlog.title.rendered}
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>

          <Link href={"/blog"}>
            <svg
              width="32"
              height="32"
              fill="none"
              className="[&_rect]:transition [&_rect]:duration-300 [&_rect]:hover:stroke-[#333333]"
            >
              <rect
                width="8.5"
                height="8.5"
                x="4.75"
                y="4.75"
                stroke="#C7C7C7"
                strokeWidth="1.5"
                rx="1.25"
              />
              <rect
                width="8.5"
                height="8.5"
                x="18.75"
                y="4.75"
                stroke="#C7C7C7"
                strokeWidth="1.5"
                rx="1.25"
              />
              <rect
                width="8.5"
                height="8.5"
                x="18.75"
                y="18.75"
                stroke="#C7C7C7"
                strokeWidth="1.5"
                rx="1.25"
              />
              <rect
                width="8.5"
                height="8.5"
                x="4.75"
                y="18.75"
                stroke="#C7C7C7"
                strokeWidth="1.5"
                rx="1.25"
              />
            </svg>
          </Link>

          <div className="w-[100%] max-w-[416px]">
            {nextBlog && (
              <Link href={`/${nextBlog.slug}`}>
                <div className="flex items-center justify-end gap-x-[16px] transition duration-300 [&_button]:transition [&_button]:duration-300 [&_button]:hover:!border-[#333333] [&_button]:hover:!bg-[#f0f0f0] dark:[&_button]:hover:!bg-transparent [&_div]:hover:!text-[#333333] [&_path]:hover:stroke-[#333333]  [&div]:transition [&div]:duration-300 [&path]:transition [&path]:duration-300">
                  <div className="sm:hidden">
                    <div className="text-right text-gray2 transition duration-300">
                      NEXT
                    </div>
                    <div className="line-clamp-1 break-all text-right text-[13px] leading-[16px] transition duration-300">
                      {nextBlog.title.rendered}
                    </div>
                  </div>
                  <button
                    className={classNames({
                      "border-1.5 flex h-[42px] min-h-[42px] w-[42px] min-w-[42px] items-center justify-center border border-gray2 bg-white p-0 text-light-gray-v2 transition duration-300 hover:bg-white":
                        true,
                    })}
                  >
                    <div className="flex h-[100%] w-[100%] items-center justify-center">
                      <svg width="7" height="13" fill="none">
                        <path
                          stroke="#999999"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="m1 1 5 5.5L1 12"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              </Link>
            )}
          </div>
        </div>
        <div className="h-[1px] w-[100%] bg-gray"></div>
      </div>
      {/* <div className="mt-[40px]">
            <div className="font-D18px-M16px font-medium">Leave a reply</div>
            <div className="mt-[16px]">
              <div className="mb-[16px] flex gap-[16px] sm:flex-col md:flex md:flex-col md:flex-wrap md:justify-between">
                <div className=" sm flex w-full max-w-[592px] gap-[16px] sm:max-w-[100%] sm:flex-col md:max-w-[100%]">
                  <Input
                    label="Name"
                    required={true}
                    name="name"
                    onChange={handleInput}
                    customClass="w-[288px] mr-[16px] md:w-[calc(50%-8px)] md:mr-0 sm:w-[100%] sm:mb-[16px] sm:mr-0 font-D16px-M14px"
                  />
                  <Input
                    label="Email"
                    required={true}
                    name="email"
                    type="email"
                    onChange={handleInput}
                    customClass="w-[288px] mr-[16px] md:w-[calc(50%-8px)] md:mr-0 md:mb-[16px] sm:w-[100%] sm:mb-[16px] sm:mr-0 font-D16px-M14px"
                  />
                </div>
                <div className="w-full max-w-[288px] sm:max-w-[100%] md:max-w-[100%]">
                  <Input
                    label="Website"
                    required={true}
                    name="website"
                    onChange={handleInput}
                    customClass="w-[288px] md:w-[100%] sm:w-[100%] font-D16px-M14px flex"
                  />
                </div>
              </div>
              <div className="mb-[16px]">
                <Textarea
                  label="Comment or message"
                  required={true}
                  name="message"
                  onChange={handleInput}
                  customClass="w-[100%] h-[239px] border border-[#E6E6E6] rounded-[5px] px-[16px] py-[12px] outline-0 resize-none sm:w-[100%] font-D16px-M14px"
                />
              </div>
              <div className="mb-[16px] flex items-center sm:items-start">
                <div className="sm:pt-[4px]">
                  <Checkbox
                    checked={formData.saveData}
                    onChange={(e: boolean) => {
                      saveData("saveData", e);
                    }}
                  />
                </div>
                <div className="font-D16px-M14px">
                  Save my name, email, and website in this browser for the next
                  time I comment.
                </div>
              </div>
              <div className="mb-[32px] flex items-center">
                <div>
                  <Checkbox
                    checked={formData.addMail}
                    onChange={(e: boolean) => {
                      saveData("addMail", e);
                    }}
                  />
                </div>
                <div className="font-D16px-M14px">
                  Yes, add me to your mailing list
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  text="POST COMMENT"
                  highlighted={true}
                  onPress={submitForm}
                  customClass="px-[48px] sm:text-[16px] sm:leading-[24px]"
                />
              </div>
            </div>
          </div> */}
      {/* {relatedBlogs.length ? (
            <div className="mt-[92px] flex w-[100%] max-w-[896px] flex-col items-center justify-center overflow-hidden sm:mt-[80px] md:mt-[72px]">
              <div className="font-D32px-M24px font-bold">Related Blogs</div>
              <div className="mt-[16px] h-[2px] w-[48px] rounded-[2px] bg-[#333333]"></div>
              <div className="mt-[40px] w-[100%]">
                <div className="lg:scrollbar grid min-h-[100%] w-[100%] snap-x auto-cols-fr grid-flow-col items-center gap-x-[16px] overflow-x-auto sm:pb-[8px]">
                  {relatedBlogs.map((post, index) => (
                    <div key={post.id} className="block w-full max-w-[288px] ">
                      <BlogCard blog={post} smallerOnMobile={true} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            ""
          )} */}
    </>
  );
};

export default Blog;
