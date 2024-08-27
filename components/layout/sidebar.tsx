import Link from "next/link";
import { Menu } from "@components/layout/menu";
import { Button } from "@components/ui/button";
import fonts from "@util/fonts";
import { signOut, auth } from "@lib/auth";

import { IconLogin } from "@tabler/icons-react";

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
            <button className="flex items-center gap-2 group">
              <img
                src={user?.image!}
                alt={user?.name!}
                className="rounded-full w-10 h-10 border-2 border-opal-300"
              />
              <div className="opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                Sign Out
              </div>
            </button>
          </form>
        </div>
      )}

      {!user && (
        <Link href="/login" className="flex flex-center">
          <Button>
            <IconLogin />
            Sign In
          </Button>
        </Link>
      )}
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
            shrink-0
            `}
    >
      <div
        className="flex
                flex-col
                justify-between
                h-screen
                fixed"
      >
        <div className="grid gap-4 pt-4">
          <button
            className={`
              bg-natural-700
              items-center
              gap-2
              text-azure-200
              p-4
              w-full
              ${true ? "grid" : "flex"}}`}
            type="button"
          >
            <img
              src="/data-vault-emblem.png"
              className={`m-auto ${true ? "w-32 h-32 mb-8" : "w-10 h-10"}`}
              alt="Data Valut Emblem"
            />
            <span className={`grow text-2xl ${fonts.cutive}`}>
              {"Data Vault".toUpperCase()}
            </span>
          </button>
          <Menu />
        </div>
        <div className="px-4 pb-2">
          <User />
        </div>
      </div>
    </div>
  );
}
