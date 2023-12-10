import React, { FC } from 'react';
import { UsersList } from '../UsersList/UsersList';
import { useLocation } from 'react-router-dom';
import { fetchOptions } from '../../utils';
import { UsersAPI } from '../../types';

export const UsersSearchPage: FC = () => {
  const [searchUsers, setSearchUsers] = React.useState<UsersAPI[] | null>(null);
  const location = useLocation();

  React.useEffect(() => {
    fetch(`https://api.github.com/search/users${location.search}`, fetchOptions)
      .then((res) => res.json())
      .then((res) => setSearchUsers(res.items));
  }, [location.search]);

  return (
    <>
      <main>
        <div className="container">
          <h1 className="title">Пользователи по запросу {location.search.slice(3)}</h1>
          {searchUsers && <UsersList users={searchUsers} />}
        </div>
      </main>
    </>
  );
};
