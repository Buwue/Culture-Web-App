// import { createContext, useContext, useState, useEffect } from "react"
// import LoginFormHeader from "../../Auth/LoginFormHeader"
// import LoginName from "../../Auth/LoginName"
// import LoginEmail from "../../Auth/LoginEmail"
// import LoginPass from "../../Auth/LoginPass"
// import LoginFormFooter from "../../Auth/LoginFormFooter"
// import LoginButton from "../../Auth/LoginButton"
// import LoginError from "../../Auth/LoginError"
// import supabase from "../../lib/supaBaseClient"
// import { CurrentPageContext } from "../../OldApp"
// import LoginSuccess from "../../Auth/LoginSuccess"

// export const CurrFormContext = createContext({
//     password: "",
//     email: "",
//     prenom: "",
//     nom: "",
//     setPassword: "",
//     setEmail: "",
//     setPrenom: "",
//     setNom: "",
// })

// function LoginForm() {
//     const [password, setPassword] = useState("")
//     const [email, setEmail] = useState("")
//     const [prenom, setPrenom] = useState("")
//     const [nom, setNom] = useState("")
//     const [error, setError] = useState({ display: false, msg: "" })
//     const [success, setSuccess] = useState({ display: false, msg: "" })
//     const [sendSign, setSendSign] = useState(false)
//     const [mode, setMode] = useState("SignUp")
//     const { claims, setClaims, setUserData } = useContext(CurrentPageContext)

//     useEffect(() => {
//         async function SignUp() {
//             const { data, error } = await supabase.auth.signUp({
//                 email: email,
//                 password: password,
//             })

//             if (!error) {
//                 setSuccess({ display: true, msg: "Compte cree." })
//             }
//         }

//         async function SignIn() {
//             const { error } = await supabase.auth.signInWithPassword({
//                 email: email,
//                 password: password,
//             })
//             if (!error) {
//                 setSuccess({ display: true, msg: "Compte accedee." })
//             }
//         }

//         if (error.display == true) {
//             setSendSign(false)
//         }

//         if (sendSign) {
//             if (mode == "LogIn") {
//                 SignIn()
//             } else {
//                 SignUp()
//             }
//         }
//     }, [sendSign])

//     useEffect(() => {
//         async function getClaims() {
//             const { data, error } = await supabase.auth.getClaims()
//             if (data) {
//                 setClaims(data.claims)
//                 const answer = await supabase
//                     .from("test")
//                     .select("Answered")
//                     .eq("id", data.claims.sub)
//                     .single()

//                 setUserData(answer.data["Answered"])
//             }
//         }

//         const { data } = supabase.auth.onAuthStateChange(() => {
//             getClaims()
//         })

//         getClaims()

//         return () => data.subscription.unsubscribe()
//     }, [])

//     return (
//         <div class="w-full max-w-3xl">
//             <div class="bg-slate-900/60 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
//                 <CurrFormContext
//                     value={{
//                         sendSign,
//                         setSendSign,
//                         password,
//                         setPassword,
//                         email,
//                         setEmail,
//                         prenom,
//                         setPrenom,
//                         nom,
//                         setNom,
//                         error,
//                         setError,
//                         mode,
//                         setMode,
//                     }}
//                 >
//                     <LoginFormHeader />

//                     <div class="md:col-span-7 p-6 md:p-8">
//                         {success.display ? <LoginSuccess msg={success.msg} /> : <></>}
//                         {error.display ? <LoginError msg={error.msg} /> : <></>}

//                         <div class="space-y-5">
//                             {mode == "SignUp" ? <LoginName /> : <></>}
//                             <LoginEmail />
//                             <LoginPass />

//                             {/* <!-- CGU -->
//                             <label class="flex items-start gap-2 cursor-pointer select-none">
//                                 <input type="checkbox" id="terms" class="mt-0.5 h-4 w-4 rounded border-slate-700 bg-slate-950 text-brand-500 focus:ring-brand-500 focus:ring-offset-slate-900">
//                                 <span class="text-xs text-slate-400 leading-relaxed">
//                                     J'accepte les <a href="#" onclick="showTermsNotice(event)" class="text-brand-400 hover:text-brand-300 font-medium">conditions d'utilisation</a> et la politique de confidentialité de CultureG Prép.
//                                 </span>
//                             </label> */}

//                             <LoginButton />
//                         </div>
//                         <LoginFormFooter />
//                     </div>
//                 </CurrFormContext>
//             </div>
//             {/* <p class="text-center text-xs text-slate-600 mt-4">
//                 &copy; 2026 CultureG Prép — Simulateur d'admission USJ
//             </p> */}
//         </div>
//     )
// }

// export default LoginForm

import { LoginForm } from "../../components/login-form"

function SigninPage({ type }) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-4xl">
                <LoginForm />
            </div>
        </div>
    )
}

export default SigninPage
