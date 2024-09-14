import { useState } from 'react';
import LoginService from './service';

export default function useHookLogin() {
  const [ email, setEmail ] = useState( '' );

  const handleSubmit = ( event: React.FormEvent ) => {
    event.preventDefault();
    LoginService.doLogin( { email } );
  };
  const handleChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    setEmail( e.target.value );
  };

  return { handleChange, handleSubmit, email };
}