export const signIn = (user) => {

    return {

        type: 'AUTH_SUCCESS', 
        payload: user
    }
} 

export const signOut = () => {
    return {
        type: 'SIGN_OUT'
    }
}