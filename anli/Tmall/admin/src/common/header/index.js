/*
* @Author: jing
* @Date:   2019-04-25 10:17:40
* @Last Modified by:   jing
* @Last Modified time: 2019-04-25 11:44:24
*/
import React,{ Component } from 'react'
import {
  Layout, Menu, Breadcrumb, Icon,Dropdown
} from 'antd';
import { getUserName,removeUserName,request } from 'util'
import {USER_LOGOUT} from 'api'
import './index.css'

const { SubMenu } = Menu;
const { Header } = Layout;


class AdminHeader extends Component{
	constructor(props){
		super(props);
		this.handleLayout = this.handleLayout.bind(this)
	}
	handleLayout(){
		request({url:USER_LOGOUT})
		.then(result=>{
			if(result.code == 0){
				//清除用户信息
				removeUserName()
				//跳转到登陆页面
				window.location.href = '/login'
			}	
		})
	}
    render(){
		const menu = (
		  <Menu onClick={this.handleLayout}>
		    <Menu.Item key="0">
		     	<Icon type="logout" />退出
		    </Menu.Item>
		  </Menu>
		);

        return (
        	<div className='AdminHeader'>
        		<Header className="header">
					<div className="logo">KMALL</div>
					<Dropdown overlay={menu} trigger={['click']}>
					    <a className="ant-dropdown-link" href="#">
					      {getUserName()} <Icon type="down" />
					    </a>
					 </Dropdown>

					
				</Header>
        	</div>
        )
    }
}

export default AdminHeader;