import React, { useEffect, useState } from 'react';
import LeftNavBar from './components/left_nav_bar_components/LeftNavBar';
import ContentArea from './components/ContentArea';
import LoginContext from './LoginContext';
import httpClient from './shared/HttpClient';

const App = () => {
  const [user, setUser] = useState(null);

  // This will be used on initial app load to check if we are currently "logged" in
  useEffect(() => {
    const getLoggedUser = async () => {
      var me = await getMe();
      if (me.loggedIn === true) {
        // If we've found a user, then we had a valid token in local storage, so take it from there
        const token = localStorage.getItem('token');
        setUser({ token: token, username: me.user.name })
      }
    }

    getLoggedUser()
      .catch(err => console.log('/me failed to respond, most likely were were not authenticated'));
  }, []);

  return (<>
    <LoginContext.Provider value={{ user: user, setUser: setUser }} >
      <div id='app-divider' className='app-color'>
        <LeftNavBar />
        <ContentArea />
      </div>
    </LoginContext.Provider>
  </>);
}

async function getMe() {
  const client = httpClient;
  const resp = await client.get("api/me");
  const token = resp.data;
  return token;
}

export default App;