import React, { FC, useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link, Redirect, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { FcGoogle } from "react-icons/fc";
import { useInput } from '../hooks/useInput';
import { auth } from '../firebase';
import { signWithGoogle } from '../services/firebase';
import { formsStyles } from '../styles/Forms.styles';
import { useTypeSelector } from '../hooks/useTypeSelector';

export const Login: FC = () => {

    const classes = formsStyles();

    const email = useInput('');
    const password = useInput('');

    const [errorEmail, setErrorEmail] = useState<string>('');
    const [errorPassword, setErrorPassword] = useState<string>('');
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    const history = useHistory();

    const { user } = useTypeSelector(state => state.user);

    const handleSubmit = (e: any) => {

        e.preventDefault();

        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!email.value) {
            setErrorEmail('Введите ваш email');
        } else if (!reg.test(String(email.value).toLowerCase())) {
            setErrorEmail('Введите корректный email');
        } else {
            setErrorEmail('');
        }

        if (!password.value) {
            setErrorPassword('Введите пароль');
        } else if (password.value.length < 6) {
            setErrorPassword('Пароль должен состоять минимум из 6 символов');
        } else {
            setErrorPassword('');
        }

        setIsSubmit(true);

    }

    const signInGoogle = async () => {
        try {
            await signWithGoogle();
            history.push('/');
        } catch {
            console.log('error');
        }
    }

    const signInEmail = async (email: string, password: string) => {
        await auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                history.push('/');
            })
            .catch((error) => {
                if (error.code === 'auth/user-not-found') {
                    setErrorEmail('Такой email не зарегистрирован');
                } else if (error.code === 'auth/wrong-password') {
                    setErrorPassword('Неверный пароль');
                }
            });
    }

    useEffect(() => {
        if (isSubmit) {
            if (errorEmail || errorPassword) {
                setIsSubmit(false);
            } else {
                signInEmail(email.value, password.value);
            }
        }
    }, [errorEmail, errorPassword, isSubmit]);

    useEffect(() => {
        document.title = 'React News - Вход';
    }, []);

    if (user) return <Redirect to="/" />;

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AccountCircleIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Вход
                </Typography>
                <form onSubmit={handleSubmit} className={classes.form} noValidate>
                    <TextField
                        onChange={(e) => email.onChange(e)}
                        value={email.value}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoFocus
                        error={errorEmail ? true : false}
                        helperText={errorEmail}
                    />
                    <TextField
                        onChange={(e) => password.onChange(e)}
                        value={password.value}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        error={errorPassword ? true : false}
                        helperText={errorPassword}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Войти
                    </Button>
                    <Button
                        onClick={signInGoogle}
                        fullWidth
                        variant="contained"
                        color="default"
                        className={classes.iconButton}
                    >
                        <FcGoogle className={classes.icon} />
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link className={classes.link} to="/signup">
                                Регистрация
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
