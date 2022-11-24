import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Typography, Button } from "@mui/material";
import { BsArrowRight } from "react-icons/bs"

const useStyles = makeStyles((theme) => {
  return {
    main: {
      height: "110vh",
      width: "100vw",
    },
    infoSection: {
      background: "linear-gradient(76deg, rgba(20,20,34,1) 0%, rgba(0,0,0,1) 95%)",
      height: "110vh",
      position: "relative",
      padding: "2rem",
    
    },
    image: {
      width: "60%",
      position: "absolute",
      top: "25%",
      right: "2rem",
    },
    formSection: {
      padding: "2rem",
    },
    logo: {
      color: "#7c7cd4 !important",
      marginBottom: "2.7rem !important",
      fontWeight: "800 !important",
      fontSize: '1.4rem !important',
      lineHeight: '40px !important',
    },
    mainTitle: {
      color: "#7c7cd4 !important",
      marginBottom: "1.5rem !important",
      fontWeight: "800 !important",
      fontSize: '1.4rem !important',
      lineHeight: '40px !important',
    },
    logoSpan: {
      fontSize: "1rem !important",
    },
    logoText: {
      color: "white !important",
      fontWeight: "600 !important",
      fontSize: '1.1rem !important',
      lineHeight: '29px !important',
      letterSpacing: '0.5px !important',
      marginBottom: "2rem !important",
    },
    button: {
      width: "15rem !important",
      border: "1px solid gray !important",
      marginBottom: "1.5rem !important",
    },
    buttonHolder: {
      display: "flex !important",
      flexDirection: "column !important",
      alignItems: "center !important",
    },
    formTitle: {
      marginBottom: "1.7rem !important",
      fontWeight: "600 !important",
      color: "rgba(20,20,34,1) !important",
    },
    buttonImage:{
      width: "100% !important",
    },
    LetsGetStarted: {
      fontWeight: "700 !important",
      marginBottom: "1rem !important",
      color: "rgba(20,20,34,1) !important",
      textAlign: 'center',
      
    },
    link: {
      color: "#fff",
      fontSize: "1rem",
      marginRight: "1rem"
    },
    linkicon: {
      color: "#fff !important",
      fontSize: "1rem !important",
      fontWeight: "000 !important"
    }
  };
});

export default function Home() {
  const classes = useStyles();
  

  return (
    <main className={classes.main}>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={3.5}
          className={classes.formSection}
        >
          <Typography variant="h1" className={classes.logo}>
            IDOPOST <span className={classes.logoSpan}>-v0.1.0</span>
          </Typography>

          <Typography variant="h4" className={classes.LetsGetStarted}>Lets Get Started</Typography>
          <Typography variant="h6" className={classes.formTitle}>Choose a database to connect to:</Typography>
          <div className={classes.buttonHolder}>
            <Button component="a" href="/mongodb" className={classes.button}>
              <img src="/img/mongo.png" alt="" className={classes.buttonImage}/>
            </Button>

            {/* MySQL not available yet */}
            {/* <Button component="a" href="/connect/mysql" className={classes.button}>
              <img src="/img/mysql.png" alt="" className={classes.buttonImage}/>
            </Button> */}
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={8.5}
          className={classes.infoSection}
        >
          <Typography variant="h1" className={classes.mainTitle}>
            Create and test REST APIs easier and faster  
          </Typography>
        
          <Typography variant="h5" className={classes.logoText}>
            Ido Post is a backend toolkit build by <a className={classes.link} href="https://github.com/doe-base" target="blank"> Daniel Idoko.</a> It allows you:<br />
            Connect and query databases<br />
            Build REST APIs in minutes.<br />
            {/* Get implementation code in Node JS and Golang.<br />  */}
            IDOPOST was created with React and Golang
          </Typography>

          <div className="align">
            <a href="https://github.com/doe-base/Idopost" className={classes.link}>view source on github </a> 
            <BsArrowRight className={classes.linkicon}/>
          </div>

          <img
            src="/img/download.png"
            alt="server"
            className={classes.image}
          />
        </Grid>
      </Grid>
    </main>
  );
}
