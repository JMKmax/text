/*
* @Author: jing
* @Date:   2019-04-24 15:34:34
* @Last Modified by:   jing
* @Last Modified time: 2019-05-04 16:40:09
*/
const SERVER = 'http://127.0.0.1:3000/'

export const ADMIN_LOGIN = SERVER + 'admin/login'
export const USER_LOGOUT = SERVER + 'user/logout'
export const ADMIN_COUNT = SERVER + 'admin/count'
export const GET_USERS = SERVER + 'admin/users'
export const ADD_CATEGORY = SERVER + 'category'
export const GET_CATEGORIES = SERVER + 'category'
export const UPDATE_CATEGORY_ORDER = SERVER + 'category/updateoOrder'
export const UPDATE_CATEGORY_NAME = SERVER + 'category/updateName'
export const UPLOAD_IMAGE = SERVER + 'product/uploadImage'
export const UPLOAD_DETAIL_IMAGE = SERVER + 'product/uploadDetailImage'
export const SAVE_PRODUCT = SERVER + 'product'
export const GET_PRODUCTS = SERVER + 'product'
export const UPDATE_PRODUCT_ORDER = SERVER + 'product/updateOrder'
export const UPDATE_PRODUCT_STATUS = SERVER + 'product/updateStatus'
export const GET_PRODUCT_DETAIL = SERVER + 'product/detail'
export const SEARCH_PRODUCTS = SERVER + 'product/search'