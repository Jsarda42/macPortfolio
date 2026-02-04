import SystemSettingsModal from "@/components/desktop/systemSettings";
import { Menu } from "@/types/Menu";

export const AppleAppMenu: Menu = {
  id: "Apple-app-menu",
  label: "Apple",
  items: [
    {
      type: "item",
      id: "apple-settings",
      label: "System Settings…",
      action: (h) => h.openModal(SystemSettingsModal)
    }
  ],
};




