import { prisma } from "../lib/prisma";
import { Search } from "./Search";
import { UsersList } from "./UsersList";
import { setTimeout } from "timers/promises";
import LRUCache from "lru-cache";
import { User } from "@prisma/client";

interface HomePageProps {
  searchParams: Record<string, string>;
}

/**
 * Otherwise Next.js will think this page is static and run this component only once, ignoring the search params changes.
 */
export const revalidate = 0;

export default async function Home({ searchParams }: HomePageProps) {
  const searchQuery = searchParams.name;
  const users = await getUsers(searchQuery);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Search defaultValue={searchQuery} />
      <UsersList users={users} searchQuery={searchQuery} />
    </div>
  );
}

const cache = new LRUCache<string, User[]>({
  max: 100,
  ttl: 1000 * 60 * 5
});

async function getUsers(searchQuery: string | undefined = "") {
  const cachedUsers = cache.get(searchQuery);
  if (cachedUsers) {
    return cachedUsers;
  }

  if (!searchQuery) {
    await setTimeout(600);
    const users = await prisma.user.findMany();
    cache.set(searchQuery, users);
    return users;
  }

  await setTimeout(600);
  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          firstName: { contains: searchQuery }
        },
        { lastName: { contains: searchQuery } }
      ]
    }
  });
  cache.set(searchQuery, users);
  return users;
}
