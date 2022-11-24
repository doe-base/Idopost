import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Display from "../components/Display";
import Header from "../components/Header";
import JsonTextEditor from "../components/JsonTextEditor"
import DeleteLayout from "../components/request-layout/DeleteLayout";
import GetAllLayout from "../components/request-layout/GetAll"
import PostLayout from "../components/request-layout/PUTLayout";
import { useGlobalContext } from "../context/AppContext";



const useStyles = makeStyles((theme) => {
  return {
    mainGrid: {
      height: "100vh !important",
    },
    bigButton: {
      width: "100%",
      height: "100%",
      backgroundColor: "gray",
      border: "1px solid #ccc",
      display: "inline-block",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.2rem",
      fontWeight: "600",
      color: "#fff",
      textTransform: "uppercase",
      cursor: "pointer",
      textAlign: "center",
    },
    display: {
      backgroundColor: "#fff",
      border: "1px solid #ccc",
      position: "relative",
    },
    querySection: {
      border: "1px solid #ccc",
    },
    userInfo: {
      width: "100%",
      textAlign: "center",
      background: "#ccc",
      padding: "0.3rem 0",
    },
    bigButtonHolder:{
      display: "flex"
    },
    operationSection: {
      height: "90vh !important",
      width: "100% !important",
      overflow: "auto !important",
    },
    operations: {
      height: "100% !important",
    }
  };
});

export default function MongoPost() {
  const classes = useStyles();

  const [isPostPending, setIsPostPending] = useState(false);
  const [JsonTextEditorContent, setJsonTextEditorContent] = useState('')
  const [currentRequest, setCurrentRequest] = useState("post")

  const { user, collectionContent, setCollectionContent } = useGlobalContext()


  function PostRequestHandle(e){
    e.preventDefault()
    const url = "http://localhost:8080/api/post/handler"
    setCollectionContent("Loading...")
    setIsPostPending(true)

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(JsonTextEditorContent)
    })
    .then((res) => {
      return res.json()
    })
    .then((result) => {
      setCollectionContent(result)
      setIsPostPending(false)
    })
    .catch((err) => {
      setIsPostPending(false)
      setCollectionContent(err)
    })
  }

  function switchRequest(value){
    if(value === "post"){
      setCurrentRequest("post")
    }else if(value === "get"){
      setCurrentRequest("get")
    }else if(value === "put"){
      setCurrentRequest("put")
    }else if(value === "delete"){
      setCurrentRequest("delete")
    }
  }
  
  return (
    <section>
      <Header userData={user.name}/>

      <Grid container className={classes.mainGrid}>
        <Grid item lg={6} className={classes.operationSection}>
          <div className={classes.bigButtonHolder}>

            <div className={classes.bigButton} style={currentRequest === "post" ? { background: "#7c7cd4d2" } : null} onClick={()=> switchRequest('post')}>post</div>
            <div className={classes.bigButton} style={currentRequest === "get" ? { background: "#7c7cd4d2" } : null} onClick={()=> switchRequest('get')}>get</div>
            <div className={classes.bigButton} style={currentRequest === "put" ? { background: "#7c7cd4d2" } : null} onClick={()=> switchRequest('put')}>put</div>
            <div className={classes.bigButton} style={currentRequest === "delete" ? { background: "#7c7cd4d2" } : null} onClick={()=> switchRequest('delete')}>delete</div>

          </div>
          <div>
            <div className={classes.userInfo}>
              {
                !collectionContent ? "your collection is empty, make a post request" :
                currentRequest === "post" && "make a post query" ||
                currentRequest === "get" && "make a get request" ||
                currentRequest === "put" && "update an existing document" ||
                currentRequest === "delete" && "delete a document"
              }
            </div>
            
            <div className={classes.operations}>
              {currentRequest === "post" ? <JsonTextEditor setJsonTextEditorContent={setJsonTextEditorContent} PostRequestHandle={PostRequestHandle}/> : null}
              {currentRequest === "get" ? <GetAllLayout /> : null}
              {currentRequest === "delete" ? <DeleteLayout /> : null}
              {currentRequest === "put" ? <PostLayout /> : null}
            </div>

          </div>
        </Grid>

        <Grid item xs={12} md={12} lg={6} container className={classes.display}>
          <Display userData={user.collection} collectionData={collectionContent} isPostPending={isPostPending}/>
        </Grid>
      </Grid>
    </section>
  );
}
