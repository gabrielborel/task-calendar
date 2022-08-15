import { createContext, ReactNode, useContext, useState } from "react";
import { TaskModal } from "../components/Modals/TaskModal";
import { Tag } from "./TagsContext";

interface TasksProviderProps {
  children: ReactNode;
}

interface ITasksContext {
  tasks: Task[];
  createTask: (task: Task) => void;
  removeTask: (taskId: string) => void;
  updateTasks: (updatedTasks: Task[]) => void;
  setTaskToEdit: (taskToEdit: Task) => void;
  openCreateTaskModal: () => void;
  openEditTaskModal: (taskToEdit: Task) => void;
  closeModal: () => void;
  handleToggleTaskCompletion: (taskId: string) => void;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  tags: Tag[];
  completed: boolean;
}

const TasksContext = createContext({} as ITasksContext);

export const TasksProvider = ({ children }: TasksProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isTaskModalOpen, setTaskModalStatus] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [task, setTask] = useState<Task>();

  console.log(tasks);

  const openCreateTaskModal = () => {
    setTaskModalStatus(true);
    setMode("create");
  };

  const openEditTaskModal = (taskToEdit: Task) => {
    setTaskModalStatus(true);
    setTask(taskToEdit);
    setMode("edit");
  };

  const closeModal = () => setTaskModalStatus(false);
  const createTask = (taskToAdd: Task) =>
    setTasks((tasks) => [...tasks, taskToAdd]);
  const removeTask = (taskId: string) =>
    setTasks((tasks) => tasks.filter((task) => task.id !== taskId));
  const updateTasks = (updatedTasks: Task[]) => setTasks(updatedTasks);
  const setTaskToEdit = (taskToEdit: Task) => setTask(taskToEdit);

  const handleToggleTaskCompletion = (taskId: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : { ...task }
    );

    setTasks(updatedTasks);
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        createTask,
        removeTask,
        updateTasks,
        openCreateTaskModal,
        openEditTaskModal,
        setTaskToEdit,
        closeModal,
        handleToggleTaskCompletion,
      }}
    >
      {children}

      <TaskModal
        isVisible={isTaskModalOpen}
        closeModal={closeModal}
        mode={mode}
        task={task}
      />
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);
