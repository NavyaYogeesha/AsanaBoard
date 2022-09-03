import React from "react";
import { Flex, Spacer, HStack, Box } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import AddNewSection from "../AddNewSections/AddNewSection";
import TaskCard from "../Tasks/TaskCard";
import SectionMenu from "../Menu/SectionMenu";

import initialBoard from "../../data";
import { Task } from "../../models/task";

import "./Board.css";

const Board = () => {
  const [board, setBoard] = React.useState();
  const [dragging, setDragging] = React.useState(false);

  // console.log("List before the drag:", board);

  React.useEffect(() => {
    const localStoredBoard =
      JSON.parse(localStorage.getItem("stored_sections")) || initialBoard;
    setBoard(localStoredBoard);
  }, []);

  const dragItem = React.useRef();
  const dragItemNode = React.useRef();

  const addNewTaskHandler = () => {
    const newTask = new Task({});
    const boardObj = Object.assign({}, board);
    boardObj.sections[0].tasks.push(newTask);
    updateBoardState(boardObj);
  };

  const updateSectionsHandler = (newSection) => {
    const boardObject = Object.assign({}, board);
    boardObject.sections.push(newSection);
    updateBoardState(boardObject);
  };

  const updateBoardState = (data) => {
    setBoard(data);
    localStorage.setItem("stored_sections", JSON.stringify(data));
  };

  const deleteSectionHandler = (localStorageObj) => {
    // console.log(localStorageObj);
    updateBoardState(localStorageObj);
  };

  /**
   * @function reorder
   * @description Function to reorder or swap the tasks within the section
   * @params list Data to which swap function needs to be applied
   * @params startIndex Start index of the data
   * @params endIndex End index of the data
   */
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const updateTask = (updatedTask, index, idx) => {
    const updatedBoard = Object.assign({}, board);
    if (updatedTask.length <= 0) {
      updatedBoard.sections[index].tasks.splice(idx, 1);
    } else {
      updatedBoard.sections[index].tasks[idx].title = updatedTask;
    }
    updateBoardState(updatedBoard);
  };

  const handleDragEnter = (e, targetItem) => {
    // if (dragItemNode.current !== e.target) {
    setBoard((oldList) => {
      if (e.target) {
        let newList = Object.assign({}, oldList);
        newList.sections[targetItem.index].tasks.splice(
          targetItem.i,
          0,
          newList.sections[dragItem.current.index].tasks.splice(
            dragItem.current.i,
            1
          )[0]
        );
        dragItem.current = targetItem;
        localStorage.setItem("stored_sections", JSON.stringify(newList));
        // console.log("List after update", newList);
        return newList;
      }
    });
  };

  const handletDragStart = (e, item) => {
    console.log("Starting to drag", item);
    dragItemNode.current = e.target;
    dragItemNode.current.addEventListener("dragend", handleDragEnd);
    dragItem.current = item;

    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const getStyles = (item) => {
    if (
      dragItem.current.index === item.index &&
      dragItem.current.i === item.i
    ) {
      return "tasks current";
    }
    return "tasks";
  };

  const handleDragEnd = (e) => {
    setDragging(false);
    dragItem.current = null;
    dragItemNode.current.removeEventListener("dragend", handleDragEnd);
    dragItemNode.current = null;
  };

  // const onDragEnd = (result) => {
  //   if (!result.destination) {
  //     return;
  //   }
  //   const source = result.source;
  //   const destination = result.destination;

  //   // Return false if drag and drop is of same location
  //   if (
  //     source.droppableId === destination.droppableId &&
  //     source.index === destination.index
  //   ) {
  //     return;
  //   }
  //   const boardObj = Object.assign({}, board);
  //   if (result.type === "droppableItemOption") {
  //     // Drag and drop within same section
  //     if (source.droppableId === destination.droppableId) {
  //       const index = Number(source.droppableId) - 1;
  //       const items = reorder(
  //         boardObj.sections[index].tasks,
  //         source.index,
  //         destination.index
  //       );
  //       boardObj.sections[index].tasks = items;
  //       updateBoardState(boardObj);
  //     } else {
  //       // If task is dragged and drop is of different sections
  //       const sourceIndex = Number(source.droppableId) - 1;
  //       const destnIdx = Number(destination.droppableId) - 1;
  //       const task = boardObj.sections[sourceIndex].tasks[source.index];
  //       if (boardObj.sections[destnIdx].tasks.length > 0) {
  //         boardObj.sections[destnIdx].tasks.splice(
  //           result.destination.index,
  //           0,
  //           task
  //         );
  //       } else {
  //         boardObj.sections[destnIdx].tasks.push(task);
  //       }
  //       boardObj.sections[sourceIndex].tasks.splice(result.source.index, 1);
  //       updateBoardState(boardObj);
  //     }
  //   }
  // };

  return (
    <>
      {/* <DragDropContext onDragEnd={onDragEnd}> */}
      <HStack className="section-box" spacing="10px">
        {board &&
          board.sections.map((section, index) => (
            <Box
              onDragEnter={
                dragging ? (e) => handleDragEnter(e, { index, idx: 0 }) : null
              }
              w="600px"
              className="section"
              bg="#e6e6e6"
              p={4}
              key={section.id}
              minH="100vh"
            >
              <Flex>
                <Box>{section.sectionTitle}</Box>
                <Spacer />

                <Box>
                  {section.id === 1 && (
                    <IconButton
                      onClick={addNewTaskHandler}
                      aria-label="Call Segun"
                      size="sm"
                      mr={2}
                      icon={<AddIcon />}
                    />
                  )}
                </Box>
                <Box>
                  <SectionMenu
                    onDeleteSection={deleteSectionHandler}
                    section={section}
                  />
                </Box>
              </Flex>
              {section.tasks.map((task, idx) => (
                <TaskCard
                  onTaskChange={(updatedTask) =>
                    updateTask(updatedTask.trim(), index, idx)
                  }
                  task={task}
                  key={task.id}
                  idx={[index, idx]}
                  dragging={dragging}
                  status={section.sectionTitle}
                  handletDragStart={handletDragStart}
                  handleDragEnter={handleDragEnter}
                  getStyles={getStyles}
                />
              ))}
            </Box>
          ))}
        <Box
          borderRadius="5px"
          className="section"
          bg="#e6e6e6"
          p={4}
          color="black"
          minH="100vh"
          w="600px"
        >
          <AddNewSection
            totalCount={board?.sections?.length}
            onSaveSection={updateSectionsHandler}
          ></AddNewSection>
        </Box>
      </HStack>
    </>
  );
};

export default Board;
