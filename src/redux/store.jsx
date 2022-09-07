/*
 * @Author: Small-Tree-Tree 913485079@qq.com
 * @Date: 2022-09-04 14:18:37
 * @LastEditors: Small-Tree-Tree 913485079@qq.com
 * @LastEditTime: 2022-09-04 14:56:29
 * @FilePath: \newssystem\src\redux\store.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {legacy_createStore,combineReducers,compose} from "redux"
// 导入reducer
import CollapseReducer from "./reducer/CollapseReducer"
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// 创建并且暴露store
const reducer = combineReducers({CollapseReducer})
export default legacy_createStore(reducer,composeEnhancers())