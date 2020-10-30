import React, {useState, useContext, createContext, useEffect} from 'react'

const FormContext = createContext({})

const LoginHospede = ({children}) => {

    const [logged, setLogged] = useState(false)
    const [token, setToken] = useState("")
    const [nome, setNome] = useState("")

    useEffect(() => {
        const tokenHospede = localStorage.getItem("tokenHospede")
        const nomeHospede = localStorage.getItem("nomeHospede")

        if(tokenHospede){
            setLogged(true)
            setToken(token)
            setNome(nomeHospede)
        }
    }, [])

    const signIn = (token, nome) => {
        localStorage.setItem("tokenHospede", token)
        localStorage.setItem("nomeHospede", nome)
        setToken(token)
        setLogged(true)
        setNome(nome)
    }

    const signOut = () => {
        localStorage.removeItem("tokenHospede")
        setToken("")
        setLogged(false)
        setNome("")
    }


    return (

        <FormContext.Provider value = {{
            logged, setLogged,
            token, setToken,
            signIn, signOut,
            nome
        }}>
            {children}
        </FormContext.Provider>
    )
}

export function useLoginHospede(){
    const {
        logged, token, signIn, signOut, nome
    } = useContext(FormContext)

    return {
        logged, token, signIn, signOut, nome
    }
}

export default LoginHospede