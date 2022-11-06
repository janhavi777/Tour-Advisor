import { json } from "react-router-dom";
import "./Login.css"
const Login = (props) => {
    var emailArray=[];
    var passwordArray=[];

    var loginBox = document.getElementById("login");
    var regBox = document.getElementById("register");
    var forgetBox = document.getElementById("forgot");

    var loginTab = document.getElementById("lt");
    var regTab = document.getElementById("rt");

    function regTabFun(event){
        event.preventDefault();

        regBox.style.visibility="visible";
        loginBox.style.visibility="hidden";
        forgetBox.style.visibility="hidden";

        regTab.style.backgroundColor="rgb(12, 132, 189)";
        loginTab.style.backgroundColor="rgba(11, 177, 224, 0.82)";
    }
    function loginTabFun(event){
        event.preventDefault();

        regBox.style.visibility="hidden";
        loginBox.style.visibility="visible";
        forgetBox.style.visibility="hidden";

        loginTab.style.backgroundColor="rgb(12, 132, 189)";
        regTab.style.backgroundColor="rgba(11, 177, 224, 0.82)";
    }
    function forTabFun(event){
        event.preventDefault();

        regBox.style.visibility="hidden";
        loginBox.style.visibility="hidden";
        forgetBox.style.visibility="visible";

        regTab.style.backgroundColor="rgba(11, 177, 224, 0.82)";
        loginTab.style.backgroundColor="rgba(11, 177, 224, 0.82)";

    }


   async function register(event){
        event.preventDefault();

        var email = document.getElementById("re").value;
        var password = document.getElementById("rp").value;
        var passwordRetype = document.getElementById("rrp").value;

        if (email == ""){
            alert("Email required.");
        }
        else if (password == ""){
            alert("Password required.");
        }
         else{
            const registerResponse = await fetch("http://localhost:3001/register",{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                    username: email,
                    password: password
                })
            })
            const resJson = await registerResponse.json();
            if(registerResponse.status === 200){
                alert("registered in",JSON.stringify(resJson));
            }else{
                if(resJson.err.errno === 1062){
                    alert("email exist already")
                }else{
                    alert("Error occured")
                }
            }
            return ;
        }
    }
    async function login(event){
        event.preventDefault();
        //alert("SSSS")
        var email = document.getElementById("se").value;
        var password = document.getElementById("sp").value;

        var i = emailArray.indexOf(email);

        if (email == ""){
            alert("Email required.");
            return ;
        }else if(password == ""){
            alert("Password required");
        }
        else {
            // alert(email + " yor are login Now \n welcome to our website.");
            // const re
            // document.getElementById("se").value ="";
            // document.getElementById("sp").value="";
            const loginResponse = await fetch("http://localhost:3001/login",{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                    username: email,
                    password: password
                })
            })
            const resJson = await loginResponse.json();
            if(loginResponse.status === 200){
                alert("logged in",JSON.stringify(resJson));
            }else{
                alert("Invalid credentials",JSON.stringify(resJson));
            }
            return ;
        }

    }
    /*function forgot(event){
        event.preventDefault();

        var email = document.getElementById("fe").value;

        if(emailArray.indexOf(email) == -1){
            if (email == ""){
                alert("Email required.");
                return ;
            }
            alert("Email does not exist.");
            return ;
        }

        alert("email is send to your email check it in 24hr. \n Thanks");
        document.getElementById("fe").value ="";
    }*/
    return <div>
        <div id="container">
        <div id="tabs">
            <p id="lt" classNameNameName="tabs" onClick={loginTabFun}>Log in</p>
            <p id="rt" classNameNameName="tabs" onClick={regTabFun}>Register</p>
            <div id="clear"></div>
        </div>

        <div id="cont">
            <div id="login" classNameNameName="comm">
                <h3>Sign in</h3>

                <input id="se" type="email" placeholder="Email" required/>
                <input id="sp" type="password" placeholder="Password" required/>
                <input type="button" onClick={login} value="Submit"/>

                <p onClick={forTabFun}>Forget Password?</p>
            </div>
            <div id="register" classNameNameName="comm">
                <h3>Register</h3>

                <input id="re" type="email" placeholder="Email" required/>
                <input id="rp" type="password" placeholder="Password" required/>
                <input id="rrp" type="password" placeholder="Re write Password" required/>
                <input type="submit" onClick={register} value="Submit"/>

            </div >
            <div id="forgot" classNameNameName="comm">
            <h3>Forgot Password</h3>
            <div>
                <input id="fe" type="email" placeholder="Email" required/>
                {/* <input type="submit" onClick={forgot} value="Submit"/> */}
            </div>
            </div>
        </div>
    </div>
    </div>
}

export default Login;