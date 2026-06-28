function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 w-full min-h-[250px] bg-white/40 backdrop-blur-sm rounded-2xl border border-slate-100 animate-in fade-in duration-300">
      <div className="relative flex items-center justify-center">
        {/* Outer Premium Accent Ring */}
        <div className="w-12 h-12 border-[3px] border-blue-600/10 border-t-blue-600 rounded-full animate-spin"></div>

        {/* Inner Counter-Rotating Tracking Ring */}
        <div className="absolute w-7 h-7 border-[2px] border-indigo-600/5 border-b-indigo-500 rounded-full animate-[spin_1.2s_linear_infinite_reverse]"></div>
      </div>

      {/* Dynamic Visual Loading Typography */}
      <div className="mt-5 text-center space-y-1">
        <p className="text-sm font-bold text-slate-800 tracking-tight animate-pulse">
          Synchronizing Workspace
        </p>
        <p className="text-xs font-medium text-slate-400 max-w-[200px] mx-auto tracking-wide">
          Fetching structural data links from core API...
        </p>
      </div>
    </div>
  );
}

export default Loader;
