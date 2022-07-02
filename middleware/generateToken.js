import jwt from "jsonwebtoken"

const generateToken = (email) => {
    return jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '7d' })
}

export default generateToken