//判断是通过还是不通过
export const _jude = (justify) =>{
    if(justify){
        return '通过'
    }else{
        return '不通过'
    }
}
//判断颜色
export const _judeBackColor =(isEqual) =>{
    if(isEqual){
        return 'white'
    }else{
        return '#FFE8D9'
    }
}