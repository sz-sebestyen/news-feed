export const api = (path: string, options?: RequestInit | undefined) => {
  return fetch(`https://mindtech-feed-task.herokuapp.com${path}`, options);
};
