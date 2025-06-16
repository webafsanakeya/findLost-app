export const itemsCreatedByPromise = (email) => {
  return fetch(
    `https://find-lost-server-plum.vercel.app/items/recoveries?email=${email}`
  ).then((res) => res.json());
};
