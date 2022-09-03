import React from "react";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { BsThreeDots } from "react-icons/bs";

const SectionMenu = (props) => {
  const deleteSectionHandler = (e) => {
    const localStorageObj = JSON.parse(localStorage.getItem("stored_sections"));

    for (let i = 0; i < localStorageObj.sections.length; i++) {
      if (localStorageObj.sections[i].id == props.section.id) {
        localStorageObj.sections.splice(i, 1);
      }

      props.onDeleteSection(localStorageObj);
    }

    // console.log(localStorageObj.sections);
    // console.log(props.section);
  };
  return (
    <>
      <Menu>
        <MenuButton>
          <IconButton
            aria-label="Call Segun"
            size="sm"
            icon={<BsThreeDots />}
          />
        </MenuButton>
        <MenuList>
          <MenuItem>Rename Section</MenuItem>
          {props.section.isDeletable === true && (
            <MenuItem onClick={deleteSectionHandler}>Delete Section</MenuItem>
          )}
        </MenuList>
      </Menu>
    </>
  );
};

export default SectionMenu;
