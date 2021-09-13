import React, { useState } from 'react';
import Dialog from 'y-dialog';
import '../assets/index.less';
const Demo = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <button onClick={() => setVisible(true)}>显示弹窗</button>
      <Dialog
        visible={visible}
        closable
        onClose={() => setVisible(false)}
        prefixCls={'rmc-dialog'}
        title={'title'}
        footer={<button onClick={() => setVisible(false)}>关闭</button>}
      >
        我是一个弹窗
      </Dialog>
    </div>
  );
};

export default Demo;
