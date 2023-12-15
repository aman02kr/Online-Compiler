import React from "react";
import { render } from "react-dom";
import stubs from './defaultStubs';

import react,{useState,useEffect,useContext} from 'react';
import { GlobalInfo } from "./Compiler";
import AceEditor from "react-ace";
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/theme-twilight';

function MyEditor(props) {
  const {code,language,theme,fontsize}=useContext(GlobalInfo);
    const [editorValue, setEditorValue] = useState('');
    useEffect(()=>{
      setEditorValue(stubs[language]);
      props.handleCode(stubs[language]);
    },[language]);
  
    const handleEditorChange = (newValue) => {
      props.handleCode(newValue);
      console.log(newValue);
      setEditorValue(newValue);
    };
    return (
      <AceEditor
        mode="javascript"
        theme={theme}
        name="my-editor"
        // value="function myFunction() {\n  console.log('Hello, Ace!');\n}"
        value={editorValue}
        onChange={handleEditorChange}
        fontSize={fontsize}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        setOptions={{
          useWorker: false,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
        style={{ width: '100%', height: '500px',  border: "1px solid black"
      }}
      />
    );
  }
  export default MyEditor;