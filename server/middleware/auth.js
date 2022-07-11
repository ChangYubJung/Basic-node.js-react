const { User } = require("../models/User");

let auth = (req, res, next) => {
    //인증처리 하는곳

    //Client 쿠키에서 토큰 get
    let token = req.cookies.x_auth;

    //token 복호화 한후 유저를 찾음
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true })

        req.token = token;
        req.user = user;
        next();
    })
    //유저 있으면 인증 okey

    //없으면 인증 no
}

module.exports = { auth };