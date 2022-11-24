import React, { useState } from "react"
import PutJsonTextEditor from "../PutText";
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles((theme)=> {
    return {
        section: {
            height: "100% !important",
            padding: "2rem !important"
        },
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
    }
})



export default function PostLayout(){
    const classes = useStyles()

    const [ GetOne, setGetOne ] = useState("")
    const [ putContent, setPutContent ] = useState({})
    const [ isPending, setIspending] = useState(false)
    const [ IsDocIDVerified, setIsDocIDVerified] = useState(false)
    

    function HandlePutGet(e){
        e.preventDefault()
        const url = "http://localhost:8080/api/get-one/handler"
        setIspending(true)
        const getOne = { GetOne }

        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(getOne)
        })
        .then(response => response.json())
        .then((result) => {
            setPutContent(result)
            setIspending(false)
            setIsDocIDVerified(true)
        })
        .catch(error => console.error(error), setIspending(false))
    }

    console.log(IsDocIDVerified)
    return(
        <section className={classes.section}>
            <form onSubmit={HandlePutGet} className="mb-2">
                <input type="text" placeholder="enter document id" onChange={(e)=> setGetOne(e.target.value)} className={classes.input}/>
                <button className={classes.apiBtn}>put</button>
            </form>
                { IsDocIDVerified ? <PutJsonTextEditor putContent={putContent} GetOne={GetOne}/> : <p>You have not entered any valid document ID</p>}
        </section>
    )
}