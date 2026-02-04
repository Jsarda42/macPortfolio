export function AppStoreModal() {
  return (
    <div className="flex h-full w-full bg-[#F6F6F6] dark:bg-[#1E1E1E] rounded-lg overflow-hidden">
      {/* Sidebar */}
      <aside className="w-52 bg-white/50 dark:bg-black/20 backdrop-blur-xl border-r border-black/10 p-4">
        <div className="space-y-2 mt-8">
          {['Discover', 'Create', 'Work', 'Play', 'Develop', 'Categories'].map(item => (
            <div key={item} className="px-3 py-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10 cursor-default text-sm">
              {item}
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Discover</h1>
        
        {/* Featured Card (e.g., your Calculator) */}
        <div className="relative w-full h-64 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-lg overflow-hidden">
           <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <span className="uppercase text-xs font-bold opacity-80">Featured App</span>
                <h2 className="text-4xl font-extrabold">Calculator</h2>
                <p className="mt-2 opacity-90">Precision at your fingertips.</p>
              </div>
              {/* <DownloadButton app={CalculatorAppData} /> */}
           </div>
        </div>
      </main>
    </div>
  );
}