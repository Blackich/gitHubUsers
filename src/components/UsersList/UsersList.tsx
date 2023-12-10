import React, { FC } from 'react';
import './UsersList.css';
import { GitHubUserAPI, UsersAPI } from '../../types';
import { Link } from 'react-router-dom';
import { declOfNum, fetchMultipleRequests } from '../../utils';

interface Props {
  users: UsersAPI[] | null;
}

export const UsersList: FC<Props> = ({ users }) => {
  const [gitHubUsers, setGitHubUsers] = React.useState<GitHubUserAPI[]>();

  React.useEffect(() => {
    const urls = users?.map((user) => `https://api.github.com/users/${user.login}`);
    !!urls && fetchMultipleRequests(urls).then((results) => setGitHubUsers(results));
  }, [users]);

  return (
    <div className="users-list">
      {gitHubUsers &&
        gitHubUsers.map((user) => (
          <section className="users-list__item" key={user.node_id}>
            <div className="users-list__image-container">
              <img className="users-list__image" src={`${user.avatar_url}`} alt={`${user.login} profile photo`} />
            </div>
            <div className="users-list__content">
              <h2 className="users-list__title">
                <Link className="link" to={`/users/${user.login}`} state={user.login}>
                  {user.login}
                </Link>
                ,{' '}
                {`${user.public_repos} ${declOfNum(Number(user.public_repos), [
                  'репозиторий',
                  'репозитория',
                  'репозиториев',
                ])}`}
              </h2>
              {user.company ? (
                <p className="users-list__text">{user.company}</p>
              ) : (
                <p className="users-list__text">Нет организации</p>
              )}
            </div>
          </section>
        ))}
    </div>
  );
};
