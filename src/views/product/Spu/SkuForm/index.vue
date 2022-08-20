<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称" >{{spu.spuName}}</el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" type="number" v-model="skuInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input type="textarea" rows="4" placeholder="规格描述" v-model="skuInfo.Desc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" label-width="80px">
          <el-form-item :label="attr.attrName" v-for="(attr) in attrInfoList" :key="attr.id" >
            <el-select placeholder="请选择" v-model="attr.attrIdAndValueId" style="margin:0 0 5px 0px">
              <el-option :label="attrValue.valueName" v-for="(attrValue) in attr.attrValueList" :key="attrValue.id" :value="`${attr.id}:${attrValue.id}`"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" label-width="80px">
          <el-form-item :label="saleAttr.saleAttrName" v-for="(saleAttr) in spuSaleAttrList" :key="saleAttr.id">
            <el-select placeholder="请选择" v-model="saleAttr.attrIdAndValueId" style="margin:0 0 5px 0px"> 
              <el-option :label="saleAttrValue.saleAttrValueName" v-for="(saleAttrValue) in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id" :value="`${saleAttr.id}:${saleAttrValue.id}`"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table  style="width: 100%" border :data="spuImageList" @selection-change="handleSelectionChange">
          <el-table-column prop="prop" width="80px" type="selection" align="center">
          </el-table-column>
          <el-table-column prop="prop" label="图片" width="width" align="center">
            <template slot-scope="{row}">
              <img :src="row.imgUrl" alt="" style="width:100px;height:100px">
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width" align="center">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150px" align="center">
            <template slot-scope="{row}">
              <el-button type="primary" v-if="row.isDefault" @click="changeDefault(row)">设为默认</el-button>
              <el-tag type="success" v-else>默认</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SkuForm",
  data () {
    return {
      spuImageList:[],
      spuSaleAttrList:[],
      attrInfoList:[],
      skuInfo:{
        "category3Id": 0,
        "spuId": 0,
        "tmId": 0,
        "price": "",
        "skuName": "",
        "weight": "",
        "skuDefaultImg": "",
        "skuDesc": "",
        "skuAttrValueList": [
          // {
          //   "attrId": 0,
          //   "attrName": "string",
          //   "id": 0,
          //   "skuId": 0,
          //   "valueId": 0,
          //   "valueName": "string"
          // }
        ],
        "skuImageList": [
          // {
          //   "id": 0,
          //   "imgName": "string",
          //   "imgUrl": "string",
          //   "isDefault": "string",
          //   "skuId": 0,
          //   "spuImgId": 0
          // }
        ],
        "skuSaleAttrValueList": [
          // {
          //   "id": 0,
          //   "saleAttrId": 0,
          //   "saleAttrName": "string",
          //   "saleAttrValueId": 0,
          //   "saleAttrValueName": "string",
          //   "skuId": 0,
          //   "spuId": 0
          // }
        ]
      },
      spu:{},
      imgList:[]
      
    }
  },
  methods: {
    async getData(category1Id,category2Id,spu){
      this.skuInfo.category3Id = spu.category3Id
      this.skuInfo.spuId = spu.id
      this.skuInfo.tmId = spu.tmId
      this.spu = spu

      let spuImageResult = await this.$API.sku.reqSpuImageList(spu.id)
      if(spuImageResult.code == 200){
        let listArr = spuImageResult.data
        listArr.forEach(item => {
          item.isDefault = true
        })
        this.spuImageList = listArr
      }
      let spuSaleAttrListResult = await this.$API.sku.reqSpuSaleAttrList(spu.id)
      if(spuImageResult.code == 200){
        this.spuSaleAttrList = spuSaleAttrListResult.data
      }
      
      let result = await this.$API.sku.reqAttrInfoList(
        category1Id,
        category2Id,
       spu.category3Id
      );
      if (result.code == 200) {
        this.attrInfoList = result.data;
      }
    },

    cancel(){
      this.$emit('changeScene',{scene:0,type:'修改'})
      Object.assign(this._data,this.$options.data())
    },

    handleSelectionChange(params){
      this.imgList = params
    },

    changeDefault(row){
      this.spuImageList.forEach(item=>{
        item.isDefault = true
      })
      row.isDefault = false
      this.skuInfo.skuDefaultImg = row.imgUrl
    },

    async save(){
      const {attrInfoList,skuInfo,spuSaleAttrList,imageList} = this

      skuInfo.skuAttrValueList = attrInfoList.reduce((prev,item)=>{
        if (item.attrIdAndValueId) {
          const [attrId,valueId] = item.attrIdAndValueId.split(":")
          prev.push({attrId,valueId})
        }
        return prev
      },[])

      skuInfo.spuSaleAttrValueList = spuSaleAttrList.reduce((prev,item)=>{
        if (item.attrIdAndValueId) {
          const [saleAttrId,saleAttrValueId] = item.attrIdAndValueId.split(":")
          prev.push({saleAttrId,saleAttrValueId})
        }
        return prev
      },[])

      skuInfo.skuImageList = imageList.map(item=>{
        return {
          imgName:item.imgName,
          imgUrl:item.imgUrl,
          isDefault:item.isDefault,
          spuImgId:item.id
        }
      })

      let result = await this.$API.spu.reqAddSku(skuInfo)
      if(result.code == 200){
        this.$message({type:"success",message:"添加成功"})
        this.$emit("changeScene",0)
      }
    }
  }
}
</script>

<style></style>
