import './App.css';
import { SignIn } from './components/Authorisation/SignIn/SignIn';
import { SignUp } from './components/Authorisation/SignUp/SignUp';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { UserProfile } from './components/UserProfile/UserProfile';

function App() {
  return (
    <>
      <SignUp/>
      <hr/>
      <SignIn/>
      <hr/>
      <Header/>
      <Main />
      <Footer/>
      <hr/>
      <UserProfile/>
    </>
  );
};

export default App;
