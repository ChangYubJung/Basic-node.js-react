if(process.env.NODE_ENV == 'production') {
    //env 값이 production 즉 depoly(배포) 되었으면  prod에서 값가져오고
    module.exports = require('./prod');
} else {
    //depoly전이면 로컬에있는 ./dev에서 가져온다. 이때 NODE_ENV 값은 'development'
    module.exports = require('./dev');
}