/* import styles from './Login.module.css';
import useHookLogin from './useHookLogin';

function Login(): JSX.Element {
  const { email, handleSubmit, handleChange } = useHookLogin();
  return (
    <form className={ styles.loginContainer } onSubmit={ handleSubmit }>
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        value={ email }
        onChange={ handleChange }
        className={ styles.input }
      />
      <button type="submit">
        Iniciar sesión
      </button>
    </form>
  );
};

export default Login; */


import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

const classes = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  form: {
    width: '100%',
    maxWidth: 360,
  },
  input: {
    marginBottom: "0.5rem",
  },
  button: {
    marginTop: "0.5rem",
  },
};

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div style={classes.root}>
      <Typography variant="h4">Login</Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          className={classes.input}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          className={classes.input}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;