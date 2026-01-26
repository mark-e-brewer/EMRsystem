import { db } from '../utils/auth';

const getUserByUid = (uid) => new Promise((resolve, reject) => {
  fetch(`${db}/users/${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getUserByUid2 = async (uid) => {
  try {
    const snapshot = await db.ref(`users/${uid}`).once('value');
    return snapshot.exists() ? snapshot.val() : null;
  } catch (err) {
    console.error('Error fetching user:', err);
    return null;
  }
};
export {
  getUserByUid,
  getUserByUid2,
};
