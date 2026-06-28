import {
  FiEdit2,
  FiTrash2,
  FiCalendar,
  FiCheckCircle,
  FiRotateCcw,
  FiFolder,
} from "react-icons/fi";

function TaskCard({ task, onEdit, onDelete, onToggleStatus }) {
  // Premium, softer SaaS color tokens featuring rich border matches
  const priorityColor = {
    Low: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Medium: "bg-amber-50 text-amber-700 border-amber-100",
    High: "bg-rose-50 text-rose-700 border-rose-100",
  };

  const statusColor = {
    Pending: "bg-slate-50 text-slate-600 border-slate-200",
    "In Progress": "bg-blue-50 text-blue-700 border-blue-100",
    Completed: "bg-emerald-50 text-emerald-700 border-emerald-100",
  };

  const getDueDateInfo = () => {
    if (!task.dueDate) return null;

    const today = new Date();
    const due = new Date(task.dueDate);

    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    const diff = (due - today) / (1000 * 60 * 60 * 24);

    if (diff < 0) {
      return {
        text: "Overdue",
        color: "text-rose-600 bg-rose-50 border-rose-100",
      };
    }

    if (diff === 0) {
      return {
        text: "Due Today",
        color: "text-amber-600 bg-amber-50 border-amber-100",
      };
    }

    return {
      text: due.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }),
      color: "text-slate-500 bg-slate-50 border-slate-100",
    };
  };

  const dueDateInfo = getDueDateInfo();

  // Custom Interceptor to trigger smooth visual focus handling
  const handleEditClick = () => {
    // 1. Run the existing application state logic to populate the form fields
    onEdit(task);

    // 2. Mobile Responsive Scroll Redirection
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // 3. Desktop UI Spotlight Focus
    const titleInput = document.querySelector('input[name="title"]');
    if (titleInput) {
      setTimeout(() => {
        titleInput.focus();
        // Applies a clean amber border glow to highlight the editing state
        titleInput.classList.add(
          "ring-4",
          "ring-amber-500/20",
          "border-amber-400",
        );
        setTimeout(() => {
          titleInput.classList.remove(
            "ring-4",
            "ring-amber-500/20",
            "border-amber-400",
          );
        }, 1200);
      }, 150);
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-xl hover:border-slate-300/70 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full bg-gradient-to-b from-white to-slate-50/30">
      {/* Top Meta Area */}
      <div>
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-slate-900 tracking-tight leading-snug group-hover:text-blue-600 transition-colors duration-200">
              {task.title}
            </h2>

            {/* Category Node badge element */}
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-slate-100/60 px-2 py-0.5 rounded-md">
              <FiFolder className="text-[11px]" />
              <span>{task.category}</span>
            </div>
          </div>

          {/* Priority Status Pill badge element */}
          <span
            className={`flex-shrink-0 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase border ${
              priorityColor[task.priority] || "bg-slate-100 text-slate-700"
            }`}
          >
            {task.priority}
          </span>
        </div>

        {/* Task Description Body Text area */}
        <p className="text-slate-600 text-sm font-normal line-clamp-3 mt-4 leading-relaxed whitespace-pre-line">
          {task.description}
        </p>
      </div>

      {/* Footer Area with Badges and Actions */}
      <div className="mt-6 pt-4 border-t border-slate-100 space-y-4">
        {/* Badges Container row */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
              statusColor[task.status] || "bg-slate-100 text-slate-700"
            }`}
          >
            {task.status}
          </span>

          {dueDateInfo && (
            <div
              className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full border ${dueDateInfo.color}`}
            >
              <FiCalendar className="text-[11px]" />
              <span>{dueDateInfo.text}</span>
            </div>
          )}
        </div>

        {/* Core Actions Button control cluster */}
        <div className="flex items-center justify-between gap-2 pt-1">
          {/* Main Status Toggle (Left Anchor) */}
          <button
            onClick={() => onToggleStatus(task._id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold select-none shadow-sm transition-all duration-200 active:scale-[0.97] cursor-pointer ${
              task.status === "Completed"
                ? "bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200/60"
                : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/5"
            }`}
          >
            {task.status === "Completed" ? (
              <>
                <FiRotateCcw className="text-sm" />
                <span>Reopen Task</span>
              </>
            ) : (
              <>
                <FiCheckCircle className="text-sm" />
                <span>Complete</span>
              </>
            )}
          </button>

          {/* Sub-actions cluster (Right Anchor) */}
          <div className="flex items-center gap-1.5">
            {/* Edit Button with enhanced click interception */}
            <button
              onClick={handleEditClick}
              title="Edit Task Properties"
              className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 border border-transparent hover:border-blue-100 transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <FiEdit2 className="text-sm" />
            </button>

            {/* Delete Button */}
            <button
              onClick={() => onDelete(task._id)}
              title="Permanently Delete Task"
              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <FiTrash2 className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
