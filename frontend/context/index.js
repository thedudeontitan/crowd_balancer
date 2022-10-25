import { createContext,useState } from "react";


export const Context = createContext();

export default function ContextProvider(props){

    const [email,setEmail] = useState("Carlos Mart");
    const state = {email,setEmail}

    return (
        <Context.Provider value={state}>
            {props.children}
        </Context.Provider>
    );
}
