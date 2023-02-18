import { User } from "@prisma/client";

interface UsersListProps {
  users: User[];
  searchQuery: string | undefined;
}

export function UsersList({ users, searchQuery }: UsersListProps) {
  if (users.length === 0) {
    if (!searchQuery) {
      return <div>No results</div>;
    }

    return (
      <div>
        No results for query <code>{searchQuery}</code>
      </div>
    );
  }

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.firstName} | {user.lastName}
        </li>
      ))}
    </ul>
  );
}
