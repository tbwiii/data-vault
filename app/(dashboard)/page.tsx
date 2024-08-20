import RecentCreated from "./RecentCreated";
import RecentEdited from "./RecentEdited";

export default function Home() {
  return (
    <main className="p-8 grid grid-cols-2 gap-4">
      <RecentCreated />
      <RecentEdited />
    </main>
  );
}
