import { useNavigate } from "react-router-dom";

//** Summit form handle function
export default function formSubmitHandler(e, setIspending, DatabaseName, CollectionName, setConnectionErr, setUser, setCollectionContent, setConnectionStatus, navigate){

    e.preventDefault();
    const url = `http://localhost:8080/mongodb-user-url-details`;
    setIspending(true);
    const userMongoData = { DatabaseName, CollectionName };

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
          setCollectionContent(data.collectioncontent)
          setUser(data.dbcontent)
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