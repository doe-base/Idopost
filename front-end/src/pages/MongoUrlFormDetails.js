import React, { useState } from "react";
import { Grid, Typography, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/AppContext";

const useStyles = makeStyles((theme) => {
  return {
    main: {
      width: "100vw",
    },
    heroSection: {
      height: "100vh",
      background: "#242427d2 !important",
      display: "flex",
      flexDirection: "column !important",
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      width: "70%",
      marginBottom: "1rem !important",
    },
    heroText: {
      fontSize: "1.4rem !important",
      fontWeight: "700 !important",
      width: "50% !important",
      textAlign: "center !important",
      color: "#fff !important",
    },
    formSection: {
      display: "flex",
      flexDirection: "column !important",
      justifyContent: "center",
      alignItems: "center",
    },
    formTitle: {
      fontSize: "1.4rem !important",
      fontWeight: "700 !important",
      width: "50% !important",
      textAlign: "center !important",
      color: "#000 !important",
      marginBottom: "2rem !important",
    },
    form: {
      width: "50% !important",
      marginBottom: "1rem",
    },
    formButton: {
      width: "100% !important",
      marginTop: "2rem !important",
      padding: "1rem 0 !important",
      fontFamily: "inherit",
      backgroundColor: "#7c7cd4 !important",
      border: "none",
      color: "#fff",
      fontSize: "1.1rem",
      fontWeight: "700",
      borderRadius: "6px",
      transition: "all 0.2s linear",

      "&:hover": {
        cursor: "pointer",
        backgroundColor: "#7c7cd4d2 !important",
      },
    },
    formButtonDisable: {
      width: "100% !important",
      marginTop: "2rem !important",
      padding: "1rem 0 !important",
      fontFamily: "inherit",
      backgroundColor: "#7c7cd4d2 !important",
      border: "none",
      color: "#fff",
      fontSize: "1.1rem",
      fontWeight: "700",
      borderRadius: "6px",
      transition: "all 0.2s linear",
    },
    errorMessage: {
      color: 'red',
      width: '50%',
      marginBottom: '0.5rem'
    },
    errorMessage2: {
      color: '#757511',
      width: '50%',
      marginBottom: '0.5rem'
    },
    smalltext:{
        fontSize: '0.8rem !important',
        color: '#757511 !important',
        marginBottom: '1.3rem !important'
    }
  };
});

export default function UrlFormDetails() {
  const classes = useStyles();
  const { setUser, setCollectionContent, setConnectionStatus } = useGlobalContext()
  
//** App State
  const [DatabaseName, setDatabaseName] = useState("");
  const [CollectionName, setCollectionName] = useState("");
  const [isPending, setIspending] = useState(false);
  const [isCollectingData, setIsCollectingData]= useState(false)
  const [connectionErr, setConnectionErr] = useState(false)
  
  const navigate = useNavigate();
 
//** Summit form handle function
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const url = `http://localhost:8080/mongodb-user-url-details`;
    const userMongoData = { DatabaseName, CollectionName };
    setIspending(true);

    fetch(url, {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify(userMongoData),
    })
      .then((res) =>  res.json())
      .then((data) => {
        setIspending(false);
        setConnectionStatus(true)
        if(data){
          console.log(data)
          setCollectionContent(data.dbcontent)
          setUser(data.collectioncontent)
          setConnectionErr(false)
          navigate(`/mongodb-user`)
        }else{
          setConnectionErr(true)
        }

        
      })
      .catch((err) => {
        setIspending(false);
        if(err != null) {
          console.log(err)
          setConnectionErr(true)
        }
      });
  };

  return (
    <main className={classes.main}>

      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={6} className={classes.heroSection} >

          <img src="/img/download1.png" alt="server" className={classes.image}/>
          <Typography variant="h4" className={classes.heroText}>Connect and Quary Databases in minutes</Typography>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={6} className={classes.formSection}>
          <Typography variant="h4" className={classes.formTitle}>Connect to your MongoDB</Typography>

          {connectionErr ? <p className={classes.errorMessage}>unable to connect. make sure the database you entered exist in you cluster</p> : null}
          
          <form onSubmit={formSubmitHandler} method="POST" className={classes.form}>
            <TextField label="Database Name" variant="filled" fullWidth color="secondary" margin="dense" multiline name="database-name" onChange={(e) =>  setDatabaseName(e.target.value)} required/>
            <TextField label="Collection Name" variant="filled" fullWidth color="secondary" margin="dense" multiline name="collection-name" onChange={(e) => setCollectionName(e.target.value)} required/>
        
            {isPending || isCollectingData ? (
              <button type="submit" className={classes.formButtonDisable}>
                {isCollectingData ? "collecting data..." : "submitting..."}
              </button>
            ) : (
              <button type="submit" className={classes.formButton}>
                submit
              </button>
            )}
          </form>

          <div className="pd-1">
            <Typography variant="body1" className={classes.smalltext}>
              Enter the name of the database and collection you want to connect
            </Typography>

            <Typography variant="body1">
              Fill the connection form instead{" "}
              <a href="/mongodb">
                click here
              </a>
            </Typography>

            <Typography variant="body1">
              you can create a new database via{" "}
              <a href="https://account.mongodb.com/account/login">
                mongoDB website
              </a>
            </Typography>
          </div>

        </Grid>
      </Grid>

    </main>
  );
}
