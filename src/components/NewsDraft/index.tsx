/*
 * @Author: Small-Tree-Tree 913485079@qq.com
 * @Date: 2022-08-31 14:25:26
 * @LastEditors: Small-Tree-Tree 913485079@qq.com
 * @LastEditTime: 2022-09-03 09:16:03
 * @FilePath: \newssystem\src\components\NewsDraft\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw ,ContentState} from 'draft-js';
import draftToHtml from 'draftjs-to-html'; 
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
export default function NewsDraft(props:any) {
    
    const [editorState,setEditorState] = useState(EditorState.createEmpty())
    // 每次编辑器状态发生变化时都会调用该函数
    const onEditorStateChange = (value:any) =>{
        setEditorState(value)
    }

    useEffect(() =>{
      if(props.content){
          // 把html的转为富文本能够接收的格式
          const contentBlock = htmlToDraft(props.content);
          if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            setEditorState(editorState)
          }
      }
    },[props.content])

    return (
        <div style={{border:'1px solid #F0F0F0'}} >
            <Editor
                to
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
                onBlur={() =>{
                    props.getDraftData(draftToHtml(convertToRaw(editorState.getCurrentContent())))
                }}
            />;
        </div>
    )
}
