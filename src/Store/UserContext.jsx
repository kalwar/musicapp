import { createContext, useContext, useReducer } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children, intialState, reducer }) => {

    return <UserContext.Provider value={useReducer(reducer, intialState)}>
        {children}
    </UserContext.Provider>
}

export const useStateProvider = () => useContext(UserContext)
