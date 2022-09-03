import React, { useState } from "react";

import { Input } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const AddNewSection = (props) => {
  const [sectionInput, setSectionInput] = useState(true);

  // const saveSectionHandler = () => {
  //   return [...props.Sections, newSection];
  // };

  const renderAddSectionButton = () => {
    return (
      <>
        {/* <button
          className="add-section"
          onClick={() => {
            setSectionInput(false);
          }}
          type="button"
        > */}
        <IconButton
          className="add-section"
          onClick={() => {
            setSectionInput(false);
          }}
          aria-label="Call Segun"
          size="sm"
          mr={2}
          icon={<AddIcon />}
        />
        Add Section
        {/* + &nbsp;Add Section
        </button> */}
      </>
    );
  };

  const renderAddSectionInput = () => {
    return (
      <>
        <Input
          autoFocus
          onBlur={() => {
            setSectionInput(true);
          }}
          variant="outline"
          placeholder="Enter the New Section"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              const newSection = {
                id: props.totalCount + 1,
                sectionTitle: e.target.value || "Untitled Section",
                tasks: [],
                isDeletable: true,
              };
              props.onSaveSection(newSection);
              setSectionInput(true);
            }
          }}
        />
      </>
    );
  };

  return sectionInput ? renderAddSectionButton() : renderAddSectionInput();
};

export default AddNewSection;
