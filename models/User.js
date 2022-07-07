const mongoose = require('mongoose');
const { stringify } = require('qs');

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

const User = mongoose.model('User', userSchema) // Schema는 모델로 감싸준다! User -> 모델, userSchema -> Schema

module.exports = {User} // 다른 파일에서도 사용할수 있게 export 한다.

//Schema는 간단하게 어떤 종류의 값이 들어가는지 정의!
//Model은 스키마를 통해서 만든 인스턴스!