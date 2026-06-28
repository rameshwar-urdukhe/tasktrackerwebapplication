import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
} from "../api/taskApi";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import Loader from "../components/Loader";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setFetching(true);
      const res = await getTasks();
      setTasks(res.data);
    } catch (error) {
      toast.error("Failed to load tasks");
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      if (editingTask) {
        await updateTask(editingTask._id, formData);
        toast.success("Task updated successfully");
      } else {
        await createTask(formData);
        toast.success("Task created successfully");
      }

      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await deleteTask(id);
      toast.success("Task deleted");
      fetchTasks();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleToggleStatus = async (id) => {
    try {
      await toggleTaskStatus(id);
      toast.success("Task status updated");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const keyword = searchTerm.toLowerCase();

    const matchesSearch =
      task.title.toLowerCase().includes(keyword) ||
      task.description.toLowerCase().includes(keyword);

    const matchesFilter = filter === "All" || task.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased selection:bg-blue-500/10 selection:text-blue-600">
      {/* Dynamic Global Toaster Notification Configurations */}
      <Toaster
        position="top-right"
        toastOptions={{
          className:
            "font-medium rounded-xl text-sm border border-slate-100 shadow-xl bg-white/90 backdrop-blur-md text-slate-800",
          duration: 3000,
        }}
      />

      {/* Primary Sticky Header */}
      <Navbar />

      {/* Main Dashboard Canvas */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 transition-all duration-300">
        {/* Task Management Panel (Create / Edit Viewport) */}
        <div className="mb-8 transition-all duration-500 ease-out ">
          <TaskForm
            onSubmit={handleSubmit}
            editingTask={editingTask}
            loading={loading}
          />
        </div>

        {/* Search, Filter, and Controls Segment */}
        <div className="bg-white/60 backdrop-blur-md border border-slate-200/60 p-4 rounded-2xl shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1 w-full">
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </div>
            <div className="flex-shrink-0">
              <FilterBar filter={filter} setFilter={setFilter} />
            </div>
          </div>
        </div>

        {/* Tasks Viewport / Core Async Content Area */}
        <section className="relative min-h-[300px]">
          {fetching ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm rounded-2xl transition-all duration-300">
              <Loader />
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 ease-out">
              <TaskList
                tasks={filteredTasks}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Home;
