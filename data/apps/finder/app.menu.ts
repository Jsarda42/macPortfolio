import { Menu } from "@/types/Menu";

export const FinderAppMenu: Menu = {
  id: "finder-app-menu",
  label: "Finder",
  items: [
    {
      type: "item",
      id: "about-finder",
      label: "About Finder",
    },
    { type: "separator", id: "sep-1" },
    {
      type: "item",
      id: "finder-settings",
      label: "Settings…",
    },
    { type: "separator", id: "sep-2" },
    {
      type: "item",
      id: "quit-finder",
      label: "Quit Finder",
    },
  ],
};
