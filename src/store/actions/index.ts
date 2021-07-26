import { Dispatch } from "react";
import { addPost, getPosts, initAuth } from "../../services/firebase";
import { setLoaded, UserActionsType, userAddPostAction, userLoginAction, userPostsAction } from "../../types";

export const setLoadedAction = (payload: boolean): setLoaded => ({
    type: UserActionsType.SET_LOADED,
    payload
});

export const initAuthAction = () => (dispatch: Dispatch<userLoginAction>) => {
    initAuth((user: any) => dispatch({ type: UserActionsType.LOGIN, payload: user }));
}

export const getPostsAction = () => (dispatch: Dispatch<userPostsAction | setLoaded>) => {
    dispatch(setLoadedAction(false));
    getPosts()
        .onSnapshot(posts => dispatch({
            type: UserActionsType.GET_POSTS,
            payload: posts.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        }))
}

export const addPostAction = (post: any) => (dispatch: Dispatch<userAddPostAction | setLoaded>) => {
    dispatch(setLoadedAction(false));
    addPost(post).then(post => dispatch({ type: UserActionsType.ADD_POST }))
}