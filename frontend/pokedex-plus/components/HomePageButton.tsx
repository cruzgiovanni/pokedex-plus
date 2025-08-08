export default function HomePageButton() {
  return (
    <a
      href="/"
      className="group relative inline-flex items-center gap-3 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-slate-600 hover:border-slate-500"
    >
      {/* Ícone da Pokébola mais clean */}
      <div className="w-6 h-6 relative">
        <div className="w-6 h-6 rounded-full bg-gradient-to-b from-red-500 to-red-600 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-3 bg-red-500"></div>
          <div className="absolute bottom-0 left-0 w-full h-3 bg-gray-100"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-slate-800 transform -translate-y-px"></div>
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-gray-100 rounded-full border border-slate-800 transform -translate-x-1/2 -translate-y-1/2">
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-slate-800 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>
      </div>

      <span className="group-hover:text-gray-100 transition-colors duration-200">
        Back to Pokédex
      </span>

      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </a>
  )
}
