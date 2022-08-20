<template>
  <div>
    <el-table style="width: 100%" border :data="skuList">
      <el-table-column type="index" label="序号" width="100px" align="center">
      </el-table-column>
      <el-table-column prop="skuName" label="名称" width="width" align="center">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width" align="center">
      </el-table-column>
      <el-table-column label="默认图片" width="width" align="center">
        <template slot-scope="{row}">
          <img :src="row.skuDefaultImg" alt="" style="width:100px;height:100px">
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(千克)" width="100" align="center">
      </el-table-column>
      <el-table-column prop="price" label="价格(元)" width="100" align="center">
      </el-table-column>
      <el-table-column label="操作" width="270px" align="center">
        <template slot-scope="{row}">
              <hint-button
                type="success"
                icon="el-icon-download"
                size="mini"
                title="下架sku"
                @click="cancelSale(row)"
                v-if="row.isSale == 0"
                style="margin:5px"
                ></hint-button
              >
              <hint-button
                icon="el-icon-upload2"
                size="mini"
                title="上架sku"
                @click="onSale(row)"
                v-else
                style="margin:5px"
                ></hint-button
              >
              <hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                style="margin:5px"
                @click="edit"
                ></hint-button
              >
              <hint-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看详情"
                style="margin:5px"
                @click="getSkuInfo(row)"
                ></hint-button
              >
              <el-popconfirm :title="`确认删除${row.skuName}?`" @onConfirm="deleteSku(row)">
                <hint-button type="danger" icon="el-icon-delete" size="mini" slot="reference" title="删除spu" style="margin:5px"></hint-button>
              </el-popconfirm>
            </template>
      </el-table-column>
    </el-table>

    <el-pagination 
      style="margin-top:20px;text-align:center"
      @size-change="handleSizeChange"
      @current-change="getSkuList"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      :total="total"
      layout="prev, pager, next, jumper, ->, sizes, total">
    </el-pagination>

    <el-dialog  :visible.sync="dialogTableVisible" :before-close="close">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{skuInfo.skuName}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{skuInfo.skuDesc}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{skuInfo.price}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <template>
            <el-tag type="success" v-for="(attr) in skuInfo.skuAttrValueList" :key="attr.id" style="margin-right:10px">{{attr.id}}-{{attr.valueId}}</el-tag>
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel style="width: 400px; height: 400px">
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
              <el-image
                style="width: 100%; height: 100%"
                :src="item.imgUrl"
                ></el-image>
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name:'Sku',
  data () {
    return {
      skuList:[],
      page:1,
      limit:3,
      total:0,
      dialogTableVisible:false,
      loading:true,
      skuInfo:{}
    }
  },
  methods: {
    async getSkuList(pages = 1){
      this.page = pages
      const { page, limit} = this;
      let result = await this.$API.sku.reqBaseSkuList(page,limit)
      if(result.code == 200){
        this.total = result.data.total
        this.skuList = result.data.records
      }
    },
    handleSizeChange(limit){
      this.limit = limit
      this.getSkuList()
    },

    async deleteSku(sku){
      let result = await this.$API.sku.reqDeleteSku(sku.id)
      if(result.code == 200){
        this.$message({type:'success',message:"删除成功"})
        this.getSkuList()
      }
    },

    async cancelSale(sku){
      let result = await this.$API.sku.reqCancelSale(sku.id)
      if(result.code == 200){
        sku.isSale = 1
        this.$message({type:'success',message:"下架成功"})
        this.getSkuList(this.page)
      }
    },

    async onSale(sku){
      let result = await this.$API.sku.reqOnSale(sku.id)
      if(result.code == 200){
        sku.isSale = 0
        this.$message({type:'success',message:"上架成功"})
        this.getSkuList(this.page)
      }
    },

    edit(){
      this.$message({message:"正在开发中"})
    },

    async getSkuInfo(sku){
      this.dialogTableVisible = true
      let result = await this.$API.sku.reqSkuById(sku.id)
      console.log(result);
      if(result.code == 200){
        this.loading = false
        this.skuInfo = result.data
      }
    },

    close(done){
      this.loading = true
      this.dialogTableVisible = false
      done()
    }
  },
  mounted () {
    this.getSkuList()
  }
}
</script>

<style>
  .el-row .el-col-5{
    font-size: 18px;
    text-align: right;
  }

  .el-col{
    margin: 10px 10px;
  }

  .el-row{
    margin:0 0 5px 0
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>