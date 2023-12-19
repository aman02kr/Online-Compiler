import './Compiler.css';
import copy from 'clipboard-copy';

import react, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import moment from 'moment';
import MyEditor from './MyEditor';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';

export const GlobalInfo = createContext();

function Compiler() {
  const [fontsize,setFontsize]=useState(14);
  const [darkMode, setDarkMode] = useState(false);
  const [theme, setTheme] = useState('monokai')
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [status, setStatus] = useState("");
  const [jobId, setJobId] = useState("");
  const [jobDetails, setJobDetails] = useState("null");
  const {user} =useAuth0();
  const navigate = useNavigate();
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const defaultlang = localStorage.getItem("default-language") || "cpp";
    setLanguage(defaultlang);
  }, []);
  
  const saveCode = async () => {
    const fileName = window.prompt('Enter the file name:')+"."+language;
    const userId = user.sub;
    // Replace with the actual user ID obtained from Auth0
    try {
      await axios.post('https://compiler-box.onrender.com/save-code', { userId, code, language ,fileName });
      console.log('Code saved successfully');
      alert("saved successfully");

    } catch (error) {
      console.error('Error saving code:', error);

    }
 
  };
  const toggleDarkMode = () => {
    console.log("theme change");
    if(!darkMode){
      document.body.style.color="#ffffff";
      setTheme("twilight");

    }
   else{
    document.body.style.color="#000000";

    setTheme("xcode");

   }
    setDarkMode(!darkMode);
    

  };
  const handleCopy = () => {
    copy(code);
    alert("Copied successfully");
    // You can also add a callback or display a notification after successful copy
  };
  const setDefaultLanguage = () => {
    localStorage.setItem("default-language", language);
  }
  const handleDownload = () => {
  
  const fileName = `myfile.${language}`;
  const file = new File([code], fileName, { type: 'text/plain' });

  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(url);
  };
  const Value = (val) => {
    console.log(val);
    setCode(val);
  }
  const handleSubmit = async () => {
    const payload = {
      language,
      code,
      input
    };

    try {
      setIsRunning(true);
      setJobId("");
      setStatus("");
      setOutput("");
      setJobDetails(null);
      const { data } = await axios.post("https://compiler-box.onrender.com/run", payload);
      console.log(data);
      setJobId(data.jobId);
      let intervalId
      intervalId = setInterval(async () => {
        const { data: dataRes } = await axios.get(
          "https://compiler-box.onrender.com/status", { params: { id: data.jobId } });
        const { success, job, error } = dataRes;
        console.log(dataRes);
        if (success) {
          const { status: jobStatus, output: jobOutput } = job;
          setStatus(jobStatus);
          setJobDetails(job);
          if (jobStatus === "pending") return;
          setOutput(jobOutput);
          setIsRunning(false);

          clearInterval(intervalId);

        }
        else {
          setStatus("error: Please retry!");
          console.error(error);
          clearInterval(intervalId);
          setOutput(error);
        }
      }, 1000);
    }
    catch ({ response }) {
      setIsRunning(false);
      if (response) {
        const errMsg = response.data.stderr;
        setOutput(errMsg);
      }
      else {
        setOutput("Error connecting to server");
      }
    }

  }
  // const renderTimeDetails = () => {
  //   if (!jobDetails) {
  //     return "";
  //   }
  //   let { submittedAt, startedAt, completedAt } = jobDetails;
  //   let result = "";
  //   submittedAt = moment(submittedAt).toString();
  //   result += `Job Submitted At: ${submittedAt}  `;
  //   const start = moment(startedAt);
  //   const end = moment(completedAt);
  //   const diff = end.diff(start, "seconds", true);
  //   console.log("hello");
  //   result += `Execution Time: ${diff}s`;
  //   return result;
  // };

  return (
    <GlobalInfo.Provider value={{ code, language, theme,fontsize }}>
      <div className="Compiler" style={{ whiteSpace: "pre-line" }} >
       
          <div className="toolbox" >
            
            <select className="tool"  style={{ width: "80px" }} value={language} onChange={
              (e) => {
                let response = window.confirm("Warning: Switching the language,will remove your code");
                if ((response)) {
                  setLanguage(e.target.value);
                }

              }
            }>
               <option value="c">C </option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
                <option value="py">Python 3 </option>
                <option value="rb">Ruby </option>
                <option value="cs">C# </option>
                <option value="js">JavaScript </option>
                <option value="go">Go </option>
                <option value="php">PHP </option>
                <option value="rs">Rust </option>
                <option value="ts">TypeScript</option>
 
            </select>
            <button className="tool"  style={{ width: "100px" }} onClick={setDefaultLanguage}>Set Default</button>
            <button className="tool"  onClick={handleSubmit} style={{ backgroundColor: "green" } } disabled={isRunning}>{isRunning ? 'Running...' : 'Run'}</button>
            <button className="tool"  onClick={handleCopy} style={{ width: "30px" }}><i class=" fa fa-copy"></i> 
            </button>
            <select className="tool"  style={{ width: "100px" }} value ={theme} onChange={
              (e) => {
                  setTheme(e.target.value);
              }}>
                <option value="monokai">monokai</option>
                <option value="twilight">twilight</option>
                <option value="dracula">dracula</option>
                <option value="github">github</option>
                <option value="xcode">xcode</option>

              </select>
              <select className="tool"  style={{ width: "60px" }} value ={fontsize} onChange={
              (e) => {
                  setFontsize(parseInt(e.target.value));
              }}>
                <option value="12">12</option>
                <option value="14">14</option>
                <option value="16">16</option>
                <option value="18">18</option>
                <option value="20">20</option>

              </select>
              <button className="tool"  style={{ width: "30px" }}onClick={handleDownload} > <i class="fa fa-download" aria-hidden="true"></i> </button>
              <button className="tool"  style={{ width: "60px" }}onClick={toggleDarkMode} >{!darkMode?(<>dark</>):(<>light</>)} </button>
              <button className="tool"  style={{ width: "60px",backgroundColor: "#037ffc" }}onClick={saveCode} >save </button>


          </div>
        
              <div class="editor" ><MyEditor handleCode={Value} /></div>
             
              
              <div class="iocontainer">
              <textarea  className="inputarea"  placeholder="enter input here...." value={input} onChange={(e) => {
                setInput(e.target.value);
              }}></textarea>
              <div className="outputarea" >
              <p><b>OUTPUT</b></p>  
              <p>&gt;&gt;{output}</p>
              </div>
              

            </div>
    
      </div>
    </GlobalInfo.Provider>
  );
}


export default Compiler;
 {/* <br />
        <div class="runinfo">
          <p>{status}</p>
          <p>{jobId && `JobID: ${jobId}`}</p>
          <p >{renderTimeDetails()}</p>
        </div>  */}