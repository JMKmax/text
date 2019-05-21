/*
* @Author: jing
* @Date:   2019-04-25 21:21:03
* @Last Modified by:   jing
* @Last Modified time: 2019-05-03 20:54:36
*/
import React,{ Component } from 'react'
import { connect } from 'react-redux'
import {
  Form, Input,Breadcrumb,InputNumber, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';

const { Option } = Select;

import { actionCreator } from './store'
import { UPLOAD_IMAGE,UPLOAD_DETAIL_IMAGE} from 'api'

import Layout from 'common/layout'
import UploadImage from 'common/upload-image'
import RichEditor from 'common/rich-editor'
import CategorySelector from './category-selector.js'
import './detail.css'


class ProductSave extends Component{
    constructor(props){
        super(props);
        this.state={
          productId:this.props.match.params.productId
        }
    }
    componentDidMount(){
      if(this.state.productId){
        this.props.handleProuctDetail(this.state.productId)
      }  
    }
         
    render(){
        const { getFieldDecorator } = this.props.form;
        const { 
          parentCategoryId,
          categoryId,
          images,
          detail,
          name,
          description,
          price,
          stock
           } = this.props;
           let imgBox = ''
           if(images){
            imgBox = images.split(',').map((url,index)=><li key={index}><img src={url} /></li>)
           }
        const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
          },
        };
        const tailFormItemLayout = {
          wrapperCol: {
            xs: {
              span: 24,
              offset: 0,
            },
            sm: {
              span: 16,
              offset: 8,
            },
          },
        };        
        return (
        	<div className="ProductSave">
        		<Layout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>分类管理</Breadcrumb.Item>
                        <Breadcrumb.Item>添加分类</Breadcrumb.Item>
                    </Breadcrumb>
                    <Form {...formItemLayout}>
                        <Form.Item label="商品名称">
                          {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入分类名称!' }],
                            initialValue:name
                          })(
                            <Input disabled={true} />
                          )}
                        </Form.Item>
                         <Form.Item label="商品描述">
                          {getFieldDecorator('description', {
                            rules: [{ required: true, message: '请输入商品描述!' }],
                            initialValue:description
                          })(
                            <Input disabled={true} />
                          )}
                        </Form.Item>
                        <Form.Item 
                          label="商品分类"
                          required={true}
                        >
                          <CategorySelector 
                            parentCategoryId={parentCategoryId}
                            categoryId={categoryId}
                            disabled={true}
                          />
                        </Form.Item>
                        <Form.Item label="商品价格">
                          {getFieldDecorator('price', {
                            rules: [{ required: true, message: '请输入商品价格!' }],
                            initialValue:price
                          })(
                            <InputNumber 
                              disabled={true}
                             />
                          )}
                        </Form.Item>
                        <Form.Item label="商品库存">
                          {getFieldDecorator('stock', {
                            rules: [{ required: true, message: '请输入商品库存!' }],
                            initialValue:stock
                          })(
                            <InputNumber
                             disabled={true}
                             />
                          )}
                        </Form.Item>
                        <Form.Item 
                          label="商品图片"
                          required={true}
                          
                        >
                          <ul className='imgBox'>{imgBox}</ul>
                        </Form.Item>
                        <Form.Item label="商品描述">
                         <div dangerouslySetInnerHTML={{__html:detail}}></div>
                        </Form.Item>
                    </Form>                  
        		</Layout>
        	</div>
        )
    }
}
const WrappedProductSave = Form.create()(ProductSave);

const mapStateToProps = (state)=>{
    return {  
        parentCategoryId:state.get('product').get('parentCategoryId'),
        categoryId:state.get('product').get('categoryId'),
        images:state.get('product').get('images'),
        detail:state.get('product').get('detail'),
        name:state.get('product').get('name'),
        description:state.get('product').get('description'),
        price:state.get('product').get('price'),
        stock:state.get('product').get('stock')
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        handleProuctDetail:(productId)=>{
          const action = actionCreator.getProuctDetailAction(productId)
          dispatch(action)
        }
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WrappedProductSave);;


