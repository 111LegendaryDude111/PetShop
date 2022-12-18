import './App.css';
import { SignIn } from './components/Authorisation/SignIn/SignIn';
import { SignUp } from './components/Authorisation/SignUp/SignUp';
import { HomePage } from './components/HomePage/HomePage';

function App() {

  return (
      <>
      <SignIn/>
      <SignUp/>
      <HomePage/>
      </> 
  );
};

export default App;
