import React, { useState } from "react"
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


export default function GetAllLayout(){
    const classes = useStyles();

    const { setCollectionContent, setIsLoading } = useGlobalContext()
    const [ GetOne, setGetOne ] = useState('')
    const [ GetList, setListOne ] = useState('')

    function GetAllHandle(e){
        e.preventDefault()
        // Check if collection is empty
        const url2 = "http://localhost:8080/mongodb-get-all"
        setIsLoading(true)
        setCollectionContent("Loading...")

        fetch(url2, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
            return res.json()
        })
        .then((result) =>{
            setIsLoading(false);
            setCollectionContent(result)
        })
        .catch((err) => {
            console.error(err)
            setIsLoading(false);
        })
    }

    function GetOneHandle(e){
        e.preventDefault()
        const url = "http://localhost:8080/api/get-one/handler"
        setIsLoading(true)
        setCollectionContent("Loading...")
        const getOne = { GetOne }

        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(getOne)
        })
        .then(response => response.json())
        .then(result => setCollectionContent(result), setIsLoading(false))
        .catch(error => console.error(error), setIsLoading(false))
    }
    
    function GetListHandle(e){
        e.preventDefault()
        const url = "http://localhost:8080/api/get-list/handler"
        setCollectionContent("Loading...")
        setIsLoading(true)
        const GetListArr = GetList.split(",")
        const getList = { GetListArr }

        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(getList)
        })
        .then(response => response.json())
        .then(result => setCollectionContent(result), setIsLoading(false))
        .catch(error => console.error(error), setIsLoading(false))
    }

    return (
        <div className="pd-2 " style={{ paddingBottom: "6rem" }}>

            <form onSubmit={GetAllHandle} className="mb-2">
                <p className={classes.infoText}>click this button to get all items in your collection</p>
                <button className={classes.apiBtn}>get all items</button>
            </form>

            <p className={classes.infoText}>Get an Item from collection</p>
            <form onSubmit={GetOneHandle} className="mb-2">
                <input type="text" placeholder="enter item _id" onChange={(e)=> setGetOne(e.target.value)} className={classes.input}/>
                <button className={classes.apiBtn}>get</button>
            </form>

            <form onSubmit={GetListHandle} className="mb-2">
                <p className={classes.infoText}>Get a list of items. Seperate each _id with a comma(,)</p>
                <input type="text" placeholder="eg - 90489052,0428525,9028504925" onChange={(e)=> setListOne(e.target.value)} className={classes.input}/>
                <button className={classes.apiBtn}>submit</button>
            </form>

           
        </div>
    )
}