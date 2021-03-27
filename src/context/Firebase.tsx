import { useToast } from "@chakra-ui/toast";
import useLocalstorage from "@rooks/use-localstorage";
import firebase from "firebase";
import React, {
  ContextType,
  createContext,
  useCallback,
  useContext,
} from "react";
import firebaseConfig from "../config/firebaseConfig";

const fire = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

enum AvailablePoviders {
  GOOGLE,
  FACEBOOK,
}

const providers = {
  GOOGLE: new firebase.auth.GoogleAuthProvider(),
  FACEBOOK: new firebase.auth.FacebookAuthProvider(),
};

interface FirebaseContextInterface {
  firebase: firebase.app.App;
  signinGoogle: any;
  signinFacebook: any;
  signout: any;
  signupWithEmail: any;
  signinWithEmail: any;
  user: firebase.User | null;
  isAuthenticated: boolean;
}

// Create Context Object
export const FirebaseContext = createContext({} as FirebaseContextInterface);

export const useFirebase = (): ContextType<typeof FirebaseContext> =>
  useContext(FirebaseContext);

// Create a provider for components to consume and subscribe to changes
export const FirebaseContextProvider: React.FC = ({ children }) => {
  const toast = useToast();
  const [currentUser, setCurrentUser, removeCurrentUser] = useLocalstorage(
    "currentUser",
    null
  );

  const signinWithProvider = useCallback(
    async (provider: keyof typeof AvailablePoviders) => {
      try {
        // await fire.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const { user } = await fire.auth().signInWithPopup(providers[provider]);
        toast({
          title: `Welcome back! 💪🔥`,
          status: "success",
        });
        await setCurrentUser(user);
      } catch (error) {
        toast({
          title: `Unable to login`,
          status: "error",
        });
      }
    },
    [toast, setCurrentUser]
  );

  const signupWithEmail = useCallback(
    async (email, password) => {
      try {
        const { user } = await fire
          .auth()
          .createUserWithEmailAndPassword(email, password);
        toast({
          title: `Welcome back! 💪🔥`,
          status: "success",
        });
        setCurrentUser(user);
      } catch (error) {
        toast({
          title: `Unable to login`,
          status: "error",
        });
      }
    },
    [toast, setCurrentUser]
  );

  const signinWithEmail = useCallback(
    async (email, password) => {
      try {
        const { user } = await fire
          .auth()
          .signInWithEmailAndPassword(email, password);
        toast({
          title: `Welcome back! 💪🔥`,
          status: "success",
        });
        setCurrentUser(user);
      } catch (error) {
        toast({
          title: `Unable to login`,
          status: "error",
        });
      }
    },
    [toast, setCurrentUser]
  );

  const signinGoogle = useCallback(() => signinWithProvider("GOOGLE"), [
    signinWithProvider,
  ]);

  const signinFacebook = useCallback(() => signinWithProvider("FACEBOOK"), [
    signinWithProvider,
  ]);

  const signout = useCallback(async () => {
    try {
      await fire.auth().signOut();
      removeCurrentUser();
    } catch (error) {
      toast({
        title: `Unable to signout`,
        status: "error",
      });
    }
  }, [toast, removeCurrentUser]);

  // fire.auth().onAuthStateChanged((user) => {
  //   if (!user) {
  //     removeCurrentUser();
  //   } else {
  //     setCurrentUser(user);
  //   }
  // });

  return (
    <FirebaseContext.Provider
      value={{
        firebase: fire,
        signinGoogle,
        signinFacebook,
        isAuthenticated: !!currentUser,
        user: currentUser,
        signout,
        signupWithEmail,
        signinWithEmail,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
