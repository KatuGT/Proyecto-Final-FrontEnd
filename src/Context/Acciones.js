export const LoginStart = (userCredentials) =>({
    type: "LOGIN_START"
})

export const LoginSucces = (user) =>({
    type:"LOGIN_SUCCESS",
    payload: user,
})

export const Loginfail =()=>({
    type:"LOGIN_FAIL"
})

export const Logout =()=>({
    type:"LOGOUT"
})