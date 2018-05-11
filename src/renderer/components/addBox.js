import React, { PureComponent } from 'react';
import { Input } from 'antd';

import 'antd/dist/antd.css';
import styles from './../styles/index.css';

const Search = Input.Search;

export default class AddBox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() {
  }


  render() {
    return (
      <div className='addbox-container'>
        <Search id='add' placeholder="请输入基金代码" enterButton="添加" size="large" onSearch={(value) => this.props.addFund(value)} />
      </div>
    )
  }
}
