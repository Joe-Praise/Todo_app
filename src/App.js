import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "./store/ui-slice";
import { useEffect, useState } from "react";
import BackgroundImg from "./components/UI/BackgroundImg";
import Input from "./components/Design/Input";
import List from "./components/Design/List";
import Filters from "./components/Design/Filters";
import { filterActions } from "./store/filter-slice";

let initial = true;

function App() {
  const dispatch = useDispatch();
  const toggleState = useSelector((state) => state.ui.isDarkMood);
  const tasks = useSelector((state) => state.filter.items);
  const completed = useSelector((state) => state.filter.completed);
  const active = useSelector((state) => state.filter.active);
  const [view, setView] = useState("");
  

  const createTodoHandler = (input) => {
    dispatch(filterActions.createTask(input));
    dispatch(filterActions.addToActiveTask());
  };

  let filteredTask = tasks;
  let output = tasks;

  const showAllTasks = () => {
    setView("allTasks");
  };

  const showActiveTasks = () => {
    setView("activeTasks");
  };

  const showCompletedTasks = () => {
    setView("completedTasks");
  };

  if (view === "allTasks") {
    output = tasks;
  }

  if (view === "activeTasks") {
    output = active;
  }

  if (view === "completedTasks") {
    output = completed;
  }

  useEffect(() => {
    dispatch(uiActions.setToggleState());
  }, [dispatch]);
  
  useEffect(() => {
    if (initial) {
      initial = false;
      dispatch(filterActions.addToActiveTask());
      dispatch(filterActions.activateItems());
    }
  },[dispatch]);

  const toggleThemeHandler = () => {
    dispatch(uiActions.toggleTheme());
  };

  return (
    <main className={toggleState ? "DarkMood" : "lightMood"}>
      
      <BackgroundImg onDark={toggleState} onToggle={toggleThemeHandler} />
      <section className="section-overlap">
        <Input onCreateTodo={createTodoHandler} />
        <List onUseTodo={output} onMoveToCompleted={showActiveTasks} />
        <Filters
          totalTask={filteredTask}
          onAll={showAllTasks}
          onActive={showActiveTasks}
          onCompleted={showCompletedTasks}
        />
      </section>
    </main>
  );
}

export default App;
