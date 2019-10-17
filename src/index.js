/**
 * 编辑器封装
 */
import React, { Component } from 'react'

// 引入编辑器样式
import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/table.css'

// 引入编辑器组件
import BraftEditor from 'braft-editor'
import Table from 'braft-extensions/dist/table'//支持table

BraftEditor.use(Table({
  defaultColumns: 3, // 默认列数
  defaultRows: 3, // 默认行数
  withDropdown: false, // 插入表格前是否弹出下拉菜单
  exportAttrString: '', // 指定输出HTML时附加到table标签上的属性字符串
  includeEditors: ['editor-1'], // 指定该模块对哪些BraftEditor生效，不传此属性则对所有BraftEditor有效
}))

const excludeControls = [
  'undo',
  'redo',
  'separator',
  // 'font-size',
  'line-height',
  'letter-spacing',
  'separator',
  'text-color',
  // 'bold',
  // 'italic',
  // 'underline',
  'strike-through',
  'separator',
  'superscript',
  'subscript',
  'remove-styles',
  'emoji',
  'separator',
  'text-indent',
  'text-align',
  'separator',
  // 'headings',
  // 'list-ul',
  // 'list-ol',
  // 'blockquote',
  // 'code',
  'separator',
  // 'link',
  'separator',
  'hr',
  'separator',
  // 'media',
  'separator',
  'clear'
];

// const initialValue = '<p><span data-foo="success" class="keyboard-item success">wodexin</span><span data-foo="warn" class="keyboard-item warn">wodexin</span></p><h1>文章示例</h1><h2>1.基本样式示例</h2><p>本文用于示范，展示111111...................................</p><p></p><h3>1.1 段落和列表</h3><p>有序列表</p><ol><li>有序列表</li><ol><li>子有序列表</li><li>子有序列表</li></ol><li>有序列表</li><li>有序列表</li></ol><p>无序列表</p><ul><li><a href="http://xiaok.club" target="_blank">无序列表</a></li><li>无序列表</li><ul><li>子无序列表</li><li>子无序列表</li></ul><li>无序列表</li></ul><blockquote>说法萨芬啊沙发沙发案说法是否案说法阿萨发生发案说法案说法</blockquote><p></p><div class="my-checkbox flex-row"><input type="checkbox"/><span class="text">checkbox</span></div><p></p><div class="my-checkbox flex-row"><input type="checkbox"/><span class="text">checkbox</span></div><p></p><table ><tr><td colSpan="1" rowSpan="1">开心</td><td colSpan="1" rowSpan="1">开心</td><td colSpan="1" rowSpan="1">开心</td></tr><tr><td colSpan="1" rowSpan="1">开心</td><td colSpan="1" rowSpan="1">开心</td><td colSpan="1" rowSpan="1">开心</td></tr><tr><td colSpan="1" rowSpan="1">开心</td><td colSpan="1" rowSpan="1">开心</td><td colSpan="1" rowSpan="1">开心</td></tr></table><p></p><p><a href="https://xiaok.club" target="_blank">xiaokyo</a></p><pre><code>http/1.1 200 ok<br/>{<br/>  &quot;user&quot;:{<br/>    &quot;id&quot;:&quot;xxx&quot;,<br/>    ...<br/>  }<br/>}</code></pre><div class="my-tips-tit" data-tit="提示"><p class="tit">提示</p><div class="text">提示<br/>默认文本</div></div><p></p><p></p><div class="media-wrap image-wrap"><img class="media-wrap image-wrap" src="//cdn.xiaok.club/ca6621174ee51111d7ebcaa11a51c391.png"/></div><p></p><div class="media-wrap audio-wrap"><audio controls="" class="media-wrap audio-wrap" src=""></audio></div><p></p><p></p><p></p><p></p>'
export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // 创建一个空的editorState作为初始值
      editorState: BraftEditor.createEditorState(localStorage.getItem('editorValue') || '', { editorId: 'editor-1' })
    }
  }

  render() {
    const { editorState } = this.state
    const { ...otherProps } = this.props
    const extendControls = [
      {
        key: 'custom-button',
        type: 'button',
        text: '预览',
        onClick: this.preview
      }
    ]

    return (
      <div className="xiaokyo-editor" style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <BraftEditor
            id="editor-1"
            excludeControls={excludeControls}
            extendControls={extendControls}
            value={editorState}
            onChange={this.handleEditorChange}
            onSave={this.submitContent}
            contentStyle={{ flex: 1, minHeight: '500' }}

            {...otherProps}
          />
        </div>
      </div>
    )
  }

  async componentDidMount() {
    // 假设此处从服务端获取html格式的编辑器内容
    // const htmlContent = await fetchEditorContent()
    // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
    // this.setState({
    //   editorState: BraftEditor.createEditorState(htmlContent)
    // })
  }
  submitContent = async () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    const htmlContent = this.state.editorState.toHTML()
    localStorage.setItem('editorValue', htmlContent)
    console.log(htmlContent)
    // const result = await saveEditorContent(htmlContent)
  }
  handleEditorChange = (editorState) => {
    this.setState({ editorState })
  }
  preview = () => {
    if (window.previewWindow) {
      window.previewWindow.close()
    }
    window.previewWindow = window.open()
    window.previewWindow.document.write(this.buildPreviewHtml())
    window.previewWindow.document.close()
  }
  buildPreviewHtml() {

    return `
      <!Doctype html>
      <html>
        <head>
          <title>Preview Content</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
            }
            .container p{
              white-space: pre-wrap;
              min-height: 1em;
            }
            .container pre{
              padding: 15px;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
            .container blockquote{
              margin: 0;
              padding: 15px;
              background-color: #f1f1f1;
              border-left: 3px solid #d1d1d1;
            }
            .container table{
              width:100%;
              border-style: hidden;
              border-collapse: collapse;
              border-spacing: 0;
              border: 1px solid #07a9fe;
              border-width: 0.5px;
            }
            .container table td{
              border: 1px solid #c5c5c5;
              padding: 10px 15px;
            }
          </style>
        </head>
        <body>
          <div class="container">${this.state.editorState.toHTML()}</div>
        </body>
      </html>
    `

  }

}