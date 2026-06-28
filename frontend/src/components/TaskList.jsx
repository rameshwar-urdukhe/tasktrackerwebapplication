import TaskCard from "./TaskCard";
import EmptyState from "./EmptyState";

function TaskList({ tasks, onEdit, onDelete, onToggleStatus, onCreateTask }) {
  if (tasks.length === 0) {
    // Preserved existing onCreateTask reference
    return <EmptyState onCreateTask={onCreateTask} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="animate-in fade-in-50 slide-in-from-bottom-6 duration-300 ease-out fill-mode-both"
          style={{ animationDelay: `${tasks.indexOf(task) * 40}ms` }}
        >
          <TaskCard
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleStatus={onToggleStatus}
          />
        </div>
      ))}
    </div>
  );
}

export default TaskList;
