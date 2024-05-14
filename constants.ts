import { Library, LucideIcon, Pencil, Users } from "lucide-react";

export const MAXIMUM_GENERATION_LIMIT = 5;

export const avilableSizes = [
  64, 128, 192, 256, 320, 384, 446, 512, 576, 640, 704, 768, 832, 896, 960,
  1024,
];

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
