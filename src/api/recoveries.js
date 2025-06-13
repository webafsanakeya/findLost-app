export const myRecoveriesPromise = email => {
  return fetch(`http://localhost:3000/recoveries?email=${email}`)
    .then(res => res.json()); 
};