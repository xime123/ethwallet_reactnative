export default class TextUtil{
    static isEmpty(text){
        if(text !== null && text !== undefined && text !== ''){
            return false;
        }else{
            return true;
        }
    }
}