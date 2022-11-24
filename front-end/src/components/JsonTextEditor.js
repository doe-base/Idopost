import React, { useEffect, useState } from 'react'
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {
    return {
        textField: {
            width: "100% !important",
            height: "400px !important",
            padding: "1rem",
            outline: "nonen !important",
            "&:focus": {
              outline: "none !important",
            },
          },
    }
})


export default function JsonTextEditor({ setJsonTextEditorContent, PostRequestHandle }){
    const classes = useStyles();

    const [pPrint, setPPrint] = useState("");
    const textAreaRef = React.useRef(null);
    const [isValidJson, setIsValidJson] = useState(false);
    
  
    function isJsonString(str) {
        try {
          JSON.parse(str);
        } catch (e) {
          return false;
        }
        return true;
      }
    
      const prettyPrint = (e) => {
        e.preventDefault()
    
        const isJson = isJsonString(pPrint)
        if(isJson){
          const obj = JSON.parse(pPrint);
          const pretty = JSON.stringify(obj, undefined, 4);
          textAreaRef.current.value = pretty;
          setIsValidJson(true)
        }else{
          alert('SORRY!!! Input is not valid JSON')
          setIsValidJson(false)
        }
      };
    
      const handleTextAreaOnChange = (e) => {
        setPPrint(prevSetPPrint => {
          return prevSetPPrint = e.target.value
        })
        setJsonTextEditorContent(e.target.value)
      }
      useEffect(()=>{
        const isJson = isJsonString(pPrint)
        if(isJson){
          setIsValidJson(true)
        }else{
          setIsValidJson(false)
        }
      },[pPrint])


    return(
        <form className="pd-2" style={{ paddingBottom: "3rem", height: "100%" }}>
              
            <textarea className={classes.textField} onChange={(e) => handleTextAreaOnChange(e)} ref={textAreaRef}></textarea>
            
            <button className="btns prettybtn" onClick={(e) => prettyPrint(e)}>{" "}pretty{" "}</button>
            <button onClick={isValidJson ? PostRequestHandle : null} type="submit" className={isValidJson ? "btns submitbtn" : "btns submit-btn-disabled"}> {" "}submit{" "} </button>
        </form>
    )
}