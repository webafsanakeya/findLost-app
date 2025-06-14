export const itemsCreatedByPromise = (email) => {
  return fetch(`http://localhost:3000/items/recoveries?email=${email}`).then((res) =>
    res.json()
  );
};
