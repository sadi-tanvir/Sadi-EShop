import jwt from "jsonwebtoken"

const generateToken = (email, role) => {
    return jwt.sign({ email, role }, process.env.SECRET_KEY, { expiresIn: '7d' })
}

export default generateToken