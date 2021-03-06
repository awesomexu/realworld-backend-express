const { jwtVerify } = require("../utils/util")
const { User } = require('../model')

module.exports = (option = {required: true}) => {
    return async (request, response, next) => {
        try {
            const token = request.headers.authorization?.substr(6)

            // 请求header中有token就验证
            if(token){
                const result = jwtVerify(token)
                const user = await User.findById(result.id)
                if(user){
                    request.user = user
                }
                else{
                    return response.status(401).end()
                }
            
            // 请求header无token但需要验证，抛异常退出
            }else if(!token && option.required){
                return response.status(401).end()
            }

            next()
        } catch (err) {
            next(err)
        }

    }
}
