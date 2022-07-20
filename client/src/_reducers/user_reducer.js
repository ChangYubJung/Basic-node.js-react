import {
    LOGIN_USER
} from '../_actions/types';

export default function(state={}, action) {
    switch(action.type){
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload} // ...state는 state 상태를 그대로 가져온다.
            break;

        default:
            return state;
    }
}