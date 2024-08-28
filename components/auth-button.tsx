import Link from "next/link";
import { signOut, auth } from "@lib/auth";
import { Button } from "@components/ui/button";
import { IconLogin } from "@tabler/icons-react";

export default async function AuthButton() {
  let session = await auth();
  let user = session?.user;

  return (
    <div className="flex gap-2 items-center">
      {user && (
        <div>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button className="flex items-center pl-3 gap-2 group">
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
