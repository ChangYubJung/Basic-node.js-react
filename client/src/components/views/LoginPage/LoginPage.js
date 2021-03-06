import { Axios } from 'axios'
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {loginUser} from '../../../_actions/user_action'
function LoginPage(props) {
    const dispatch = useDispatch();
            //props, state
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) => {
        //event 발생시 새로고침되는 것을 방지하기 위해서.
        event.preventDefault();
        console.log('Email', Email);
        console.log('Password', Password);
        //server로 state값을 보내기
        let body = {
            email: Email,
            password: Password
        }
        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess){
                    props.history.push('/')
                } else {
                    alert('Error')
                }
            })
    }
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
        }} onSubmit={onSubmitHandler}>
            <form style = {{display: 'flex', flexDirection: 'column'}}>
                <label>Email</label>
                <input type="email" value = {Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type="password" value = {Password} onChange={onPasswordHandler}/>
                <br />

                <button type = 'submit'>
                    login
                </button>
            </form>
        </div>
    )

}

export default LoginPage
