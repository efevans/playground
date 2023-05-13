import React, { useEffect, useState } from 'react';
import LeftNavBar from './components/left_nav_bar_components/LeftNavBar';
import ContentArea from './components/ContentArea';
import LoginContext from './LoginContext';

const App = () => {
  const [user, setUser] = useState(null);
  console.log(`Rendering App, user is ${user}`)

  // This will be used on initial app load to check if we are currently "logged" in
  useEffect(() => {
    console.log("use effect in App")
    // Check local storage for token
    const token = localStorage.getItem('token');

    // If it exists, make request to see if it's valid (may have expired)
    // this should return some information about us, like username

    // If it is valid, use setUser to set user
    if (token) {
      setUser({ token: token, username: "Imbajoe" })
    }

    // Otherwise, do nothing. the initial useState is setting user to null so we don't need to set it to null again

    // Alternatively look into passing a method to useState
  }, []);

  return (<>
    <LoginContext.Provider value={{ user: user, setUser: setUser }} >
      <div id='app-divider'>
        <LeftNavBar />
        <ContentArea />
      </div>
    </LoginContext.Provider>
  </>);
}

export default App;