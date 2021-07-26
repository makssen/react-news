import React, { FC, useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { FcGoogle } from "react-icons/fc";
import Container from '@material-ui/core/Container';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useInput } from '../hooks/useInput';
import { auth } from '../firebase';
import { signWithGoogle } from '../services/firebase';
import { formsStyles } from '../styles/Forms.styles';
import { useTypeSelector } from '../hooks/useTypeSelector';

export const Signup: FC = () => {
    const classes = formsStyles();

    const nick = useInput('');
    const email = useInput('');
    const password = useInput('');
    const repeatPassword = useInput('');

    const [errorNick, setErrorNick] = useState<string>('');
    const [errorEmail, setErrorEmail] = useState<string>('');
    const [errorPassword, setErrorPassword] = useState<string>('');
    const [errorRepeatPassword, setErrorRepeatPassword] = useState<string>('');
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    const history = useHistory();

    const { user } = useTypeSelector(state => state.user);

    const handleSubmit = (e: any) => {

        e.preventDefault();

        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!nick.value) {
            setErrorNick('Введите ник-нейм');
        } else if (nick.value < 3) {
            setErrorNick('Ник-нейм должен состоять минимум из 3 символов');
        } else {
            setErrorNick('');
        }

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

        if (repeatPassword.value !== password.value) {
            setErrorRepeatPassword('Пароли не совпадают');
        } else {
            setErrorRepeatPassword('');
        }

        setIsSubmit(true);

    }

    const signUpGoogle = async () => {
        try {
            await signWithGoogle();
            history.push('/');
        } catch {
            console.log('error');
        }
    }

    const signUpEmail = async (email: string, password: string) => {
        await auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                let user = userCredential.user;
                history.push('/');
                user?.updateProfile({
                    displayName: nick.value
                });
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    setErrorEmail('Такой email уже используется');
                }
            });
    }

    useEffect(() => {
        if (isSubmit) {
            if (errorNick || errorEmail || errorPassword || errorRepeatPassword) {
                setIsSubmit(false);
            } else {
                signUpEmail(email.value, password.value);
            }
        }
    }, [errorNick, errorEmail, errorPassword, errorRepeatPassword, isSubmit]);

    useEffect(() => {
        document.title = 'React News - Регистрация';
    }, []);

    if (user) return <Redirect to="/" />;

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Регистрация
                </Typography>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                onChange={(e) => nick.onChange(e)}
                                value={nick.value}
                                name="nick"
                                variant="outlined"
                                fullWidth
                                id="nick"
                                label="Ник-нейм"
                                autoFocus
                                error={errorNick ? true : false}
                                helperText={errorNick}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={(e) => email.onChange(e)}
                                value={email.value}
                                variant="outlined"
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                error={errorEmail ? true : false}
                                helperText={errorEmail}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={(e) => password.onChange(e)}
                                value={password.value}
                                variant="outlined"
                                fullWidth
                                name="password"
                                label="Пароль"
                                type="password"
                                id="password"
                                error={errorPassword ? true : false}
                                helperText={errorPassword}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={(e) => repeatPassword.onChange(e)}
                                value={repeatPassword.value}
                                variant="outlined"
                                fullWidth
                                name="repeatPassword"
                                label="Повторите пароль"
                                type="password"
                                id="repeatPassword"
                                error={errorRepeatPassword ? true : false}
                                helperText={errorRepeatPassword}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Зарегистрироваться
                    </Button>
                    <Button
                        onClick={signUpGoogle}
                        fullWidth
                        variant="contained"
                        color="default"
                        className={classes.iconButton}
                    >
                        <FcGoogle className={classes.icon} />
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link className={classes.link} to="/login">
                                Войти
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}