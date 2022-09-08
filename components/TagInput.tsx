import React from "react";
import { WithContext as ReactTags, Tag } from "react-tag-input";

type Props = {
  values: string[];
  placeholder?: string;
};

const TagInput: React.FC<Props> = ({ values, placeholder }) => {
  const suggestions: Tag[] = values.map((value) => {
    return {
      id: value,
      text: value,
    } as Tag;
  });

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const [tags, setTags] = React.useState<Tag[]>([]);

  const handleDelete = (i: number) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag: Tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index: number) => {
    console.log("The tag at index " + index + " was clicked");
  };

  return (
    <div>
      <ReactTags
        tags={tags}
        suggestions={suggestions}
        placeholder={placeholder || "Press enter to add new tag"}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        handleTagClick={handleTagClick}
        inputFieldPosition="top"
        autocomplete
        classNames={{
          tagInputField: "input input-bordered w-full",
          tag: "bg-base-300 h-full rounded-lg flex items-center gap-2 p-3 mr-2",
          tags: "mr-[30%] my-2 flex flex-col",

          selected: "h-full flex mt-4",
          suggestions: "bg-base-300 rounded-lg p-4",
          remove: "indicator-item badge badge-secondary hover:btn-outline",
        }}
      />
    </div>
  );
};

export default TagInput;
