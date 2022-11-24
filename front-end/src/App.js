import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import Layout from "./Layout";
import Home from "./pages/Home";
import Form from "./pages/MongoForm";
import MongoPost from "./pages/MongoPost";
import UrlForm from "./pages/MongoUrlForm"
import UrlFormDetails from "./pages/MongoUrlFormDetails"


const theme = createTheme({
  palette: {
    primary:{
      main: '#FCF6F5FF',
    },
    secondary: {
      main: '#7c7cd4'
    }
  },
  typography: {
    fontFamily: 'Mulish',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
});

function App() {
  
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`/mongodb`} element={<Form />} />
          <Route path={`/mongodb-user`} element={<MongoPost />} />
          <Route path={`/mongodb-url-login`} element={<UrlForm />} />
          <Route path={`/mongodb-url-login-details`} element={<UrlFormDetails />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
