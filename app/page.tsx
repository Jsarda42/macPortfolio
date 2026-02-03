"use client";
import { useMenu } from "@/context/MenuContext";
// import { DummyApp as DummyAppData } from "@/data/apps/dummy"; // <-- import your object

// export function DummyButton() {
//   const { setActiveApp } = useMenu();

//   return (
//     <button
//       onClick={() => setActiveApp(DummyAppData)}
//       className="mt-10 px-4 py-2 bg-black text-white rounded"
//     >
//       Open Dummy App
//     </button>
//   );
// }

// export function DummyApp() {
//   const { closeActiveApp } = useMenu();

//   return (
//     <div
//       className="absolute top-24 left-24 w-96 h-64 bg-white shadow-xl"
//       onMouseDown={(e) => e.stopPropagation()} // prevent click propagation
//     >
//       <div className="flex justify-between p-2 border-b">
//         <span>Dummy App</span>
//         <button onClick={closeActiveApp}>✕</button>
//       </div>

//       <div className="p-4">Hello from Dummy 👋</div>
//     </div>
//   );
// }

export default function Home() {
  const { activeApp, closeActiveApp } = useMenu();

  return (
    <main
      className="min-h-screen bg-cover bg-center p-6"
      style={{
        backgroundImage: "url('wallpapers/snowyMorning.webp')",
      }}
      onMouseDown={closeActiveApp}
    >
      {/* <DummyButton /> */}

      {/* {activeApp.id === DummyAppData.id && <DummyApp />} */}
    </main>
  );
}


