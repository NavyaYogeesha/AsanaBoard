import React, { useState } from "react";

import { Box, Text } from "@chakra-ui/react";

import "./TaskCard.css";
const TaskCard = ({
  task,
  onTaskChange,
  status,
  idx,
  dragging,
  handletDragStart,
  handleDragEnter,
  getStyles,
}) => {
  const [index, i] = idx;
  const [edit, setEdit] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);

  if (edit || !taskTitle) {
    return (
      <Box
        className="tasks"
        p={5}
        mt={5}
        shadow="md"
        borderWidth="1px"
        key={task.id}
      >
        <input
          autoFocus
          className="inputTask"
          type="text"
          onChange={(e) => {
            setEdit(true);
            setTaskTitle(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              setEdit(false);
              task.title = taskTitle;
              onTaskChange(task.title);
            }
          }}
          onBlur={(e) => {
            setEdit(false);
            task.title = taskTitle;
            onTaskChange(task.title);
          }}
          value={taskTitle}
        />
        <Text mt={4}></Text>
      </Box>
    );
  }
  return (
    <Box
      draggable
      onDragStart={(e) => handletDragStart(e, { index, i })}
      onDragEnter={
        dragging
          ? (e) => {
              handleDragEnter(e, { index, i });
            }
          : null
      }
      className={dragging ? getStyles({ index, i }) : "tasks"}
      onClick={() => {
        setEdit(true);
      }}
      p={5}
      mt={5}
      shadow="md"
      borderWidth="1px"
      key={task.id}
    >
      <p>{task.title}</p>
      <p className="status">{status}</p>
      <Text mt={4}></Text>
    </Box>
  );
};

export default TaskCard;
