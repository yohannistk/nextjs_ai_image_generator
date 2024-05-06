import { Library, LucideIcon, Pencil, Users } from "lucide-react";

export const MAXIMUM_GENERATION_LIMIT = 5;

export const sideBarData: { icon: LucideIcon; label: string; href: string }[] =
  [
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
