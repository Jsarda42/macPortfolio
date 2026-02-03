import SystemSettingsModal from "@/components/actionMenu/SystemSettingsModal";
import { Menu } from "@/types/Menu";

export const AppleAppMenu: Menu = {
  id: "Apple-app-menu",
  label: "Apple",
  items: [
    {
      type: "item",
      id: "apple-settings",
      label: "System Settings…",
      action: ({ openModal, closeActiveApp }) => {
       openModal(SystemSettingsModal, { onClose: () => closeActiveApp() });
      },
    }
  ],
};




