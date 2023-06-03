import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
function Signup() {
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
    const app = initializeApp(firebaseConfig);
    const storage = getStorage();
    // const storageRef = ref(storage, 'images/image.jpg');
    const [userid, setuserid] = useState('');
    const [email, setEmail] = useState('');
    const [image, setimage] = useState(null);
    const [imageurl, setimageurl] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setcPassword] = useState('');
    let imagebloburl = ""
    let id="";
    async function storeimage(e) 
    {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            imagebloburl = URL.createObjectURL(e.target.files[0])
            // console.log(imagebloburl)
            setimage(URL.createObjectURL(e.target.files[0]));
        }


        const response = await axios.get(imagebloburl, { responseType: 'blob' });
        // console.log(response.data)
        imagebloburl = response.data;
        // console.log(imagebloburl)
    
            




    }


    async function OnRegister(e) 
    {
        // const navigate = useNavigate();
        const app = initializeApp(firebaseConfig);
        const auth = getAuth();
        e.preventDefault();
        if (password == '') 
        {
            alert("Please enter Password");
            return false;

        }
        // If confirm password not entered
        else if (cpassword == '') 
        {
            alert("Please enter confirm password");
            return false;

        }
        else if (password !== cpassword)
        {
            alert("\nPassword did not match: Please try again...")
            return false;
        }

        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user.uid);
                console.log(imagebloburl)
                setuserid(user.uid);
                id=user.uid;
                // code for image upload
                




            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/email-already-in-use') {
                    alert("Email is already registered on the servers");

                }
                console.log(errorMessage)
            }).then(()=>{
                const storageRef = ref(storage,  `users`);
    // const userRef = ref(storageRef, `item`);
    const imageRef = ref(storageRef, 'profilepic.jpg');
    console.log(imagebloburl)
    uploadBytes(imageRef, imagebloburl).then((snapshot) => {
        console.log(snapshot)
        console.log('Uploaded a blob or file!');
        getDownloadURL(imageRef).then(function (downloadURL) {
            console.log("File available at", downloadURL);
        });



        navigate("/login");
    }).catch((error)=>{
        console.log(error);
    })
        
            })

    }



return <>
    <div class="bg-green-400 min-w-full flex flex-col">
        <div class="container w-[50vw] lg:w-1/3  md:w-1/2  p-2 mt-2 py-2 px-4 mx-auto flex flex-col items-center justify-center px-2">
            <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full space-y-4">
                <h1 class="mb-8 text-3xl text-center text-green-400">Sign up</h1>

                <input aria-labelledby="email" type="email" class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" required
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)} />

                <input id="pass" type="password" class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" required
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)} />
                <input id="confirmpassord" type="password" class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" required
                    placeholder="Confirm Password"
                    onChange={(e) => setcPassword(e.target.value)} />


                <button id="uploadimage"
                    label="Choose profile pic"
                    primary={false}
                    onClick={function () { document.getElementById('uploadfile').click() }}
                    class="w-full text-center py-3 rounded-xl bg-indigo-400 text-white hover:bg-green-dark focus:outline-none my-1">Upload image</button>
                <div class="hidden">
                    <input type="file" id="uploadfile" className="filetype"
                        accept="image/png,image/jpeg"
                        onChange={(e) => { storeimage(e) }}
                    />
                </div>
                {image && <img src={image} alt="preview image" />}




                <button
                    type="submit"
                    class="w-full text-center py-3 rounded-xl bg-blue-400 text-white hover:bg-green-dark focus:outline-none my-1" onClick={OnRegister}
                >Create Account</button>


                <div class="text-center text-sm text-grey-dark mt-4">
                    By signing up, you agree to the
                    <a class="ml-1 no-underline border-b border-grey-dark text-blue-400" href="#">
                        Terms of Service
                    </a> and
                    <a class="ml-1 no-underline border-b border-grey-dark text-blue-400" href="#">
                        Privacy Policy
                    </a>
                </div>
            </div>

            <div class="text-grey-dark mt-6">
                Already have an account?
                <span class="no-underline border-b border-blue text-blue cursor-pointer" onClick={() => navigate("/login")}>
                    Log in
                </span>.
            </div>
        </div>
    </div>
</>
}
export default Signup