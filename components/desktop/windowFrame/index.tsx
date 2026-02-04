import { ReactNode } from "react";

type WindowFrameProps = {
  title: string;
  onClose: () => void;
  sidebar: ReactNode;
  children: ReactNode;
  isMobile: boolean;
  isDragging: boolean;
  styles: string;
  transform?: string;
  onMouseDown: (e: React.MouseEvent) => void;
};

export function WindowFrame({
  title, onClose, sidebar, children, isMobile, isDragging, styles, transform = "none", onMouseDown
}: WindowFrameProps) {
  return (
    <div
      className={`flex bg-white dark:bg-[#1e1e1e] shadow-2xl border border-black/10 dark:border-white/10 overflow-hidden pointer-events-auto select-none transition-all duration-300 ease-out 
      ${styles} ${isDragging ? "scale-[0.99] opacity-90 duration-0" : ""}`}
      style={{ transform }}
    >
      <aside onMouseDown={onMouseDown} className="w-48 lg:w-56 bg-[#f6f6f6]/80 dark:bg-[#262626]/80 backdrop-blur-2xl border-r border-black/5 dark:border-white/5 pt-12 px-2 shrink-0">
        <div className="absolute top-4 left-4 flex gap-2">
          <button onClick={onClose} onMouseDown={e => e.stopPropagation()} className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        {sidebar}
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header onMouseDown={onMouseDown} className="h-12 flex items-center px-6 border-b border-black/5 cursor-default">
          <h2 className="text-sm font-bold dark:text-white">{title}</h2>
        </header>
        <main className="flex-1 p-6 overflow-auto bg-white dark:bg-[#1e1e1e]">{children}</main>
      </div>
    </div>
  );
}