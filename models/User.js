const mongoose = require('mongoose');
const { stringify } = require('qs');
const bcrypt = require('bcrypt');

const saltRounds = 10 // salt 자리값 지정.

const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({

    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, //' ' 스페이스를 없애주는 역활!
        unique: 1 // 중복없이! 똑같은 email은 못쓰게!
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: { // 관리자, 일반회원 정하기 위해서 role을 지정. es 1 -> 관리자 
        type: Number,
        default: 0 // 롤 지정 안 하면 default 로 0을 줌
    },
    image: String,
    token: { // 유효성을 관리
        type: String
    },
    tokenExp: { // 토큰 유효기간 정해줄수 있음.
        type: Number
    }

})

userSchema.pre('save', function (next) {
    var user = this; // -> 위에 생성된 schema를 가리킴!
    // pasword 항목의 변화가 있을때만 비밀번호를 다시 암호화!
    //이 부분이 없으면 name, email등 변화가 있을때마다 암호화.
    if (user.isModified('password')) //isModified -> MongoDB에 포함된 메서드
    //password 변화가 있으면 true, 없으면 flse
    {
        //db에 저장하기 전 비밀번호 암호화
        // salt생성 -> salt 만들때 saltRounds가 필요함
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function (err, hash) { // 첫번째 인자 = 사용자가 지정한 암호화 안됨 오리지널 비밀번호를 지칭.
                if (err) return next(err)
                user.password = hash // hash된 즉 암호화된  password로 값 변경.
                next()
            })
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function (plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        console.log("heelo2");
        if (err) return cb(err);
        cb(null, isMatch)
    })
    console.log("heelo3");
}

userSchema.methods.generateToken = function (cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secretToken') // _id는 데이터베이스에 있음.

    user.token = token
    user.save(function (err, user) {
        if (err) return cb(err);
        cb(null, user)
    })
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    //token 을 디코딩 한다.
    jwt.verify(token, 'secretToken', function (err, decoded) {
        //유저 아이디를 이용해서 유저를 찾은 다음에
        //클라이언트에서 가져온 토큰과 db에 보관된 토큰이 일치하는지 확인.

        user.findOne({ "_id": decoded, "token": token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema) // Schema는 모델로 감싸준다! User -> 모델, userSchema -> Schema

module.exports = { User } // 다른 파일에서도 사용할수 있게 export 한다.

//Schema는 간단하게 어떤 종류의 값이 들어가는지 정의!
//Model은 스키마를 통해서 만든 인스턴스!