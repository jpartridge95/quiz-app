import React, { FunctionComponent } from 'react';
import { Route, Switch } from "react-router-dom";
import Home from "./components/HomePage/home"
import NavBar from "./components/navbar/navbar"
import NewQuiz from './components/NewQuiz/newQuiz';
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import AnswerQuiz from './components/AnswerQuiz/AnswerQuiz';
import ViewMyQuizzes from './components/MyQuizzes/ViewMyQuizzes';

const configEnv: string = process.env["REACT_APP_FIREBASE_CONFIG"] as string
const firebaseConfig =  JSON.parse(configEnv)
firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const App:FunctionComponent = () => {

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/createquiz" component={NewQuiz} />
      <Route path="/answerquiz/:id" component={AnswerQuiz} />
      <Route path="/myquizzes" component={ViewMyQuizzes} />
    </Switch>
  );
}

export default App;
