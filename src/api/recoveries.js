export const myRecoveriesPromise = email => {
  return fetch(`http://localhost:3000/recoveries?email=${email}`, {
    credentials: 'include'
  })
    .then(res => res.json()); 
};