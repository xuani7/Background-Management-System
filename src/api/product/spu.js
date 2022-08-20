import request from '@/utils/request'

export const reqSpuList = (page,limit,category3Id) => request({url:`/admin/product/${page}/${limit}`,method:'get',params:{category3Id}})

export const reqSpu = (spuId) => request({url:`/admin/product/getSpuById/${spuId}`,method:'get'})

export const reqTradeMarkList = () => request({url:`/admin/product/baseTrademark/getTrademarkList`,method:'get'})

export const reqSpuImageList = (spuId) => request({url:`/admin/product/spuImageList/${spuId}`,method:'get'})

export const reqBaseSaleAttrList = () => request({url:`/admin/product/baseSaleAttrList`,method:'get'})

export const reqAddOrUpdateSpu = (spuInfo) => {
  if (spuInfo.id) {
    return request({url:`/admin/product/updateSpuInfo`,method:'post',data:spuInfo})
  }else{
    return request({url:`/admin/product/saveSpuInfo`,method:'post',data:spuInfo})
  }
}

export const reqDeleteSpu = (spuId) => request({url:`/admin/product/deleteSpu/${spuId}`,method:'delete'})