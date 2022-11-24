import React from "react";
import { makeStyles } from "@mui/styles";
import ReactLoading from "react-loading";
import { useGlobalContext } from "../context/AppContext";

const useStyles = makeStyles((theme) => {
  return {
    main: {
      height: "90vh !important",
      width: "100% !important",
      padding: "2rem",
      paddingBottom: "3rem",
      overflow: "auto !important",
    },
    collectionName: {
      height: "35px",
      width: "250px",
      backgroundColor: "#7c7cd4",
      fontWeight: "bold",
      position: "absolute",
      top: "0",
      right: "0",
      color: "#ccc",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-evenly",
      padding: "0 1rem",
    },
    collection: {
      color: "greenyellow",
      textTransform: "uppercase",
    },
    fullDisplay: {
      // height: "100%",
      width: "100%",
    },
    loader: {
      position: "absolute",
      top: "45%",
      left: "45%",
      transform: "translate(-50%, -50%)"
    }
  };
});

export default function Display({ userData, collectionData, isPostPending }) {
  const classes = useStyles();

  const { isLoading } = useGlobalContext()
  console.log (isLoading)
  const pretty = JSON.stringify(collectionData, undefined, 2);

  return (
    <div className={classes.main}>
      <div className={classes.collectionName}>
        Collection: <span className={classes.collection}>{userData}</span>
      </div>
      {isPostPending || isLoading ? (
        <ReactLoading
          type={"bars"}
          color={"#7c7cd4"}
          height={"10%"}
          width={"10%"}
          className={classes.loader}
        />
      ) : (
        <pre className="line-numbers">
          <code className="language-javascript">{pretty}</code>
        </pre>
      )}
    </div>
  );
}
