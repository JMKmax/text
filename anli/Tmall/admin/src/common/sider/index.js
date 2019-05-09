/*
* @Author: jing
* @Date:   2019-04-25 10:56:32
* @Last Modified by:   jing
* @Last Modified time: 2019-04-25 12:03:06
*/
import React,{ Component } from 'react'
import {
  Layout, Menu, Icon
} from 'antd';
import { NavLink } from "react-router-dom"
const { SubMenu } = Menu;
const { Sider } = Layout;
import './index.css'

class AdminSider extends Component{
    render(){
        return (
        	<div className='AdminSider'>
        	  <Sider width={200} style={{ background: '#fff' }}>
		        <Menu
		          mode="inline"
		          style={{ minHeight: 880, borderRight: 0 }}
		        >
		          
		            <Menu.Item key="1">
		            	<NavLink to='/'><Icon type="home" />首页</NavLink>
		            </Menu.Item>
		            <Menu.Item key="2">
		            	<NavLink to='/user'><Icon type="user" />用户管理</NavLink>
		            </Menu.Item>
		            <Menu.Item key="3">
		            	<NavLink to='/category'><Icon type="appstore" />分类管理</NavLink>
		            </Menu.Item>
		            <Menu.Item key="4">
		            	<NavLink to='/product'><Icon type="bars" />商品管理</NavLink>
		            </Menu.Item>
		            <Menu.Item key="5">
		            	<NavLink to='/order'><Icon type="book" />订单管理</NavLink>
		            </Menu.Item>
		        </Menu>
		      </Sider>

        	</div>
        	
        )
    }
}

export default AdminSider;