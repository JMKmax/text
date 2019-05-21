import React,{ Component } from 'react'
import { Table, Divider, Tag,Breadcrumb } from 'antd';
import { connect } from 'react-redux'
import Layout from 'common/layout'
import moment from 'moment'
import { actionCreator } from './store'




const columns = [{
  title: '用户名',
  dataIndex: 'username',
  key: 'username',
}, {
  title: '是否管理员',
  dataIndex: 'isAdmin',
  key: 'isAdmin',
  render:isAdmin=>isAdmin?'是':'否'
}, {
  title: '邮箱',
  dataIndex: 'email',
  key: 'email',
}, {
  title: '电话',
  dataIndex: 'phone',
  key: 'phone',
}, {
  title: '创建时间',
  dataIndex: 'createdAt',
  key: 'createdAt',
}];


class User extends Component{
	componentDidMount(){
		this.props.handlepage()
	}
    render(){
    	const { list,current,pageSize,total,handlepage,isFetching } = this.props
    	const dataSource = list.map(user=>{
    		return {
    		  key: user.get('_id'),
			  username: user.get('username'),
			  isAdmin: user.get('isAdmin'),
			  email: user.get('email'),
			  phone:user.get('phone'),
			  createdAt:moment(user.get('createdAt')).format('YYYY-MM-DD HH:mm:ss')
    		}
    	}).toJS()
        return (
        	<div className='User'>
	        	<Layout>
				     <Breadcrumb style={{ margin: '16px 0' }}>
			          <Breadcrumb.Item>用户中心</Breadcrumb.Item>
			          <Breadcrumb.Item>用户管理</Breadcrumb.Item>
			          <Breadcrumb.Item>用户分类</Breadcrumb.Item>
			        </Breadcrumb>
	        		<Table 
	        		dataSource={dataSource} 
	        		columns={columns} 
	        		pagination={{
	        			current:current,
	        			pageSize:pageSize,
	        			total:total
	        		}}
	        		onChange={(page)=>{handlepage(page.current)}}
	        		loading={{
	        			spinning:isFetching,
	        			tip:'正在加载数据'
	        		}}
	        		/>
	        	</Layout>
        	</div>
        )
    }
}

const mapStateToProps = (state)=>{
	return {
		list:state.get('user').get('list'),
		current:state.get('user').get('current'),
	    pageSize:state.get('user').get('pageSize'),
	    total:state.get('user').get('total'),
	    isFetching:state.get('user').get('isFetching')
	}
}
const mapDispatchToProps = (dispacth)=>{
	return {
		handlepage:(page)=>{
			const action = actionCreator.getPageAction(page)
			dispacth(action)
		}	
	}
	
}



export default connect(mapStateToProps,mapDispatchToProps)(User);
