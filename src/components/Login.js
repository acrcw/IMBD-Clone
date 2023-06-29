import React,{useState} from 'react'
import { initializeApp } from 'firebase/app';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";


// import { NavLink, useNavigate } from 'react-router-dom'
import { InfinitySpin } from 'react-loader-spinner'
function Login() {
const navigate = useNavigate();

    const firebaseConfig = {
        apiKey: process.env.REACT_APP_apiKey,
        authDomain: process.env.REACT_APP_authDomain,
        projectId: process.env.REACT_APP_projectId,
        storageBucket: process.env.REACT_APP_storageBucket,
        messagingSenderId: process.env.REACT_APP_messagingSenderId,
        appId: process.env.REACT_APP_appId,
        measurementId: process.env.REACT_APP_measurementId
        };
        const app=initializeApp(firebaseConfig);
       
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onLogin = (e) => {
        const auth=getAuth(app);
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/");
            localStorage.setItem("userid@tmdb",user.uid);
            
            console.log(user.uid);
            // navigate("/home")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
       
    }


    return <>        <div class="h-full bg-gradient-to-tl from-green-400 to-green-500 w-full py-16 px-4">
            <div class="flex flex-col items-center justify-center">
               

                    <div class="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16">
                        <p tabindex="0" class="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800">Login to your account</p>
                        <p tabindex="0" class="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500">Dont have account? <span  class="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none  text-gray-800 cursor-pointer" onClick={()=>navigate("/signup")}> Sign up here</span></p>
                        <button aria-label="Continue with google" role="button" class="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-10">
                            <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg2.svg" alt="google"></img>
                                <p class="text-base font-medium ml-4 text-gray-700">Continue with Google</p>
                        </button>
                        <button aria-label="Continue with github" role="button" class="focus:outline-none  focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-4">
                            <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg3.svg" alt="github"></img>
                                <p class="text-base font-medium ml-4 text-gray-700">Continue with Github</p>
                        </button>
                        <button aria-label="Continue with twitter" role="button" class="focus:outline-none  focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-4">
                            <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg4.svg" alt="twitter"></img>
                               <p class="text-base font-medium ml-4 text-gray-700">Continue with Twitter</p>
                        </button>
                        <div class="w-full flex items-center justify-between py-5">
                            <hr class="w-full bg-gray-400"></hr>
                                <p class="text-base font-medium leading-4 px-2.5 text-gray-400">OR</p>
                                <hr class="w-full bg-gray-400  "></hr>
                                </div>
                                <div>
                                    <br/>
                                    <label id="email" class="text-sm font-medium leading-none text-gray-800">
                                        Email
                                    </label>
                                    <input aria-labelledby="email" type="email" class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" required                                                                                
                                    placeholder="Email address"
                                    onChange={(e)=>setEmail(e.target.value)} />
                                </div>
                                <div class="mt-6  w-full">
                                    <label for="pass" class="text-sm font-medium leading-none text-gray-800">
                                        Password
                                    </label>
                                    <div class="relative flex items-center justify-center">
                                        <input id="pass" type="password" class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" required                                                                                
                                    placeholder="Password"
                                    onChange={(e)=>setPassword(e.target.value)}/>
                                        <div class="absolute right-0 mt-2 mr-3 cursor-pointer">
                                            <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg5.svg" alt="viewport"></img>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-8">
                                    <button role="button" class="focus:ring-2 focus:ring-offset-2 focus:ring-green-700 text-sm font-semibold leading-none text-white focus:outline-none bg-green-600 border rounded hover:bg-indigo-600 py-4 w-full"  onClick={onLogin}    >Login</button>
                                </div>
                        </div>
                    </div>
            </div>

</>
  
}

export default Login