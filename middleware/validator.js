const isEmail = (email) => {
    let isTrue;
    const symbol = "#,!,%,?,&,$,(,),=,~,',"
    for (let i = 0; i < email.split("").length; i++) {
        if (symbol.split(",").includes(email.split("")[i])) {
            isTrue = true;
            break;
        }

        isTrue = false;
    }

    const atSign = email.indexOf('@')
    const dot = email.indexOf('.')

    if (atSign < 2) {
        return false
    } else if (dot < 2) {
        return false
    } else if (atSign - 1 === dot || atSign + 1 === dot || atSign + 2 === dot || atSign + 3 === dot) { //4  7
        return false
    } else if (isTrue) {
        return false
    } else {
        return true
    }

}

const registerValidator = (user) => {
    const error = {}

    if (!user.name) {
        error.name = "Please Enter Your Name"
    } else if (user.name.length < 3) {
        error.name = "Name Must be at least 3 character"
    }

    if (!user.email) {
        error.email = "Pleaser Enter Your Email"
    }else if(!isEmail(user.email)){
        error.email = "Invalid Email."
    } if (!user.password) {
        error.password = "Pleaser Enter Your Password"
    } if (user.password.length < 4) {
        error.password = "Password Must be at least 4 character"
    }


    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

const loginValidator = (user) => {
    const error = {}

    if (!user.email) {
        error.email = "Pleaser Enter Your Email"
    }else if(!isEmail(user.email)){
        error.email = "Invalid Email."
    } if (!user.password) {
        error.password = "Pleaser Enter Your Password"
    }


    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}





export {loginValidator}
export default registerValidator