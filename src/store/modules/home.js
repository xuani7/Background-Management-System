import MockRequest from '@/utils/mockRequest'

const state = {
  list:{}
}

const mutations = {
  GETDATA(state,list){
    state.list = list
  }
}

const actions = {
  async getData({commit}){
    let result = await MockRequest.get('/home/list')
    if(result.code == 20000){
      commit('GETDATA',result.data)
    }
  }
}

const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters
}
