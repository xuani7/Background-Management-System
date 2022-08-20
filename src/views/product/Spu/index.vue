<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId" :show="scene!=0"></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="scene==0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          style="margin:0px 0px 10px 0px"
          @click="addSpu"
          >添加SPU</el-button
        >
        <el-table :data="records" style="width: 100%" border >
          <el-table-column
            type="index"
            label="序号"
            width="100px"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="spuName"
            label="SPU名称"
            width="150px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width">
          </el-table-column>
          <el-table-column
            prop="prop"
            label="操作"
            width="400px"
            align="center"
          >
            <template slot-scope="{row}">
              <hint-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
                info="添加"
                @click="addSku(row)"
                ></hint-button
              >
              <hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                info="修改"
                @click="updateSpu(row)"
                ></hint-button
              >
              <hint-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu全部sku列表"
                info="查看"
                @click="handle(row)"
                ></hint-button
              >
              <el-popconfirm :title="`确认删除${row.spuName}?`" @onConfirm="deleteSpu(row)">
                <hint-button type="danger" icon="el-icon-delete" size="mini" slot="reference" title="删除spu" info="删除">删除</hint-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination 
        style="margin-top:20px;text-align:center"
        @size-change="handleSizeChange"
        @current-change="getSpuList"
        :current-page="page"
        :page-sizes="[3, 5, 10]"
        :page-size="limit"
        :total="total"
        layout="prev, pager, next, jumper, ->, sizes, total">
        </el-pagination>
      </div>
      <SpuForm v-show="scene==1" @changeScene="changeScene" ref="spuForm"></SpuForm>
      <SkuForm v-show="scene==2" ref="skuForm" @changeScene="changeScene"></SkuForm>
    </el-card>

    <el-dialog :title="`${spu.spuName}的SKU列表`" :visible.sync="dialogTableVisible" :before-close="close">
      <el-table :data="skuList"  v-loading="loading">
        <el-table-column property="skuName" label="名称" width="width" align="center"></el-table-column>
        <el-table-column property="price" label="价格" width="150" align="center"></el-table-column>
        <el-table-column property="weight" label="重量" width="150" align="center"></el-table-column>
        <el-table-column  label="默认图片" align="center" width="150">
          <template slot-scope="{row}">
            <img :src="row.skuDefaultImg" alt="" style="width:100px;height: 100px;">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SpuForm from './SpuForm'
import SkuForm from './SkuForm'
export default {
  name:'Spu',
  data () {
    return {
      page:1,
      limit:3,
      total:0,
      category1Id: "",
      category2Id: "",
      category3Id: "",
      records: [],
      isShowTable: true,
      scene:0,
      dialogTableVisible:false,
      spu:{},
      skuList:[],
      loading:true
    }
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
        this.getSpuList();
      }
    },

    async getSpuList(pages = 1) {
      this.page = pages
      const { page, limit, category3Id } = this;
      let result = await this.$API.spu.reqSpuList(
        page, limit, category3Id
      );
      if (result.code == 200) {
        this.total = result.data.total
        this.records = result.data.records;
      }
    },

    handleSizeChange(limit){
      this.limit = limit
      this.getSpuList()
    },

    addOrUpdateSpu(){

    },

    addSpu(){
      this.scene = 1
      this.$refs.spuForm.addSpuData(this.category3Id)
    },
    addSku(row){
      this.scene = 2
      this.$refs.skuForm.getData(this.category1Id,this.category2Id,row)
    },

    updateSpu(row){
      this.isShowTable = false
      this.scene = 1
      this.$refs.spuForm.initSpuData(row)
    },

    changeScene({scene,type}){
      this.scene = scene
      if(type === '修改'){
        this.getSpuList(this.page)
      }else{
        this.getSpuList()
      }
    },

    async deleteSpu(row){
      let result = await this.$API.spu.reqDeleteSpu(row.id)
      if(result.code == 200){
        this.$message({type:'success',message:"删除成功"})
        this.getSpuList(this.records.length>1 ? this.page : this.page-1)
      }
    },

    async handle(spu){
      this.dialogTableVisible = true
      this.spu = spu
      let result = await this.$API.sku.reqSkuList(spu.id)
      if (result.code == 200) {
        this.loading = false
        this.skuList = result.data
      }
    },

    close(done){
      this.loading = true
      this.skuList = []
      done()
    }
  },
  components: {
    SkuForm,
    SpuForm
  }
}
</script>

<style>

</style>