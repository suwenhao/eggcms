'use strict';

const Service = require('egg').Service;
const util = require('../core/util.js')

class AccessService extends Service {
  //增加权限
  async add(newAccess) {
    let res = await this.ctx.model.Access.create(newAccess);
    if(res){
        return {code:0,msg:'增加权限成功'}
    }else{
        return {code:1,msg:'增加权限失败'}
    }
  }
  //修改权限
  async edit(newAccess) {
    let res = await this.ctx.model.Access.updateOne({'_id':newAccess.id},newAccess);
    if(res){
        return {code:0,msg:'修改权限成功'}
    }else{
        return {code:1,msg:'修改权限失败'}
    }
  }
  //获取权限一、二级权限列表
  async getAccessModules(){
    try {
        let res = await this.ctx.model.Access.aggregate([
            {$match:{'module_id':'0'}},
            {$project:{icon:0,}},
            {
                $lookup:{
                    from:'access',
                    localField:'_id',
                    foreignField:'module_id',
                    as:'children'
                }
            }
        ]);
        res.sort(util.compare);
        res=res.map(v=>{
            return {
                ...v,
                children:v.children.sort(util.compare)
            }
        })
        return res
    } catch (error) {
        return null
    }
  }
  //获取单个权限
  async getAccess(id){
    try {
        let res = await this.ctx.model.Access.findOne({'_id':id});
        return res
    } catch (error) {
        return null
    }
  }
  //获取三级权限列表
  async getAccessList(){
    let res = await this.ctx.model.Access.aggregate([
        {
            $match:{module_id:'0'}
        },
        {
            $lookup:{
                from:'access',
                localField:'_id',
                foreignField:'module_id',
                as:'children'
            }
        }
    ])
    for(let i=0;i<res.length;i++){
        // res[i].children=[]
        for(let j=0;j<res[i].children.length;j++){
            let result = await this.ctx.model.Access.aggregate([
                {
                    $match:{module_id:res[i].children[j]._id}
                }
            ])
            // res[i].items[j].items=[]
            res[i].children[j].children=[]
            if(result.length>0){
                // res[i].items[j].items=result;
                res[i].children[j].children=result;
            }
        }
        // res[i].children=res[i].items;
    }
    res.sort(util.compare);
    res=res.map(v=>{
        return {
            ...v,
            children:v.children.sort(util.compare)
        }
    })
    res=res.map(v=>{
        return {
            ...v,
            children:v.children.map(k=>{
                return {
                    ...k,
                    children:k.children.sort(util.compare)
                }
            })
        }
    })
    return res;
  }
}

module.exports = AccessService;
