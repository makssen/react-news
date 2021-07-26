import { userAction, UserActionsType, UserState } from "../../types";

const initialState: UserState = {
    user: null,
    isLoaded: false,
    posts: null,
    postsLoaded: false
}

export const userReducer = (state = initialState, action: userAction): UserState => {
    switch (action.type) {
        case UserActionsType.LOGIN:
            return {
                ...state,
                user: action.payload,
                isLoaded: true
            }
        case UserActionsType.GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                postsLoaded: true
            }
        case UserActionsType.SET_LOADED:
            return {
                ...state,
                postsLoaded: action.payload
            }
        case UserActionsType.ADD_POST:
            return {
                ...state,
                postsLoaded: true
            }
        default:
            return state;
    }
}