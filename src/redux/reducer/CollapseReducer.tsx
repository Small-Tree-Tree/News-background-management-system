/*
 * @Author: Small-Tree-Tree 913485079@qq.com
 * @Date: 2022-09-04 14:22:16
 * @LastEditors: Small-Tree-Tree 913485079@qq.com
 * @LastEditTime: 2022-09-04 14:58:22
 * @FilePath: \newssystem\src\redux\reducer\CollapseReducer.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const init = {isCollapse:false}
interface IAction {
    type:string,
    data:any
}
export default function CollapseReducer (preState=init,action:IAction){
    const {type} = action
    switch (type) {
        case 'changeCollapse':
            let newObj = {...preState}
            newObj.isCollapse = !preState.isCollapse
            return newObj
        default:
            return preState
    }
}