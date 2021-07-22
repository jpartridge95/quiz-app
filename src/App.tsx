import React, { FunctionComponent, lazy, Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import NavBar from './components/navbar/navbar';
// import Home from "./components/HomePage/home"
// import NewQuiz from './components/NewQuiz/newQuiz';
// import AnswerQuiz from './components/AnswerQuiz/AnswerQuiz';
// import ViewMyQuizzes from './components/MyQuizzes/ViewMyQuizzes';
// import CookiePage from './components/Cookies/cookiePage';

// Lazy Loading experiment

const Home = lazy(() => 
  import("./components/HomePage/home"));

const NewQuiz = lazy(() => 
  import('./components/NewQuiz/newQuiz'));

const AnswerQuiz = lazy(() =>
  import('./components/AnswerQuiz/AnswerQuiz'));

const ViewMyQuizzes = lazy(() => 
  import('./components/MyQuizzes/ViewMyQuizzes'));

const CookiePage = lazy(() => 
  import('./components/Cookies/cookiePage'))


const configEnv: string = process.env["REACT_APP_FIREBASE_CONFIG"] as string
const firebaseConfig =  JSON.parse(configEnv)
firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const App:FunctionComponent = () => {

  return (
    <>
      <NavBar />
      <Suspense fallback={
        <div>Loading...</div>
        // Will now need a proper fallback component
      }>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/createquiz" component={NewQuiz} />
          <Route path="/answerquiz/:id" component={AnswerQuiz} />
          <Route path="/myquizzes" component={ViewMyQuizzes} />
          <Route path="/cookies" component={CookiePage} />
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
