const initialBoard = {
  sections: [
    {
      id: 1,
      sectionTitle: "To Do",
      isDeletable: false,

      tasks: [
        {
          id: 1.1,
          title: "Create Asana board",
          desc: "",
          dueDate: "",
          prio: 1,
        },
        {
          id: 1.2,
          title: "Try",
          desc: "",
          dueDate: "",
          prio: 1,
        },
      ],
    },
    {
      id: 2,
      sectionTitle: "Doing",
      isDeletable: false,
      tasks: [
        {
          id: 2.1,
          title: "Design UI",
          desc: "",
          dueDate: "",
          prio: 1,
        },
      ],
    },
    {
      id: 3,
      sectionTitle: "Done",
      isDeletable: false,
      tasks: [],
    },
  ],
};
export default initialBoard;
