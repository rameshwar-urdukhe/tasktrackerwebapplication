import { FiGrid, FiClock, FiCheckCircle } from "react-icons/fi";

function FilterBar({ filter, setFilter }) {
  const filters = [
    { name: "All", icon: <FiGrid className="text-sm" /> },
    { name: "Pending", icon: <FiClock className="text-sm" /> },
    { name: "Completed", icon: <FiCheckCircle className="text-sm" /> },
  ];

  return (
    <div className="inline-flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200/40 w-full sm:w-auto overflow-x-auto no-scrollbar">
      {filters.map((item) => {
        const isActive = filter === item.name;

        return (
          <button
            key={item.name}
            onClick={() => setFilter(item.name)}
            className={`flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all duration-200 select-none whitespace-nowrap flex-1 sm:flex-initial cursor-pointer active:scale-[0.98] ${
              isActive
                ? "bg-white text-blue-600 shadow-sm border border-slate-200/60"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/50"
            }`}
          >
            {/* Dynamic Icon Node Container */}
            <span
              className={
                isActive
                  ? "text-blue-500"
                  : "text-slate-400 group-hover:text-slate-600"
              }
            >
              {item.icon}
            </span>

            <span>{item.name}</span>
          </button>
        );
      })}
    </div>
  );
}

export default FilterBar;
