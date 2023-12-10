import React, { FC } from 'react';
import { UsersList } from '../UsersList/UsersList';
import { UsersAPI } from '../../types';
import { fetchOptions } from '../../utils';

export const UsersPage: FC = () => {
  const [users, setUsers] = React.useState<UsersAPI[] | null>(null);

  React.useEffect(() => {
    fetch(`https://api.github.com/users`, fetchOptions)
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  return (
    <>
      <main>
        <div className="container">
          <UsersList users={users} />
        </div>
      </main>
    </>
  );
};
