import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { getUserByUid2 } from '../API/Promises';

function Home() {
  const { user } = useAuth();
  const [fetchedUser, setFetchedUser] = useState(null);

  // const getCurrentUser = () => {
  //   getUserByUid(user.uid).then(setFetchedUser);
  // };

  useEffect(() => {
    if (user && user.uid) {
      getUserByUid2(user.uid).then(setFetchedUser);
    }
  }, [user]);

  console.log(fetchedUser);

  if (!user) return <p>Loading user...</p>;

  return (
    <div style={{ textAlign: 'center', margin: '0 auto', maxWidth: '400px' }}>
      <h1>Hello {user.name || user.fbUser?.displayName}!</h1>
      <p>Your Bio: {fetchedUser?.bio || 'No bio yet'}</p>

      <h2>Fetched User Data:</h2>
      {fetchedUser ? (
        <pre>{JSON.stringify(fetchedUser, null, 2)}</pre>
      ) : (
        <p>Loading fetched user...</p>
      )}

      <Button variant="danger" size="lg" onClick={signOut}>S
        Sign Out
      </Button>
    </div>
  );
}

export default Home;
