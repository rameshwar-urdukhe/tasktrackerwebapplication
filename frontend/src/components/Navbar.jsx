import { FiCheckSquare, FiLayout } from "react-icons/fi";

function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo and Brand Engine */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-md shadow-blue-500/10 transition-transform duration-300 group-hover:scale-105">
            <FiCheckSquare className="text-white text-lg" />
          </div>

          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5 leading-none">
              Task Tracker
              {/* <span className="text-[10px] bg-blue-50 text-blue-600 border border-blue-100 font-semibold px-1.5 py-0.5 rounded-md uppercase tracking-wider scale-90 origin-left">
                v2.0
              </span> */}
            </h1>
            <p className="text-[11px] font-medium text-slate-400 mt-1 leading-none">
              Workspace Dashboard
            </p>
          </div>
        </div>
        {/* Action Controls Side Layout */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl select-none">
            {/* Live Pulsing Infrastructure Sync Light */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            {/* <span className="text-xs font-semibold text-slate-600 tracking-wide">
              MERN Core Active
            </span> */}
          </div>

          {/* User Workspace Status Chip Badge */}
          <div className="flex items-center justify-center p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-100 transition-all duration-200 cursor-pointer active:scale-95">
            <FiLayout className="text-base" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
