import './App.css';
import { SignIn } from './Authorisation/SignIn';
import { SignUp } from './Authorisation/SignUp/SignUp';

function App() {
  return (
    <>
    <header className='d-flex justify-content-center'>
      <SignUp/>
      <SignIn/>
    </header>


    </>
  );
};

export default App;
