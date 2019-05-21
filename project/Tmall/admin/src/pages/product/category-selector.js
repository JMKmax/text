/*
* @Author: jing
* @Date:   2019-04-28 20:42:16
* @Last Modified by:   jing
* @Last Modified time: 2019-05-03 20:39:32
*/
import React,{ Component,Fragment } from 'react'
import { Select } from 'antd';
import { request } from 'util';
import { GET_CATEGORIES } from 'api'

const Option = Select.Option;


class CategorySelector extends Component{
	constructor(props){
		super(props)
		this.state={
			leavelOneCategories:[],
			leavelOneId:'',
			leavelTwoCategories:[],
			leavelTwoId:'',
			isChanged:false,
			needLoadLevelTwo:false
		}
		this.leavelOneChange = this.leavelOneChange.bind(this)
		this.leavelTwoChange = this.leavelTwoChange.bind(this)
	}
	componentDidMount(){
		this.loadLeavelOneCategories()
	}
	static getDerivedStateFromProps(props, state){
		const {parentCategoryId,categoryId} = props;
		const leavelOneIdChange = parentCategoryId != state.leavelOneId
		const leavelTwoIdChange = categoryId != state.leavelTwoId

		if(state.leavelOneId && !leavelOneIdChange && !leavelTwoIdChange){
			return null
		}

		//分类ID没有改变，不更新state
		if(!leavelOneIdChange && !leavelTwoIdChange){
			return null
		}
		if(state.isChanged){
			return null
		}
		if(parentCategoryId == 0){
			return {
				leavelOneId:categoryId,
				leavelTwoId:'',
				isChanged:true
			}
		}else{
			return {
				leavelOneId:parentCategoryId,
				leavelTwoId:categoryId,
				isChanged:true,
				needLoadLevelTwo:true
			}
		}
		return null;
	}
	componentDidUpdate(){
		if(this.state.needLoadLevelTwo){
			this.loadLeavelTwoCategories()
			this.setState(()=>({needLoadLevelTwo:false}))
		}
	}
	loadLeavelOneCategories(){
		request({
			url:GET_CATEGORIES,
			data:{
				pid:0
			}
		})
		.then(result=>{
			if(result.code == 0){
				this.setState(()=>({leavelOneCategories:result.data}))
			}
		})
	}
	leavelOneChange(value){
		this.setState(()=>({leavelOneId:value,leavelTwoId:''}),()=>{
			this.onValueChange()
			this.loadLeavelTwoCategories()
		})
	}
	loadLeavelTwoCategories(){
		request({
			url:GET_CATEGORIES,
			data:{
				pid:this.state.leavelOneId
			}
		})
		.then(result=>{
			if(result.code == 0){
				this.setState(()=>({leavelTwoCategories:result.data}))
			}
		})
	}
	leavelTwoChange(value){
		this.setState(()=>({leavelTwoId:value}),()=>{
			this.onValueChange()
		})
	}
	onValueChange(){
		const { getCategoriesId } = this.props
		const {leavelOneId,leavelTwoId} = this.state
		if(leavelTwoId){
			getCategoriesId(leavelOneId,leavelTwoId)
		}else{
			getCategoriesId(0,leavelOneId)
		}
		
	}
	render(){
		const {leavelOneCategories, leavelTwoCategories,leavelOneId,leavelTwoId} = this.state;
		const { disabled } = this.props
		const leaveOneOptions = leavelOneCategories.map(category=><Option key={category._id} value={category._id}>{category.name}</Option>)
		const leaveTwoOptions = leavelTwoCategories.map(category=><Option key={category._id} value={category._id}>{category.name}</Option>)

		return( 
			<div className='CategorySelector'>
			<Select 
				style={{width:200,marginRight:10}}
				onChange={this.leavelOneChange}
				value = {leavelOneId}
				disabled={disabled}
			>
			 {leaveOneOptions}
			</Select>
			{
				leaveTwoOptions.length
				?<Select 
					style={{width:200}}
					onChange={this.leavelTwoChange}
					value = {leavelTwoId}
					disabled={disabled}
				>
					{leaveTwoOptions}
				</Select>
				:null
			}
			
			
			</div>
		)
	}
}





export default CategorySelector;