import { NextRequest, NextResponse } from "next/server";
import { entries } from "@db";

export const GET = async (req: NextRequest) => {
  const query = req.nextUrl.searchParams;

  const data = await entries.getEntreies({
    limit: Number(query.get("limit")),
    offset: Number(query.get("offset")),
    orderBy: query.get("orderBy") as
      | "entryId"
      | "title"
      | "body"
      | "slug"
      | "createdAt"
      | "updatedAt",
    direction: query.get("direction") as "asc" | "desc",
  });
  return NextResponse.json(data, { status: 200 });
};

export const POST = async (req: Request) => {
  const entry = await req.json();
  const data = await entries.createEntry(entry);
  return NextResponse.json(data, { status: 200 });
};

export const PUT = async (req: Request) => {
  const entry = await req.json();
  const data = await entries.updateEntry(entry);
  return NextResponse.json(data, { status: 200 });
};

export const DELETE = async (req: Request) => {
  const { entryId } = await req.json();
  const data = await entries.deleteEntry(entryId);
  return NextResponse.json({ data }, { status: 200 });
};
