import React, { PureComponent } from 'react';
import ReactDOM from "react-dom";
import AddBox from './components/addBox.js';
import FundList from './components/fundList.js';
// import { Divider } from 'antd';

import valid from './scripts/valid.js';
// import 'antd/dist/antd.css';
import styles from './styles/index.css';

class Main extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fundList: [],
    };
  }

  componentWillMount() {
    this.getFund();
  }

  //从存储里读取基金数据、存入state
  getFund = () => {
    let fundList = localStorage.getItem('fundList');
    if (fundList === null) {
      fundList = '[]';
    }
    fundList = JSON.parse(fundList);
    this.setState({
      fundList: fundList,
    });
  }

  // 添加基金
  addFund = async (value) => {
    const res = await valid(value).catch(() => {
      alert('请输入正确的基金代码');
      document.getElementById('add').value = '';
      return;
    });
    if (res) {
      const fundList = Array.from(new Set([...this.state.fundList, value]));
      this.setState({
        fundList: fundList,
      });
      localStorage.setItem('fundList', JSON.stringify(fundList));
      document.getElementById('add').value = '';
    }
    // localStorage.removeItem('fundList');
  }

  // 删除基金
  deleteFund = (e, text, record, index) => {
    console.log(record.key)
    const fundList = this.state.fundList.filter((v) => v != record.key);
    this.setState({
      fundList: fundList,
    });
  }


  render() {
    console.log('state:', this.state);
    return (
      <div className='container'>
        <AddBox addFund={this.addFund} />
        <FundList fundList={this.state.fundList} deleteFund={this.deleteFund} />
      </div >
    )
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);


// const BrowserWindow = require('electron').remote.BrowserWindow
// const path = require('path')

// const newWindowBtn = document.getElementById('new-window')

// newWindowBtn.addEventListener('click', function (event) {
//   const modalPath = path.join('file://', __dirname, '../../sections/windows/modal.html')
//   let win = new BrowserWindow({ width: 400, height: 320 })
//   win.on('close', function () { win = null })
//   win.loadURL(modalPath)
//   win.show()
// })
