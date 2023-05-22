import { createSlice } from "@reduxjs/toolkit";
const localItems = localStorage.getItem("items");

const filterSlice = createSlice({
  name: "filter lists",
  initialState: {
    items: [],
    completed: [],
    active: [],
  },
  reducers: {
    activateItems(state) {
      if (localItems) {
        let tasks = JSON.parse(localItems);
        state.items = tasks;

        state.completed = state.items.filter((tasks) => tasks.checked === true);

        state.active = state.items.filter((tasks) => tasks.checked === false);
      }
    },
    createTask(state, action) {
      const newTask = action.payload;
      const existingTask = state.items.find((task) => task.id === newTask.id);
      if (!existingTask) {
        state.items.unshift({
          id: newTask.id,
          task: newTask.task,
          checked: newTask.checked,
        });

        localStorage.setItem("items", JSON.stringify(state.items));
      }
    },
    addToCompletedTask(state, action) {
      const newCompletedTask = action.payload;
      const existingTask = state.completed.find(
        (task) => task.id === newCompletedTask.id
      );

      // get the index of item to be added to completed
      const existingTaskIndex = state.items.findIndex(
        (task) => task.id === newCompletedTask.id
      );

      // get the item from the items list using the index gotten
      const existingTaskItem = state.items[existingTaskIndex];

      if (!existingTask) {
        state.completed.unshift({
          id: newCompletedTask.id,
          task: newCompletedTask.task,
          checked: newCompletedTask.checked,
        });

        // get the values of the item and change the cheked field to true
        const updateItem = {
          ...existingTaskItem,
          checked: true,
        };

        // update the particular item in the arr with the updated values
        state.items[existingTaskIndex] = updateItem;

        // set the items arrray to local storage
        localStorage.setItem("items", JSON.stringify(state.items));

        state.active = state.active.filter(
          (item) => item.id !== newCompletedTask.id
        );
      } else {
        const updateItem = {
          ...existingTaskItem,
          checked: false,
        };

        // update the particular item in the items array with the updated values
        state.items[existingTaskIndex] = updateItem;

        // set the items arrray to local storage
        localStorage.setItem("items", JSON.stringify(state.items));

        state.completed = state.completed.filter(
          (task) => task.id !== newCompletedTask.id
        );

        state.active = state.active.filter(
          (item) => item.id !== newCompletedTask.id
        );
      }
    },
    addToActiveTask(state) {
      state.active = state.items.filter(
        (tasks) => !state.completed.some((comp) => tasks.id === comp.id)
      );
    },
    deleteAllCompletedTask(state) {
      if (state.completed.length > 0) {
        // comparing the two arrays(tasks and completed task) and setting tasks to an array without completed task
        state.items = state.items.filter(
          (tasks) => !state.completed.some((comp) => tasks.id === comp.id)
        );

        state.active = state.active.filter(
          (tasks) => !state.completed.some((comp) => tasks.id === comp.id)
        );

        // empty the completed task array
        state.completed = [];
        localStorage.setItem("items", JSON.stringify(state.items));
      }
    },
    deleteList(state, action) {
      const id = action.payload;
      const existingTask = state.items.find((task) => task.id === id);
      if (existingTask) {
        state.items = state.items.filter((item) => item.id !== id);
        state.active = state.active.filter((item) => item.id !== id);
        state.completed = state.completed.filter((item) => item.id !== id);
        localStorage.setItem("items", JSON.stringify(state.items));
      }
    },
    dragEvent(state, action) {
      // get the index of the dragged item and dragOver item
      let events = action.payload;

      // remove and save the dragged item content
      const draggedItemContent = state.items.splice(events.drag, 1)[0];

      // switch the position
      state.items.splice(events.dragOver, 0, draggedItemContent);

      // reset the actual array
      localStorage.setItem("items", JSON.stringify(state.items));
    },
  },
});

export const filterActions = filterSlice.actions;
export default filterSlice.reducer;
