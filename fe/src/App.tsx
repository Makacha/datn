import React from 'react';
import AppLayout from "./containers/AppLayout";
import {browserHistory, userHelpers} from "./helpers";
import {UserContext} from "./contexts";
import {userHooks} from "./hooks";
import Login from "./containers/Login";
import CenterSpin from "./Components/shared/Spin/CenterSpin";

function App() {

  if (!userHelpers.isLoggedIn())
    return <Login/>;

  const {currentUser} = userHooks.useCurrentUser();

  if (!currentUser)
    return <CenterSpin/>;

  return (
    <UserContext.Provider value={{userInfo:currentUser}}>
      <AppLayout/>
    </UserContext.Provider>
  );
}

export default App;
