import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/AppContext";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles(() => {
  return {
    input: {
      width: "100%",
      height: "3rem",
      fontSize: "1rem",
      fontFamily: "inherit",
      padding: "0 0.4rem",
      marginBottom: "0.6rem"
    },
    apiBtn: {
      padding: "0.3rem 2rem",
      backgroundColor: "#7c7cd4d2",
      fontFamily: "inherit",
      fontSize: "1rem",
      fontWeight: "bold",
      color: "#fff",
      borderRadius: "0.3rem",
      border: "none"
    },
    infoText: {
      marginBottom: "0.2rem",
    }
  };
});

export default function DeleteLayout() {
  const classes = useStyles();

  const { setIsLoading, setCollectionContent } = useGlobalContext();
  const [DeleteOne, setDeleteOne] = useState("");
  const [DeleteList, setDeleteList] = useState("");


  function DeleteOneRequestHandle(e) {
    e.preventDefault();
    const url = "http://localhost:8080/api/delete-one/handler";
    setIsLoading(true);
    setCollectionContent("Loading...");
    const deleteOne = { DeleteOne };

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deleteOne),
    })
      .then((response) => response.json())
      .then((result) => setCollectionContent(result), setIsLoading(false))
      .catch((error) => console.error(error), setIsLoading(false));
  }

  function DeleteListRequestHandle() {
    const DeleteArr = DeleteList.split(",");
    const url = "http://localhost:8080/api/delete-list/handler";
    const deleteList = { DeleteArr };
    setIsLoading(true);
    setCollectionContent("Loading");
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deleteList),
    })
      .then((response) => response.json())
      .then((result) => setCollectionContent(result), setIsLoading(false))
      .catch((error) => setCollectionContent(error), setIsLoading(false));
  }

  function DeleteAllRequestHandle() {
    const url = "http://localhost:8080/api/delete-all/handler";
    setIsLoading(true);
    setCollectionContent("Loading...");

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((result) => setCollectionContent(result), setIsLoading(false))
      .catch((error) => console.log(error), setIsLoading(false));
  }

  return (
    <div className="pd-2 " style={{ paddingBottom: "6rem" }}>
      <p  className={classes.infoText}>Delete an Item from collection</p>
      <form onSubmit={DeleteOneRequestHandle} className="mb-2">
        <input
          type="text"
          placeholder="enter item _id"
          onChange={(e) => setDeleteOne(e.target.value)}
          className={classes.input}
        />
        <button className={classes.apiBtn}>delete</button>
      </form>

      <div className="mb-2">
        <p  className={classes.infoText}>Delete a list of items. Seperate each _id with a comma(,)</p>
        <input
          type="text"
          placeholder="eg - 90489052,0428525,9028504925"
          onChange={(e) => setDeleteList(e.target.value)}
          className={classes.input}
        />
        <button onClick={() => DeleteListRequestHandle()} className={classes.apiBtn}>delete all</button>
      </div>

      <div className="mb-2">
        <p  className={classes.infoText}>click this button to empty your collection</p>
        <button onClick={() => DeleteAllRequestHandle()} className={classes.apiBtn}>
          empty this collections
        </button>
      </div>
    </div>
  );
}
