import { checkToken } from "./store/logInOut"
import { useCheckTokenValidationQuery } from "./store/auth"
import Login from "./components/Login"
import React, { ReactNode } from "react"

export const LoginCheck: React.FC<MyProps> = ({ children }) => {
    try{
        let isAuthenticated = false
        if(checkToken() === true){
          console.log("inside the token.........................................")
          const { data } = useCheckTokenValidationQuery(null)
          console.log(data, 'data form hook......................................................................')
        if(data.valid){
          isAuthenticated = true
        }
        return isAuthenticated ? <>{children}</> : <Login />
      }
      else {
        return <Login />
      }
    }
    catch(error){
      return <Login />
    
    }
}

interface MyProps {
    children: ReactNode 
}