import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { TaskModal } from "../components/Modals/TaskModal";
import { ITask } from "../interfaces/ITask";
import { api } from "../services/api";
import { useSession } from "./SessionContext";
import { Tag } from "./TagsContext";

interface TasksProviderProps {
  children: ReactNode;
}

interface ITasksContext {
  tasks: ITask[];
  createTask: (task: Task) => void;
  removeTask: (taskId: string) => void;
  updateTask: (taskToUpdate: Task) => void;
  setTaskToEdit: (taskToEdit: Task) => void;
  openCreateTaskModal: () => void;
  openEditTaskModal: (taskToEdit: Task) => void;
  closeModal: () => void;
  handleToggleTaskCompletion: (taskId: string) => void;
}

export interface Task {
  _id: string;
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
  const { session } = useSession();

  const loadTasks = async () => {
    if (session) {
      const {
        data: { tasks },
      } = await api.get(`/tasks/${session?.user?.userId}`);

      console.log(tasks);
      setTasks(tasks);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [session]);

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

  const createTask = async (taskToAdd: Task) => {
    const {
      data: { newTask },
    } = await api.post("/tasks", {
      ...taskToAdd,
      user: session?.user?.userId,
    });

    setTasks((previousTasks) => [...previousTasks, newTask]);
  };

  const removeTask = async (taskId: string) => {
    await api.delete(`/tasks/${taskId}`);

    setTasks((previousTask) =>
      previousTask.filter((task) => task._id !== taskId)
    );
  };

  const updateTask = async (taskToUpdate: Task) => {
    taskToUpdate.tags = taskToUpdate.tags.map((tag) => tag._id);

    const { data } = await api.put(`/tasks/${taskToUpdate?._id}`, {
      ...taskToUpdate,
    });

    console.log(data);

    const updatedTasks = tasks?.map((previousTask) =>
      previousTask._id === taskToUpdate?._id
        ? { ...taskToUpdate }
        : { ...previousTask }
    );

    console.log(updatedTasks);

    console.log("haha", taskToUpdate);

    setTasks(updatedTasks);
  };
  const setTaskToEdit = (taskToEdit: Task) => setTask(taskToEdit);

  const handleToggleTaskCompletion = async (taskId: string) => {
    const taskToBeUpdated = tasks.find((task) => task._id === taskId);
    taskToBeUpdated!.completed = !taskToBeUpdated?.completed;

    await api.put(`/tasks/${taskId}`, {
      ...taskToBeUpdated,
    });

    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...taskToBeUpdated } : { ...task }
    );

    setTasks(updatedTasks);
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        createTask,
        removeTask,
        updateTask,
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
