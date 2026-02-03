import { Menu } from "@/types/Menu";

export const DummyAppMenu: Menu = {
  id: "dummy-app-menu",
  label: "Dummy",
  items: [
    {
      type: "item",
      id: "about-dummy",
      label: "About dummy",
    },
    { type: "separator", id: "sep-1" },
    {
      type: "item",
      id: "dummy-settings",
      label: "Settings…",
    },
    { type: "separator", id: "sep-2" },
    {
      type: "item",
      id: "quit-dummy",
      label: "Quit Dummy",
    },
  ],
};
