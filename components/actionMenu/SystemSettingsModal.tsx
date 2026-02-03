"use client";

type SystemSettingsModalProps = {
  onClose: () => void;
};

export default function SystemSettingsModal({ onClose }: SystemSettingsModalProps) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
      onMouseDown={onClose} // clicking outside closes
    >
      <div
        className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl w-96"
        onMouseDown={(e) => e.stopPropagation()} // prevent modal click from closing
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">System Settings</h2>
          <button className="text-gray-600 dark:text-gray-300" onClick={onClose}>
            ✕
          </button>
        </div>
        <div>
          <p>Here you can implement your system settings later.</p>
        </div>
      </div>
    </div>
  );
}

