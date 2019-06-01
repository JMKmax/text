/*
* @Author: macnookpro
* @Date:   2019-05-31 09:25:53
* @Last Modified by:   macnookpro
* @Last Modified time: 2019-05-31 09:35:08
*/
import {
	getHomeProduct
} from '../api/index.js'
export default {
	getHomeProduct({commit}){
		const products = getHomeProduct()
		commit('getHomeProduct',{homeProduct:products})
	}
}