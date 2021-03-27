import { Button } from "@chakra-ui/react";
import React from "react";

export default (): JSX.Element => {
  // const { firebase } = useFirebase();
  // console.log("f", firebase.auth());

  // if (loading) {
  //   return (
  //     <div>
  //       <p>Initialising User...</p>
  //     </div>
  //   );
  // }
  // if (error) {
  //   return (
  //     <div>
  //       <p>Error: {error}</p>
  //     </div>
  //   );
  // }
  // if (user) {
  //   return (
  //     <div>
  //       <p>Current User: {user.email}</p>
  //       <Button onClick={logout}>Log out</Button>
  //     </div>
  //   );
  // }
  return <Button>Log in</Button>;
};
