import { AppConfig } from "@/types/system";
import { SettingsView } from "@/components/apps/Settings/SettingsView";

export const settingsApp: AppConfig = {
  id: "settings",
  name: "Settings",
  icon: "/icons/settings.png",
  windowContent: SettingsView,
  menu: {
    label: "Settings",
    items: [
      { id: "about", label: "About Settings", type: "item" },
      { id: "sep1", label: "", type: "separator" },
      { id: "pref", label: "Preferences", type: "item" },
    ],
  },
};