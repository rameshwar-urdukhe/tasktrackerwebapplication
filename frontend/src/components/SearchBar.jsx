import { FiSearch } from "react-icons/fi";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative w-full group">
      {/* Premium Search Vector Icon Indicator */}
      <FiSearch
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200 pointer-events-none"
        size={18}
      />

      {/* Main Form Input Field */}
      <input
        type="text"
        placeholder="Search tasks, descriptions, or keywords..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full rounded-xl border border-slate-200/80 bg-slate-50/40 py-3 pl-11 pr-12 text-sm font-normal text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
      />

      {/* Modern SaaS Quick-Key Accent Indicator Node */}
      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-slate-200 bg-slate-100 text-[10px] font-bold text-slate-400 select-none pointer-events-none tracking-wide uppercase">
        ⌘K
      </div>
    </div>
  );
}

export default SearchBar;
