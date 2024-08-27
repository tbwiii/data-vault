import Link from "next/link";
import {
  IconLayoutDashboard,
  IconFilePlus,
  IconListDetails,
  IconLogin,
} from "@tabler/icons-react";

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
}: {
  label: string;
  icon: any;
  href: string;
}) => (
  <Link href={href}>
    <button
      className="
      flex
      items-center
      gap-2
      py-2
      px-5
      w-64
      text-azure-400
      hover:bg-azure-500
      hover:text-azure-800
      transition-all"
    >
      {icon}
      {label}
    </button>
  </Link>
);

export function Menu() {
  return (
    <div className="flex flex-col gap-2">
      {menuItems.map((item) => (
        <MenuItem
          key={item.label}
          label={item.label}
          icon={item.icon}
          href={item.href}
        />
      ))}
    </div>
  );
}
