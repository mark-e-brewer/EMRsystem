import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { signIn, signOut, onAuthStateChange } from '../utils/auth';

function Signin() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return unsubscribe; // cleanup on unmount
  }, []);

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        margin: '0 auto',
        zIndex: 1,
        minHeight: '25rem',
        width: '100%',
        minWidth: '30rem',
        paddingBlock: '0 5rem',
      }}
    >
      {user ? (
        <>
          <h1>Welcome, {user.displayName} 👋</h1>
          <p>You are signed in with {user.email}</p>
          <Button
            type="button"
            size="lg"
            className="copy-btn"
            onClick={signOut}
          >
            Sign Out
          </Button>
        </>
      ) : (
        <>
          <h1>Hi there!</h1>
          <p>Click the button below to login!</p>
          <Button
            type="button"
            size="lg"
            className="copy-btn"
            onClick={signIn}
          >
            Sign In
          </Button>
        </>
      )}
    </div>
  );
}

export default Signin;
