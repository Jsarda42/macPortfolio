import { AppConfig } from "@/types/system";
import Calculator from "@/components/apps/Calculator";

export const calculatorApp: AppConfig = {
  id: "calculator-app",
  name: "Calculator",
  icon: "/icons/calculator.webp",
  windowContent: Calculator,
  menu: {
    label: "Calculator",
    items: [
      { id: "about", label: "About Calculator", type: "item" },
      { id: "sep1", label: "", type: "separator" },
      { id: "hide", label: "Hide Calculator", type: "item" },
    ],
  },
};