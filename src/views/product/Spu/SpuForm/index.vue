<template>
  <div>
    <el-form label-width="80px">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="SPU品牌">
        <el-select v-model="spu.tmId" placeholder="请选择品牌" >
          <el-option :label="tm.tmName" :value="tm.id" v-for="(tm) in tradeMarkList" :key="tm.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          rows="4"
          placeholder="SPU描述"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuImageList"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select v-model="attrIdAndAttrName" :placeholder="`还有${unSelectSaleAttr.length}项可选择`">
          <el-option :label="unSelect.name" :value="`${unSelect.id}:${unSelect.name}`" v-for="(unSelect) in unSelectSaleAttr" :key="unSelect.id"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" style="margin:0px 5px" :disabled="!attrIdAndAttrName" @click="addSaleAttr">添加销售属性</el-button>
        <el-table border style="width: 100%" :data="spu.spuSaleAttrList">
          <el-table-column type="index" label="序号" width="100px" align="center">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="100px" align="center">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width" align="center">
            <template slot-scope="{row}">
              <el-tag :key="tag.id" v-for="(tag,index) in row.spuSaleAttrValueList" closable :disable-transitions="false" align="left" @close="row.spuSaleAttrValueList.splice(index,1)">
                {{tag.saleAttrValueName}}
              </el-tag>
              <el-input class="input-new-tag" v-if="row.inputVisible" v-model="row.inputValue" ref="saveTagInput" 
              size="small" @keyup.enter.native="handleInputConfirm(row)" @blur="handleInputConfirm(row)">
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row)">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="100px" align="center">
            <template slot-scope="{row,$index}">
              <el-popconfirm :title="`确认删除${row.saleAttrName}?`" @onConfirm="spu.spuSaleAttrList.splice($index,1)">
                <hint-button type="danger" icon="el-icon-delete" size="mini" slot="reference" title="删除spu" info="删除"></hint-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      spu:{
        "spuName": "",
        "category3Id": 0,
        "description": "",
        "tmId": "",
        "spuImageList": [
          // {
          //   "id": 0,
          //   "imgName": "",
          //   "imgUrl": "",
          //   "spuId": 0
          // }
        ],
        spuSaleAttrList: [
          // {
          //   "baseSaleAttrId": 0,
          //   "id": 0,
          //   "saleAttrName": "",
          //   "spuId": 0,
          //   spuSaleAttrValueList: [
          //     {
          //       "baseSaleAttrId": 0,
          //       "id": 0,
          //       "isChecked": "",
          //       "saleAttrName": "",
          //       "saleAttrValueName": "",
          //       "spuId": 0
          //     }
          //   ]
          // }
        ],
      },
      tradeMarkList:[],
      spuImageList:[],
      saleAttrList:[],
      attrIdAndAttrName:'',
      inputVisible: false,
      inputValue: ''
    };
  },
  methods: {
    handleRemove(file, fileList) {
      this.spuImageList = fileList
    },

    handleSuccess(response, file, fileList){
      this.spuImageList = fileList
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    async initSpuData(spu){
      let spuResult = await this.$API.spu.reqSpu(spu.id)
      if(spuResult.code == 200){
        this.spu = spuResult.data
      }

      let tradeMarkResult = await this.$API.spu.reqTradeMarkList()
      if(tradeMarkResult.code == 200){
        this.tradeMarkList = tradeMarkResult.data
      }

      let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id)
      if(spuImageResult.code == 200){
        let listArr = spuImageResult.data
        listArr.forEach(item => {
          item.name = item.imgName,
          item.url = item.imgUrl
        })
        this.spuImageList = listArr
      }

      let saleResult = await this.$API.spu.reqBaseSaleAttrList()
      if(saleResult.code == 200){
        this.saleAttrList = saleResult.data
      }
    },

    async addSpuData(category3Id){
      this.spu.category3Id = category3Id

      let tradeMarkResult = await this.$API.spu.reqTradeMarkList()
      if(tradeMarkResult.code == 200){
        this.tradeMarkList = tradeMarkResult.data
      }

      let saleResult = await this.$API.spu.reqBaseSaleAttrList()
      if(saleResult.code == 200){
        this.saleAttrList = saleResult.data
      }
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm(row) {
      const {baseSaleAttrId,inputValue} = row
      if(inputValue.trim()==''){
        this.$message('属性值不能为空')
        // this.$refs.saveTagInput.focus()
        row.inputVisible = false;
        return
      }
      if(!row.spuSaleAttrValueList.every(item=>item.saleAttrValueName!=inputValue)){
        console.log(111);
        this.$message('属性值不能重复')
        this.$refs.saveTagInput.focus()
        return
      }

      let newSaleAttrValue = {baseSaleAttrId,saleAttrValueName:inputValue}
      row.spuSaleAttrValueList.push(newSaleAttrValue)
      row.inputVisible = false;
    },

    addSaleAttr(){
      const [baseSaleAttrId,saleAttrName]  = this.attrIdAndAttrName.split(':')
      let newSaleAttr = {baseSaleAttrId,saleAttrName,spuSaleAttrValueList:[]}
      this.spu.spuSaleAttrList.push(newSaleAttr)
      this.attrIdAndAttrName = this.unSelectSaleAttr.length<1 ? "没有啦~~~" : ""
    },

    addSaleAttrValue(row){
      this.$set(row,"inputVisible",true)
      this.$set(row,"inputValue","")
    },

    async addOrUpdateSpu(){
      this.spu.spuImageList = this.spuImageList.map(item=>{
        return {
          imgName:item.name,
          imgUrl:(item.response && item.response.data) || item.url
        }
      })
      let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu)
      if(result.code == 200){
        this.$message({type:'success',message:"保存成功"})
        this.$emit('changeScene',{scene:0,type:this.spu.id?'修改':'添加'})
      }
      Object.assign(this._data,this.$options.data())
    },

    cancel(){
      this.$emit('changeScene',{scene:0,type:'修改'})
      Object.assign(this._data,this.$options.data())
    }
  },
  computed: {
    unSelectSaleAttr(){
      return this.saleAttrList.filter((item)=>{
        return this.spu.spuSaleAttrList.every(item1=>{
          return item.name != item1.saleAttrName
        })
      })
    }
  }
};
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
