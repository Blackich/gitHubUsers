import React, { FC } from 'react';
import './UserProfilePage.css';
import { useParams } from 'react-router-dom';
import { GitHubReposAPI, GitHubUserAPI } from '../../types';
import { convertBigNumber, declOfNum, fetchOptions } from '../../utils';

export const UserProfilePage: FC = () => {
  const { id } = useParams();
  const [ghUser, setGhUser] = React.useState<GitHubUserAPI | null>(null);
  const [ghRepos, setGhRepos] = React.useState<GitHubReposAPI[] | null>(null);

  React.useEffect(() => {
    Promise.all([
      fetch(`https://api.github.com/users/${id}`, fetchOptions).then((res) => res.json()),
      fetch(`https://api.github.com/users/${id}/repos`, fetchOptions).then((res) => res.json()),
    ]).then((response) => {
      const user: GitHubUserAPI = response[0];
      const repos: GitHubReposAPI[] = response[1];
      setGhUser(user);
      setGhRepos(repos);
    });
  }, [id]);

  return (
    <>
      <main>
        <div className="container">
          {ghUser && (
            <section className="user-profile">
              <div className="user-profile__image-container">
                <img className="user-profile__image" src={ghUser.avatar_url} alt={`${id} profile photo`} />
              </div>
              <div className="user-profile__content">
                <h1 className="user-profile__title">
                  {ghUser.name}, <span className="user-profile__accent">{ghUser.login}</span>
                </h1>
                <p className="user-profile__text">
                  <span className="user-profile__accent">{convertBigNumber(ghUser.followers)}</span>{' '}
                  {declOfNum(ghUser.followers, ['Подписчик', 'Подписчика', 'Подписчиков'])} ·{' '}
                  <span className="user-profile__accent">{convertBigNumber(ghUser?.following)}</span>{' '}
                  {declOfNum(ghUser.following, ['Подписка', 'Подписки', 'Подписок'])} ·{' '}
                  <a className="link" href={ghUser.blog} target="_blank" rel="noreferrer">
                    {ghUser.blog}
                  </a>
                </p>
              </div>
            </section>
          )}
          <section className="repository-list">
            <div className="repository-list__header">
              <h2 className="repository-list__title">Репозитории</h2>
              <a className="link" href={ghUser?.html_url} target="_blank" rel="noreferrer">
                Все репозитории
              </a>
            </div>

            <div className="repository-list__container">
              {ghRepos?.length == 0 ? (
                <p>Нет репозиториев</p>
              ) : (
                ghRepos?.slice(0, 10).map((item) => (
                  <section className="repository-list__item" key={item.id}>
                    <h3 className="repository-list__item-title">
                      <a className="link" href={item.html_url} target="_blank" rel="noreferrer">
                        {item.name}
                      </a>
                    </h3>
                    <p className="repository-list__item-text">{item.description}</p>
                  </section>
                ))
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};
