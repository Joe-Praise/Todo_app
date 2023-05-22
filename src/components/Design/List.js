import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { filterActions } from "../../store/filter-slice";
import { useSelector } from "react-redux";

const List = (props) => {
  const dispatch = useDispatch();
  const isChecked = useSelector((state) => state.filter.completed);

  const checkedHandler = (props, checked) => {
    dispatch(
      filterActions.addToCompletedTask({
        id: props.id,
        task: props.task,
        checked: true,
      })
    );
    // if completed has an item then this dispatch will run, else its dormant
    if (isChecked) {
      dispatch(filterActions.addToActiveTask());
    }
  };

  const deleteListHandler = (id) => {
    dispatch(filterActions.deleteList(id));
  };

  let itemDrag = useRef();
  let itemDragOver = useRef();

  // handle sorting

  const handleSort = () => {
    // handles the list sorting from filter-slice.js
    dispatch(
      filterActions.dragEvent({
        drag: itemDrag.current,
        dragOver: itemDragOver.current,
      })
    );

    // reset the position ref
    itemDrag.current = null;
    itemDragOver.current = null;
  };

  return (
    <ul>
      {props.onUseTodo.map((todo, index) => {
        return (
          <li
            className="listItem"
            draggable
            key={todo.id}
            onDragStart={(e) => (itemDrag.current = index)}
            onDragEnter={(e) => (itemDragOver.current = index)}
            onDragEnd={handleSort}
          >
            <label className="container" onClick={() => checkedHandler(todo)}>
              <input
                type="checkbox"
                checked={todo.checked}
                onChange={(e) => {
                  const checked = e.target.checked;
                  checkedHandler(todo, checked);
                }}
              />
              <span className="checkmark"></span>
              <span className="lineThrough">{todo.task}</span>
            </label>
            <span
              className="deleteItem"
              onClick={() => deleteListHandler(todo.id)}
            >
              X
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default List;
