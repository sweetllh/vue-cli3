export const validateAccount = (rule, value, callback) => {
    var phoneReg = /(^1[3-578]\d{9}$)/;
    var value = value.replace(/\s/, "");
    if (value === '') {
       callback(new Error('请输入账号'));
    } else if(!phoneReg.test(value)){
        callback(new Error('输入的手机号码格式不正确!'));
    }else{
        callback();
    }
    
    
    
};
    
export const validatePwd = (rule, value, callback) => {
    //let pwdReg = /^(?![^a-zA-Z]+$)(?!\D+$)[0-9A-Za-z]{8,16}$/;
    let pwdReg =/^\d{6}$/;
    if (value === '') {
       callback(new Error('请输入密码'));
    } else if(!pwdReg.test(value)){
        //callback(new Error('密码为8-16位数字、字母组合!'));
        callback(new Error('密码为6位数字!'));
    }else{
        callback();
    }
    
};
    
export const  validateCode = (rule, value, callback) => {
    let codeReg = /^\d{6}$/;
    if (value === '') {
       callback(new Error('请输入验证码'));
    } else if(!codeReg.test(value)){
        callback(new Error('验证码6位数字!'));
    }else{
        callback();
    }
    
};