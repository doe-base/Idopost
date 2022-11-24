import React, { useContext, useState, useEffect } from 'react'

const AppContext = React.createContext()


const AppProvider = ({ children }) => {
 
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState({})
    const [collectionContent, setCollectionContent] = useState([])
    const [connectionStatus, setConnectionStatus] = useState(false)

    useEffect(()=>{
        const url = "http://localhost:8080/mongodb-get-connection-status"

        fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
        .then(res => res.json())
        .then(result => {
            setConnectionStatus(result.connection_status)
            setUser(result.UserInfo)
        })
        .catch(err => console.error(err))
    }, [])

    useEffect(() => {
    
        if (connectionStatus){
            const url2 = "http://localhost:8080/mongodb-get-all"

            fetch(url2, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
            return res.json()
            })
            .then((result) =>{
                setCollectionContent(result)
    
            })
            .catch((err) => {
            console.error(err)
            })
        }
    }, [connectionStatus])


    return (
        <AppContext.Provider
            value = {{
                user, setUser, collectionContent, setCollectionContent, setConnectionStatus, isLoading, setIsLoading
            }}
        >
            { children }
        </AppContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(AppContext)
}

export { AppContext, AppProvider }