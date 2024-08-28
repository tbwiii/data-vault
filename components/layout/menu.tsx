import Link from "next/link";
import BlurFade from "@/components/magicui/blur-fade";
import {
  IconLayoutDashboard,
  IconFilePlus,
  IconListDetails,
  IconLogin,
} from "@tabler/icons-react";
import { useState } from "react";

const menuItems = [
  { label: "Dashboard", icon: <IconLayoutDashboard />, href: "/" },
  { label: "Entries", icon: <IconListDetails />, href: "/entries" },
  { label: "New", icon: <IconFilePlus />, href: "/new" },
  // { label: 'Settings', icon: null href: '/settings' },
  // { label: 'Users', icon: null href: '/users' },
  // { label: 'Roles', icon: null href: '/roles' },
  // { label: 'Permissions', icon: null href: '/permissions' },
];

const MenuItem = ({
  label,
  icon,
  href,
  textVisible,
  sidebarOpen,
  setHoveredButton,
}: {
  label: string;
  icon: any;
  href: string;
  textVisible: boolean;
  sidebarOpen: boolean | null;
  setHoveredButton: (label: string | null) => void;
}) => (
  <Link href={href}>
    <button
      onMouseEnter={() => setHoveredButton(label)}
      onMouseLeave={() => setHoveredButton(null)}
      className={`
        text-neutral-400
        hover:bg-azure-600
        hover:text-neutral-100
        rounded-r
        flex
        items-center
        gap-2
        py-2
        px-5
        ${sidebarOpen && "w-64"}
        transition-all`}
    >
      {icon}
      {textVisible && (
        <BlurFade
          variant={{
            hidden: { x: -6, opacity: 0, filter: `blur(6px)` },
            visible: { x: 0, opacity: 1, filter: `blur(0px)` },
          }}
        >
          <div>{label}</div>
        </BlurFade>
      )}
    </button>
  </Link>
);

export function Menu({ sidebarOpen }: { sidebarOpen: boolean }) {
  const [hoveredButton, setHoveredButton] = useState<null | string>(null);

  return (
    <div className="flex flex-col gap-2">
      {menuItems.map((item) => (
        <MenuItem
          setHoveredButton={setHoveredButton}
          sidebarOpen={sidebarOpen}
          textVisible={sidebarOpen || hoveredButton === item.label}
          key={item.label}
          label={item.label}
          icon={item.icon}
          href={item.href}
        />
      ))}
    </div>
  );
}
