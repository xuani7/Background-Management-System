<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable"></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
          style="margin:0px 0px 10px 0px"
          >添加属性</el-button
        >
        <el-table :data="attrList" style="width: 100%" border >
          <el-table-column
            type="index"
            label="序号"
            width="100px"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="attrName"
            label="属性名称"
            width="150px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row }">
              <el-tag
                type="success"
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
                style="margin: 0px 5px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="prop"
            label="操作"
            width="200px"
            align="center"
          >
            <template slot-scope="{row,$index}">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
                style="margin:0px 8px"
                >修改</el-button
              >
              <el-popconfirm :title="`确认删除${row.attrName}?`" @onConfirm="deleteAttr(row,$index)">
                <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" :model="attrInfo" label-width="80px">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttrValue"
          :disabled="!attrInfo.attrName"
          >添加属性值</el-button
        >
        <el-table
          :data="attrInfo.attrValueList"
          style="width: 100%; margin: 20px 0px"
          border
        >
          <el-table-column type="index" label="序号" width="100">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{row,$index}">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                v-if="row.flag"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
                :ref="$index"
              ></el-input>
              <span v-else style="display:block">{{row.valueName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="450px" align="center">
            <template slot-scope="{row,$index}">
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateAttrValue(row,$index)" style="margin:0px 8px">修改</el-button>
              <el-popconfirm :title="`确认删除${row.valueName}?`" @onConfirm="deleteAttrValue(row,$index)">
                <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addOrUpdateAttr" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 按需引入lodash当中的深拷贝
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      attrList: [],
      isShowTable: true,
      attrInfo: {
        attrName: "",
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3,
      },
    };
  },
  methods: {
    getCategoryId({ categoryId, level }) {
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        this.getAttrList();
      }
    },
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },

    addAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: "",
        flag:true
      });
      this.$nextTick(()=>{
        this.$refs[this.attrInfo.attrValueList.length-1].focus()
      })
    },
    updateAttrValue(row,index){
      row.flag = true
      this.$nextTick(()=>{
        this.$refs[index].focus()
      })
    },
    deleteAttrValue(row,index){
      this.attrInfo.attrValueList.splice(index,1)
    },

    addAttr() {
      this.isShowTable = false;
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 3,
      };
    },
    updateAttr(row){
      this.isShowTable = false
      // 由于数据结构当中存在对象里面套数组，数组里面又套对象，因此需要使用深拷贝解决这类问题
      this.attrInfo = cloneDeep(row)
      this.attrInfo.attrValueList.forEach(item => {
        this.$set(item,'flag',false)
      });
    },
    async deleteAttr(row,index){
      let result = await this.$API.attr.reqDeleteAttr(row.id)
      if(result.code == 200){
        this.$message({message:"删除成功！",type:"success"})
        this.getAttrList()
      }
    },

    async addOrUpdateAttr(){
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter((item)=>{
        if (item.valueName != '') {
          delete item.flag
          return true
        }
      })
      try {
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
        this.isShowTable = true
        this.$message({message:"保存成功！",type:"success"})
        this.getAttrList()
      } catch (error) {
        console.log(error);
      }

    },

    toLook(row){
      if(row.valueName.trim() == ''){
        this.$message.error("属性值不能为空！")
        return
      }
      let isRepat = this.attrInfo.attrValueList.some(item=>{
        if (row != item) {
          return row.valueName == item.valueName
        }
      })
      if (isRepat) {
        this.$message.error("属性值不能重复！")
        return
      }
      row.flag = false
    }
  },
};
</script>

<style></style>
