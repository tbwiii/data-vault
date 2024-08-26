import { Suspense } from "react";
import React from "react";
import EntryList from "./EntryList";
import { getEntreies } from "@schema/entries";
import { Skeleton } from "@components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "@components/ui/card";

export default async function RecentCreated() {
  const { entries } = await getEntreies({
    orderBy: "createdAt",
    limit: 10,
    direction: "desc",
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 className="font-bold mb-4">Recently Edited</h2>
        </CardTitle>
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
          <EntryList entries={entries} createdAt={true}></EntryList>
        </Suspense>
      </CardContent>
    </Card>
  );
}
