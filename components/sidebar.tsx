import Link from "next/link";
import { Button } from "@components/ui/button";
import fonts from "@util/fonts";
import { signOut, auth } from "@lib/auth";
import {
  EnterIcon,
  DashboardIcon,
  FileTextIcon,
  FilePlusIcon,
} from "@radix-ui/react-icons";

async function User() {
  let session = await auth();
  let user = session?.user;

  return (
    <div className="flex gap-2 items-center">
      {user && (
        <div className="p-2">
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button className="flex items-center gap-2">
              <img
                src={user?.image!}
                alt={user?.name!}
                className="rounded-full w-10 h-10 border-2 border-opal-300"
              />
              Sign Out
            </button>
          </form>
        </div>
      )}

      {!user && (
        <Link href="/login" className="flex flex-center">
          <Button>
            <EnterIcon />
            Sign In
          </Button>
        </Link>
      )}
    </div>
  );
}

const menuItems = [
  { label: "Dashboard", icon: <DashboardIcon />, href: "/" },
  { label: "Entries", icon: <FileTextIcon />, href: "/entries" },
  { label: "New", icon: <FilePlusIcon />, href: "/new" },
  // { label: 'Settings', icon: CodeIcon, href: '/settings' },
  // { label: 'Users', icon: CodeIcon, href: '/users' },
  // { label: 'Roles', icon: CodeIcon, href: '/roles' },
  // { label: 'Permissions', icon: CodeIcon, href: '/permissions' },
];

const MenuItem = ({
  label,
  icon,
  href,
}: {
  label: string;
  icon: any;
  href: string;
}) => {
  return (
    <Link href={href}>
      <button className="flex items-center gap-2 p-2 w-full">
        {icon}
        {label}
      </button>
    </Link>
  );
};

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

export default function Sidebar() {
  return (
    <div
      className={`
            bg-neutral-800
            bg-opacity-10
            relative
            z-10
            w-64
            `}
    >
      <div
        className="flex
                flex-col
                justify-between
                h-screen
                fixed"
      >
        <div>
          <button
            className="
                    bg-natural-700
                    flex
                    items-center
                    gap-2
                    text-azure-200
                    bg-
                    p-4
                    w-full"
            type="button"
          >
            <img
              src="/data-vault-emblem.png"
              className="w-10 h-10"
              alt="Data Valut Emblem"
            />
            <span className={`grow text-2xl ${fonts.cutive}`}>
              {"Data Vault".toUpperCase()}
            </span>
          </button>
          <div className="py-4 px-2">{<Menu />}</div>
        </div>
        <div className="py-4 px-2">{<User />}</div>
      </div>
    </div>
  );
}
