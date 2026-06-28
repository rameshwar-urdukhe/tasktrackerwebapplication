import { FiClipboard, FiPlus } from "react-icons/fi";

function EmptyState({ onCreateTask }) {
  const handleActionClick = (e) => {
    // If a custom parent callback handler exists, run it safely first
    if (onCreateTask) {
      onCreateTask(e);
    }

    // 1. Mobile First Smooth Redirection
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // 2. Large Screen Interface Spotlight Focus Micro-interaction
    // Finds the task creation panel input on the left screen pane and flashes it
    const titleInput = document.querySelector('input[name="title"]');
    if (titleInput) {
      setTimeout(() => {
        titleInput.focus();
        // Applies a temporary premium blue visual glow effect ring
        titleInput.classList.add(
          "ring-4",
          "ring-blue-500/30",
          "border-blue-500",
        );
        setTimeout(() => {
          titleInput.classList.remove(
            "ring-4",
            "ring-blue-500/30",
            "border-blue-500",
          );
        }, 1500);
      }, 300);
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6 sm:p-10 text-center max-w-xl mx-auto transition-all duration-300 bg-gradient-to-b from-white to-slate-50/50 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Visual Focal Area - Compact Stacked Isometric Icon Rings */}
      <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-500/10 to-indigo-500/5 border border-blue-500/10 shadow-sm animate-bounce [animation-duration:4s]">
        <div className="absolute inset-1.5 rounded-lg bg-white border border-blue-100 shadow-sm flex items-center justify-center">
          <FiClipboard className="text-xl text-blue-600" />
        </div>
        <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2 rounded-full bg-blue-500 border border-white shadow-sm" />
      </div>

      {/* Hero Messaging Block */}
      <div className="mt-5 space-y-1">
        <h2 className="text-base font-extrabold text-slate-900 tracking-tight sm:text-lg">
          Your workspace is clear
        </h2>
        <p className="mx-auto max-w-xs text-xs font-medium text-slate-500 leading-relaxed">
          Get started by mapping your first assignment. Active board views will
          stream directly into this section.
        </p>
      </div>

      {/* Custom Blueprint Reference Lines */}
      <div className="mt-5 max-w-xs mx-auto border border-dashed border-slate-200 rounded-xl p-2.5 bg-white/40 space-y-1.5 text-left hidden sm:block">
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
          <div className="w-3.5 h-3.5 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-[8px] text-slate-500 font-extrabold">
            1
          </div>
          <span>Define task parameters & parameters</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
          <div className="w-3.5 h-3.5 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-[8px] text-slate-500 font-extrabold">
            2
          </div>
          <span>Filter dynamically by board statuses</span>
        </div>
      </div>

      {/* Call To Action Engine */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleActionClick}
          className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs px-5 py-3 shadow-md shadow-blue-500/10 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 select-none cursor-pointer"
        >
          <FiPlus className="text-sm stroke-[3]" />
          <span>Initialize First Task</span>
        </button>
      </div>
    </div>
  );
}

export default EmptyState;
