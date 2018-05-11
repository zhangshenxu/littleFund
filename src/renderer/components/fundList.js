import React, { PureComponent } from 'react';
import { Table, Button } from 'antd';

import api from './../scripts/api.js';

import 'antd/dist/antd.css';
import styles from './../styles/index.css';

export default class FundList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    }
  }

  componentWillMount() {
    this.getDate(this.props);//获取基金列表数据
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.getDate(nextProps);
    }
  }

  async getDate(props) {
    const fundList = props.fundList;
    let dataSource = await Promise.all(fundList.map(async (item, index) => {
      const json = await api(item).catch((e) => { });
      console.log(json)
      if (json) {
        return {
          key: json.fundcode,
          name: json.name,
          gszzl: json.gszzl,
          gztime: json.gztime,
        };
      }
    }));
    dataSource = dataSource.filter((v) => v !== undefined);
    console.log('dataSource', dataSource)
    this.setState({ dataSource: dataSource });
  }

  render() {
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '涨跌幅',
        dataIndex: 'gszzl',
        key: 'gszzl',
      },
      {
        title: '时间',
        dataIndex: 'gztime',
        key: 'gztime',
      },
      {
        title: '操作',
        dataIndex: 'handle',
        key: 'handle',
        render: (text, record, index) =>
          <Button
            type="default"
            shape="circle"
            icon="minus"
            className='minus-btn'
            onClick={(e) => this.props.deleteFund(e, text, record, index)}
          />
      }
    ];

    return (
      <Table dataSource={this.state.dataSource} columns={columns} pagination={false} className='table' />
    )
  }
}
