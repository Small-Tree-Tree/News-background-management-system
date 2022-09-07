/*
 * @Author: Small-Tree-Tree 913485079@qq.com
 * @Date: 2022-08-24 21:05:37
 * @LastEditors: Small-Tree-Tree 913485079@qq.com
 * @LastEditTime: 2022-09-02 10:22:49
 * @FilePath: \newssystem\src\Type\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 限制菜单栏的类型
export interface IMenu {
    id:string,
    title:string,
    key:string,
    grade:number,
    pagepermisson?:number,
    children:any,
    [propsName:string]:any
  }

// 限制角色类型
export interface Irights {
  id:number,
  roleName:string,
  roleType:string,
  rights:[]
}


// 限制用户类型
export interface IUsers {
  id:number,
  username:string,
  password:number,
  roleState:boolean,
  default:number,
  region:undefined|string,
  roleId:number,
  role:Irights
}

// 限制区域类型
export interface IRegions {
  id:number,
  title:string,
  value:string
}

// 表单验证
export interface Values {
  title: string;
  description: string;
  modifier: string;
}

export interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

// 限制分类的类型
export interface Icategory {
  id:number,
  title:string,
  value:string
}

// 定义token返回的信息
export interface IUserInfo {
  username:string,
  password:string,
  region:null | string,
  roleId:number,
  roleState:boolean,
  default:boolean,
  role:{
    id:number,
    roleName:string,
    roleType:1,
    rights:{
      checked:[]
    }
  }
}


// 定义新闻信息
export interface INewsInfo{
  auditState:number,
  author:string,
  category:{
    id:number,
    title:string,
    value:string
  },
  categoryId:number,
  content:string,
  createTime:number,
  id:number,
  publishState:number,
  region:string,
  roleId:number,
  star:number,
  title:string,
  view:number
}