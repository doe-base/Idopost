import React,{ useState } from 'react';
import { Typography } from "@mui/material"
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

const useHeaderStyles = makeStyles((theme) => {
    return {
      header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 3rem !important",
      },
      logo: {
        color: "#7c7cd4 !important",
        fontWeight: "800 !important",
        fontSize: "1.4rem !important",
        lineHeight: "40px !important",
      },
      logoSpan: {
        fontSize: "1rem !important",
      },
      greenBall: {
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        background: "greenyellow",
      },
      userName: {
        marginRight: "0.5rem !important",
      },
      logout: {
        color: "#ccc",
        marginLeft: "1.5rem !important",
        fontFamily: "inherit",
        cursor: "pointer"
      },
    };
  });

export default function Header({userData}){

    const classesHeader = useHeaderStyles();
    const [isDisconnecting, setIsDisconnecting] = useState(false)

    const navigate = useNavigate();

    const HanndleLogOut =()=>{
      const url = "http://localhost:8080/mongodb-log-out"
      setIsDisconnecting(true)

      fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
      })
      .then((res)=>{
        return res.json()

      })
      .then((result)=>{
        setIsDisconnecting(false)
        navigate(`/mongodb`)
      })
      .catch(err => console.error(err))
    }

    return (
        <header className={classesHeader.header}>
        <Typography variant="h1" className={classesHeader.logo}>
          IDOPOST <span className={classesHeader.logoSpan}>-v0.1.0</span>
        </Typography>

        <h1>
          <span className="dark-green">MongoDB</span> {`  { JSON }  Quary`}
        </h1>

        <div className="align">
          <Typography variant="h6" className={classesHeader.userName}>
            {userData}
          </Typography>
          <div className={classesHeader.greenBall}></div>
          <a onClick={()=> HanndleLogOut()} className={classesHeader.logout}>
            dis-connect
          </a>
        </div>
      </header>
    )
}