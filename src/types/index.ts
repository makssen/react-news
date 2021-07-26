import { FC } from "react";

export interface IRoutes {
    label: string,
    path: string,
    exact?: boolean,
    icon: any,
    component: FC
}

export interface IPost {
    id: string,
    userName: string,
    header: string,
    text: string,
    image: string,
    time: any,
    userLikes: Array<string>
}

//userReducer

export interface UserState {
    user: any,
    isLoaded: boolean,
    posts: any,
    postsLoaded: boolean
}

export enum UserActionsType {
    LOGIN = 'LOGIN',
    GET_POSTS = 'GET_POSTS',
    SET_LOADED = 'SET_LOADED',
    ADD_POST = 'ADD_POST'
}

export interface userLoginAction {
    type: UserActionsType.LOGIN,
    payload: any
}

export interface userPostsAction {
    type: UserActionsType.GET_POSTS,
    payload: any
}

export interface userAddPostAction {
    type: UserActionsType.ADD_POST
}

export interface setLoaded {
    type: UserActionsType.SET_LOADED,
    payload: boolean
}

export type userAction = userLoginAction | userPostsAction | userAddPostAction | setLoaded;