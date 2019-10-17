import React from 'react';
import ReactDom from 'react-dom';
import Editor from '../src/index'
// import { Affix } from 'xiaokyo-affix'

const Demo = () => {
  return <div>
    <h1>组件预览：</h1>
    <div >
      <Editor />
    </div>
  </div>
}

ReactDom.render(<Demo />, document.getElementById('root'));