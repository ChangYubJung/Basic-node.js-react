const express = require('express')
const app = express()
const port = 3000
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const { User } = require("./models/User");
const config = require("./config/key");

app.use(bodyparser.urlencoded({extended: true}));

app.use(bodyparser.json());
app.use(cookieParser());

const mongoose = require('mongoose')

mongoose.connect(config.mongoURI
).then(() => console.log("MongoDB Connected....")).catch(err=>console.log(err))

app.get('/', (req, res)=>res.send("Hellow World"))

app.post('/register', (req, res) => {
  //회원가입할때 필요한 정보들을 client에서 가져와서 데이터베이스에 넣어준다.
  const user = new User(req.body) // req의 body 안에는 json 형태로 data가 들어있다. -> body-parser가 있어서 가능함.

  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  }) //몽고디비 메소드, 유저모델에 정보 저장.
})


app.post('/login', (req, res)=>{
  //요청된 이메일을 db에서 찾는다.
  User.findOne({ email: req.body.email }, (err, user)=>{
    if(!user){
      return res.json({ loginSuccess: false,
            message: "제공된 이메일에 해당되는 유저가 없습니다."})
    }
    //요청된 이메일이 있으면 비밀번호가 매칭되는지.
    user.comparePassword(req.body.password, (err, isMatch) =>{
      if(!isMatch)
        return res.json({loginSuccess: false, message: "비밀번호가 틀림."})
  //비밀번호까지 매칭된다면 Token 생성.
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);

        res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id})
        })
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})