const { users } = require('../../models/users')
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
    //console.log(req.cookies.refreshToken)
    if (!req.cookies.refreshToken) {
    res.json({ data: null, message: "refresh token not provided" })
    }

    const checked = jwt.verify(
    req.cookies.refreshToken,
    process.env.REFRESH_SECRET,
    (err, decoded) => {
        if (err) return null
        return decoded
    }
    )
    // console.log(checked);

    if (!checked) {
    return res.json({
        data: null,
        message: "invalid refresh token, please log in again",
    })
    } else {
    Users.findOne({ where: { email: checked.email } })
        .then((userInfo) => {
        if (!userInfo) {
            res.json({
            data: null,
            message: "refresh token has been tempered",
            })
        } else {
            const newAccessToken = jwt.sign(
            userInfo.dataValues,
            process.env.ACCESS_SECRET,
            {
                expiresIn: "5h",
            }
            )
            delete userInfo.dataValues.password

            res.json({
            data: {
                userInfo: userInfo.dataValues,
                accessToken: newAccessToken,
            },
            message: "ok",
            })
        }
        })
        .catch((err) => {
            console.log(err)
        })
    }
}