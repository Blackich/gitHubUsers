export interface UsersAPI {
  login: string;
  avatar_url: string;
  node_id: string;
  html_url: string;
  public_repos: number;
}

export interface GitHubUserAPI {
  login: string;
  avatar_url: string;
  node_id: string;
  html_url: string;
  name: string;
  blog: string;
  public_repos: string;
  followers: number;
  following: number;
  company: string;
}

export interface GitHubReposAPI {
  id: number;
  name: string;
  html_url: string;
  description: string;
}
