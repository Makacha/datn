import React from 'react';
import { Col, Row, Spin } from 'antd';

const CenterSpin = () => {
  return (
    <Row>
      <Col xs={24} className={'text-center'}>
        <Spin />
      </Col>
    </Row>
  );
};

export default CenterSpin;
