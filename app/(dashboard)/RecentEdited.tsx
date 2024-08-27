import { Suspense } from "react";
import { getEntreies } from "@schema/entries";
import EntryList from "./EntryList";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "@components/ui/card";

export default async function RecentCreated() {
  const { entries } = await getEntreies({
    orderBy: "updatedAt",
    limit: 10,
    direction: "desc",
    where: { private: false },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recently Edited</CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense
          fallback={
            <div className="opacity-60">
              <div className="">
                {Array.from({ length: 8 }).map((_, index) => (
                  <Skeleton key={index} className="mb-3 h-16 rounded" />
                ))}
              </div>
            </div>
          }
        >
          <EntryList entries={entries} updatedAt={true}></EntryList>
        </Suspense>
      </CardContent>
    </Card>
  );
}
