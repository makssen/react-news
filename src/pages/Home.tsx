import React, { FC, useEffect } from 'react'
import { DefaultLayout } from '../components/DefaultLayout';
import { Post } from '../components/Post';
import { PostLoader } from '../components/PostLoader';
import { useAction } from '../hooks/useAction';
import { useTypeSelector } from '../hooks/useTypeSelector';

export const Home: FC = () => {

    const { posts, postsLoaded } = useTypeSelector(state => state.user);
    const { getPostsAction } = useAction();

    useEffect(() => {
        document.title = 'React News';
        getPostsAction();
    }, []);

    return (
        <DefaultLayout>
            {postsLoaded ?
                posts && posts.map((item: any, i: any) => <Post key={i} {...item} />)
                :
                Array(2).fill(0).map((_, i) => <PostLoader key={i} />)
            }
        </DefaultLayout>
    );
}
