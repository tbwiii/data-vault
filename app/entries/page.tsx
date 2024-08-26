import { getEntreies } from "@schema/entries";
import EntriesTable from "./entries-table";
import fonts from "@/lib/util/fonts";

const EntryPage = async () => {
  const { entries } = await getEntreies({
    orderBy: "updatedAt",
    limit: 10,
    direction: "desc",
    where: { deleted: false },
  });

  return (
    <div className="container grid gap-4 py-8">
      <h1 className={`${fonts.cutive} text-3xl`}>Entries</h1>
      <div>Todo: filers</div>
      <EntriesTable entries={entries} />
    </div>
  );
};

export default EntryPage;
