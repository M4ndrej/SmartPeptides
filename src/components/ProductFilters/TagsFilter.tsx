import React, { useMemo } from "react";
import AnimateHeight from "react-animate-height";
import { Tag } from "@/types/tags";
import Button from "../Button/Button";

interface TagsFilterProps {
  tags: Tag[] | undefined;
  activeTags: string[];
  allTagsActive: boolean;
  onTagChange: (tag: Tag, index: number) => void;
  height: any;
}

const TagsFilter: React.FC<TagsFilterProps> = ({
  tags,
  activeTags,
  allTagsActive,
  onTagChange,
  height,
}) => {
  const filteredTags = useMemo(() => {
    return tags?.filter((tag) => tag.count > 0);
  }, [tags]);

  return (
    <AnimateHeight height={height} duration={150} id="tags">
      <div className="flex flex-wrap items-center gap-[7px]">
        {filteredTags &&
          filteredTags.map((tag, i: number) => (
            <div key={i}>
              <Button
                text={tag.name}
                count={tag.count}
                highlighted
                customClass={
                  tag.active || allTagsActive
                    ? `!h-[26px] !text-[12px] leading-[14px] w-full px-0 md:p-0 md:leading-[26px] md:text-center !px-[6px] !py-[4px]`
                    : `!h-[26px] !text-[12px] leading-[14px] opacity-[0.3] md:p-0 md:leading-[26px] md:text-center !px-[6px] !py-[4px]`
                }
                onPress={async () => onTagChange(tag, i)}
              />
            </div>
          ))}
      </div>
    </AnimateHeight>
  );
};

export default TagsFilter;
