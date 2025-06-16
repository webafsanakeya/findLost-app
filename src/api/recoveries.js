export const myRecoveriesPromise = (email) => {
  return fetch(
    `https://find-lost-server-plum.vercel.app/recoveries?email=${email}`,
    {
      credentials: "include",
    }
  ).then((res) => {
    if (!res.ok) throw new Error("API error");
    return res.json();
  });
};
