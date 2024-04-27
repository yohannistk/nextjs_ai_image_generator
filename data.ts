import { Library, Pencil, Users } from "lucide-react";
import { SideBarData } from "./types";

export const sideBarData: SideBarData[] = [
  {
    label: "Generate",
    href: "/generate",
    icon: Pencil,
  },
  {
    label: "Library",
    href: "/library",
    icon: Library,
  },
  {
    label: "Community",
    href: "/community",
    icon: Users,
  },
];
