const express = require('express')
const app = express()
const port = 3000
const bodyparser = require('body-parser');
const { User } = require("./models/User");


app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://jwdo3015:wjdckdduq149!%40@boilerplate.unkzso9.mongodb.net/?retryWrites=true&w=majority'
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})