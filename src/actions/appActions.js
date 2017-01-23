export const signIn = (user) => {

    return {

        type: 'AUTH_SUCCESS', 
        payload: user
    }
}