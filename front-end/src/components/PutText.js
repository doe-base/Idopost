import React, { useEffect, useState } from 'react'
import { makeStyles } from "@mui/styles";
import { useGlobalContext } from "../context/AppContext";

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


export default function PutJsonTextEditor({ putContent, GetOne }){
    const classes = useStyles();

    const [putContentString, setPutContentString] = useState("")
    const [IsValidJson, setIsValidJson] = useState(false)
    const [ DeleteOne, setDeleteOne] = useState(GetOne)
    const textAreaRef = React.useRef(null)

    const { setCollectionContent } = useGlobalContext()

    useEffect(()=>{
        if(putContent._id){
            delete putContent._id
        }
    
        const str = JSON.stringify(putContent)
        const obj = JSON.parse(str);
        const pretty = JSON.stringify(obj, undefined, 4);
          
        setPutContentString(pretty)

      }, [putContent])
  
     const handleTextAreaOnChange = (e) => {
        setPutContentString(e.target.value)
     }


    // const [pPrint, setPPrint] = useState("");
    // const textAreaRef = React.useRef(null);
    // const [isValidJson, setIsValidJson] = useState(false);
    // const [putContentString, setPutContentString] = useState("")

    // useEffect(()=>{
    //   setPutContentString(JSON.stringify(putContent))
    // },[putContentString, putContent])

    // function isJsonString(str) {
    //     try {
    //       JSON.parse(str);
    //     } catch (e) {
    //       return false;
    //     }
    //     return true;
    //   }
    
    //   const prettyPrint = (e) => {
    //     e.preventDefault()
    
    //     const isJson = isJsonString(pPrint)
    //     if(isJson){
    //       const obj = JSON.parse(pPrint);
    //       const pretty = JSON.stringify(obj, undefined, 4);
    //       textAreaRef.current.value = pretty;
    //       setIsValidJson(true)
    //     }else{
    //       alert('SORRY!!! Input is not valid JSON')
    //       setIsValidJson(false)
    //     }
    //   };
    
    //   const handleTextAreaOnChange = (e) => {
    //     setPPrint(prevSetPPrint => {
    //       return prevSetPPrint = e.target.value
    //     })
    //     setJsonTextEditorContent(e.target.value)
    //   }
    //   useEffect(()=>{
    //     const isJson = isJsonString(pPrint)
    //     if(isJson){
    //       setIsValidJson(true)
    //     }else{
    //       setIsValidJson(false)
    //     }
    //   },[pPrint])

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
    
        const isJson = isJsonString(putContentString)
        if(isJson){
          const obj = JSON.parse(putContentString);
          const pretty = JSON.stringify(obj, undefined, 4);
          textAreaRef.current.value = pretty;
          setIsValidJson(true)
        }else{
          alert('SORRY!!! Input is not valid JSON')
          setIsValidJson(false)
        }
      };

      function HandlePutDocumentSubmit(e){
        e.preventDefault()

        // ** First Lets delete the item
        const url = "http://localhost:8080/api/delete-one/handler";
        const deleteOne = { DeleteOne };
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(deleteOne),
          })
            .then((response) => response.json())
            .then((result) => {
                //** Lets post the update to mongodb */
                //** First lets add the _id property */
                const obj = JSON.parse(putContentString)
                obj._id = GetOne
                const strObj = JSON.stringify(obj)
                const url = "http://localhost:8080/api/post/handler"
                fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(strObj),
                })
                .then((res) => {
                    return res.json()
                  })
                  .then((result) => {
                    setCollectionContent(result)
                  })
                  .catch((err) => {
                    console.log(err)
                  })
            })
            .catch((error) => console.error(error));

      } 


    return(
        <form className="pd-2" style={{ paddingBottom: "6rem" }}>
              
            <textarea className={classes.textField} onChange={(e) => handleTextAreaOnChange(e)} value={putContentString} ref={textAreaRef}></textarea>
            
            <button className="btns prettybtn" onClick={(e)=> prettyPrint(e)}>{" "}pretty{" "}</button>
            <button type="submit" className={IsValidJson ? "btns submitbtn" : "btns submit-btn-disabled"} onClick={IsValidJson ? HandlePutDocumentSubmit : null}> {" "}submit{" "} </button>
        </form>
    )
}