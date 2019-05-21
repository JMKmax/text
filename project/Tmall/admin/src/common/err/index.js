/*
* @Author: jing
* @Date:   2019-04-25 11:53:05
* @Last Modified by:   jing
* @Last Modified time: 2019-04-25 12:01:28
*/
import React,{ Component } from 'react'
import { Alert } from 'antd';
import { Link } from "react-router-dom";

import './index.css'

class Err extends Component{
    render(){
        return (
        	<div className='Err'>
        		 <Alert
			      message="好像走丢了"
			      description="找不到你所访问的页面"
			      type="error"
			      showIcon
			    />
			    <Link to='/'>
			    返回首页
			    </Link>
        	</div>
        	
        )
    }
}

export default Err;