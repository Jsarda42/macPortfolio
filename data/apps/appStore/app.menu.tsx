import { AppStoreModal } from "@/components/dock/appStore/AppStoreModal";
import { Menu } from "@/types/Menu";

export const AppleAppStoreMenu: Menu = {
  id: "Apple-app-store-menu",
  label: "App Store",
  action: (h) => h.openModal(AppStoreModal),
  items: [

  ],
};