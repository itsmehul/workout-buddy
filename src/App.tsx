import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import Header from "./components/Header";
import theme from "./config/theme";
import Homepage from "./pages/Homepage";

const App = (): JSX.Element => (
  <ChakraProvider theme={theme} resetCSS>
    <Header />
    <Homepage />
  </ChakraProvider>
);

// function AuthExample() {
//   return (
//     <Router>
//       <div>
//         <AuthButton />

//         <ul>
//           <li>
//             <Link to="/public">Public Page</Link>
//           </li>
//           <li>
//             <Link to="/protected">Protected Page</Link>
//           </li>
//         </ul>

//         <Switch>
//           <Route path="/public">
//             <PublicPage />
//           </Route>
//           <Route path="/login">
//             <LoginPage />
//           </Route>
//           <PrivateRoute permissions={["admin", "staff"]} path="/protected">
//             <ProtectedPage />
//           </PrivateRoute>
//         </Switch>
//       </div>
//     </Router>
//   );
// }

export default App;
