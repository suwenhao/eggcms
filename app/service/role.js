'use strict';

const Service = require('egg').Service;

class RoleService extends Service {
    async getRoleList() {
        let res = await this.ctx.model.Role.find({});
        return res;
    }
    async getRole(id) {
        try {
            let res = await this.ctx.model.Role.findOne({'_id':id});
            return res;
        } catch (error) {
            return null
        }
    }
    async add(title,description) {
        let res = await this.ctx.model.Role.create({
            title,description
        })
        return res;
    }
    async edit(_id,title,description,status){
        let res = await this.ctx.model.Role.updateOne({_id},{title,description,status})
        return res;
    }
    async getRoleAccessList(id){
        try {
            let res = await this.ctx.model.RoleAccess.find({'role_id':id})
            return res;
        } catch (error) {
            return null
        }
    }
}

module.exports = RoleService;
