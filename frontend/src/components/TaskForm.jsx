import { useEffect, useState } from "react";
import {
  FiPlus,
  FiCheckSquare,
  FiAlertCircle,
  FiCalendar,
  FiBriefcase,
  FiFlag,
} from "react-icons/fi";

const initialForm = {
  title: "",
  description: "",
  category: "Personal",
  priority: "Medium",
  status: "Pending",
  dueDate: "",
};

function TaskForm({ onSubmit, editingTask, loading }) {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTask) {
      setFormData({
        ...editingTask,
        dueDate: editingTask.dueDate ? editingTask.dueDate.split("T")[0] : "",
      });
    } else {
      setFormData(initialForm);
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formData);

    if (!editingTask) {
      setFormData(initialForm);
      setErrors({});
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    } else if (formData.title.trim().length > 80) {
      newErrors.title = "Title cannot exceed 80 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    } else if (formData.description.trim().length > 500) {
      newErrors.description = "Description cannot exceed 500 characters";
    }

    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-slate-200  shadow-sm rounded-2xl p-6 sm:p-8 space-y-6 max-w-full transition-all duration-300 relative overflow-hidden"
    >
      {/* Decorative Accent Ribbon to anchor UI style */}
      <div
        className={`absolute top-0 left-0 right-0 h-[4px] ${editingTask ? "bg-amber-500" : "bg-gradient-to-r from-blue-500 to-indigo-600"}`}
      />

      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className={`p-2.5 rounded-xl ${editingTask ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"}`}
        >
          {editingTask ? (
            <FiCheckSquare className="text-xl" />
          ) : (
            <FiPlus className="text-xl" />
          )}
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            {editingTask ? "Modify Existing Task" : "Create New Workspace Task"}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {editingTask
              ? "Update individual properties or state changes"
              : "Organize work milestones and deadlines"}
          </p>
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* Title input element layout */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label className="text-sm font-semibold text-slate-700 tracking-wide">
            Task Title <span className="text-red-500/80">*</span>
          </label>
          <span
            className={`text-[11px] font-medium px-1.5 py-0.5 rounded ${formData.title.length > 70 ? "text-amber-600 bg-amber-50" : "text-slate-400 bg-slate-50"}`}
          >
            {formData.title.length} / 80
          </span>
        </div>

        <div className="relative">
          <input
            type="text"
            name="title"
            placeholder="e.g., Architect system database schemas"
            value={formData.title}
            onChange={handleChange}
            className={`w-full text-sm font-normal rounded-xl border px-4 py-3 bg-slate-50/50 transition-all duration-200 outline-none focus:bg-white focus:ring-4 ${
              errors.title
                ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                : "border-slate-200/80 focus:border-blue-500 focus:ring-blue-500/10"
            }`}
          />
        </div>

        {errors.title && (
          <div className="flex items-center gap-1.5 text-red-500 text-xs mt-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
            <FiAlertCircle className="flex-shrink-0" />
            <span>{errors.title}</span>
          </div>
        )}
      </div>

      {/* Description textarea layout */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label className="text-sm font-semibold text-slate-700 tracking-wide">
            Detailed Description <span className="text-red-500/80">*</span>
          </label>
          <span
            className={`text-[11px] font-medium px-1.5 py-0.5 rounded ${formData.description.length > 455 ? "text-amber-600 bg-amber-50" : "text-slate-400 bg-slate-50"}`}
          >
            {formData.description.length} / 500
          </span>
        </div>

        <textarea
          rows="3"
          name="description"
          placeholder="Outline steps, requirements, or dependencies necessary to resolve this milestone..."
          value={formData.description}
          onChange={handleChange}
          className={`w-full text-sm font-normal rounded-xl border px-4 py-3 bg-slate-50/50 transition-all duration-200 outline-none focus:bg-white focus:ring-4 resize-none ${
            errors.description
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
              : "border-slate-200/80 focus:border-blue-500 focus:ring-blue-500/10"
          }`}
        />

        {errors.description && (
          <div className="flex items-center gap-1.5 text-red-500 text-xs mt-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
            <FiAlertCircle className="flex-shrink-0" />
            <span>{errors.description}</span>
          </div>
        )}
      </div>

      {/* Meta-Selector Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
        {/* Category Component Input Selector */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 tracking-wider uppercase mb-1.5">
            <FiBriefcase className="text-slate-400" /> Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full text-sm rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 font-medium text-slate-700 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
              backgroundSize: "16px",
            }}
          >
            <option>Personal</option>
            <option>Work</option>
            <option>Study</option>
            <option>Other</option>
          </select>
        </div>

        {/* Priority Component Input Selector */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 tracking-wider uppercase mb-1.5">
            <FiFlag className="text-slate-400" /> Priority
          </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full text-sm rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 font-medium text-slate-700 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
              backgroundSize: "16px",
            }}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        {/* Status Component Input Selector */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 tracking-wider uppercase mb-1.5">
            <FiCheckSquare className="text-slate-400" /> Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full text-sm rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 font-medium text-slate-700 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
              backgroundSize: "16px",
            }}
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>

        {/* Due Date Input Component Area */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 tracking-wider uppercase mb-1.5">
            <FiCalendar className="text-slate-400" /> Due Date{" "}
            <span className="text-red-500/80">*</span>
          </label>
          <input
            type="date"
            name="dueDate"
            min={new Date().toISOString().split("T")[0]}
            value={formData.dueDate}
            onChange={handleChange}
            className={`w-full text-sm font-medium rounded-xl border px-3.5 py-[9px] bg-slate-50/50 transition-all duration-200 outline-none focus:bg-white focus:ring-4 text-slate-700 cursor-pointer ${
              errors.dueDate
                ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                : "border-slate-200/80 focus:border-blue-500 focus:ring-blue-500/10"
            }`}
          />

          {errors.dueDate && (
            <div className="flex items-center gap-1.5 text-red-500 text-xs mt-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
              <FiAlertCircle className="flex-shrink-0" />
              <span>{errors.dueDate}</span>
            </div>
          )}
        </div>
      </div>

      {/* Submission Button Layout */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className={`w-full text-sm font-semibold tracking-wide text-white py-3.5 px-4 rounded-xl shadow-sm transition-all duration-200 flex items-center justify-center gap-2 select-none active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none ${
            editingTask
              ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-amber-500/10"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/10"
          }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Saving Workspace...
            </>
          ) : editingTask ? (
            "Save Changes"
          ) : (
            "Add Task to Workspace"
          )}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
