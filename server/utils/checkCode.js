function checkCode(input, real){

    if(input.input === real[0].code){
        return true;
    }
    else{
        return false;
    }
}

export default checkCode