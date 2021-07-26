import { Box, Button, Card, CardMedia, Grid, TextField, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { DefaultLayout } from '../components/DefaultLayout';
import { UploadFile } from '../components/UploadFile';
import { useAction } from '../hooks/useAction';
import { useFileReader } from '../hooks/useFileReader';
import { useInput } from '../hooks/useInput';
import { useTypeSelector } from '../hooks/useTypeSelector';
import { globalStyles } from '../styles/Global.style';

export const CreatePost: FC = () => {

    const classes = globalStyles();

    const history = useHistory();

    const header = useInput('');
    const text = useInput('');
    const [errorHeader, setErrorHeader] = useState<string>('');
    const [errorText, setErrorText] = useState<string>('');
    const [errorFile, setErrorFile] = useState<boolean>(false);
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    const { file, preview, setFile } = useFileReader();

    const { addPostAction } = useAction();

    const { user } = useTypeSelector(state => state.user);

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!header.value) {
            setErrorHeader('Введите заголовок');
        } else if (header.value.length < 3) {
            setErrorHeader('Заголовок должен состоять минимум из 3 символов');
        } else {
            setErrorHeader('');
        }

        if (!text.value) {
            setErrorText('Введите текст');
        } else if (text.value.length < 20) {
            setErrorText('Текст должен состоять минимум из 20 символов');
        } else {
            setErrorText('');
        }

        if (!file) {
            setErrorFile(true);
        } else {
            setErrorFile(false);
        }

        setIsSubmit(true);
    }

    useEffect(() => {
        if (isSubmit) {
            if (errorText || errorHeader || errorFile) {
                setIsSubmit(false);
            } else {
                addPostAction({
                    header: header.value,
                    text: text.value,
                    image: file,
                    userName: user.displayName,
                    userLikes: []
                })
                history.push('/')
            }
        }
    }, [errorText, errorHeader, errorFile, file, isSubmit]);

    useEffect(() => {
        document.title = 'React News - Создание поста';
    }, []);

    return (
        <DefaultLayout>
            <Grid container direction="column">
                <Box mb={2}>
                    <Typography variant="h6" color="textSecondary">
                        Создать пост
                    </Typography>
                </Box>
                <Grid item>
                    <form onSubmit={handleSubmit}>
                        <Grid item container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    onChange={(e) => header.onChange(e)}
                                    value={header.value}
                                    className={classes.input}
                                    variant="outlined"
                                    label="Заголовок поста"
                                    fullWidth
                                    error={errorHeader ? true : false}
                                    helperText={errorHeader}
                                />
                                <TextField
                                    onChange={(e) => text.onChange(e)}
                                    value={text.value}
                                    className={classes.input}
                                    variant="outlined"
                                    multiline rows={6}
                                    label="Текст поста"
                                    fullWidth
                                    error={errorText ? true : false}
                                    helperText={errorText}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box mb={3}>
                                    <Card>
                                        {
                                            preview ?
                                                <CardMedia
                                                    component="img"
                                                    alt="Contemplative Reptile"
                                                    height="225"
                                                    image={preview}
                                                    title="Contemplative Reptile"
                                                />
                                                :
                                                <Skeleton variant="rect" width={"100%"} height={225} />
                                        }
                                    </Card>
                                </Box>
                            </Grid>
                        </Grid>
                        <Box mr={2} mb={3}>
                            <UploadFile setFile={setFile} accept="image/*">
                                <Button variant="contained" color={errorFile ? 'secondary' : 'default'}>Добавить изображение</Button>
                            </UploadFile>
                        </Box>
                        <Button type="submit" variant="contained" color="primary">Публикация</Button>
                    </form>
                </Grid>
            </Grid>
        </DefaultLayout >
    )
}
