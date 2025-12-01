<html>
<body>

<head>
    <title>Career Guidance</title>
    <link rel="icon" href="https://i.pinimg.com/originals/8d/fe/97/8dfe9756ecd43af1e3872bebdaffe1fb.jpg">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * { margin:0; padding:0; box-sizing: border-box; }
        body {
            height: 100vh;
            background-image:url(https://img.freepik.com/free-photo/studio-background-concept-abstract-empty-light-gradient-purple-studio-room-background-product_1258-71888.jpg?w=2000);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            font-family: Arial, sans-serif;
        }
        h1 {
            text-align:center;
            margin-top:10px;
            padding:10px;
            color:#2A1B49;;
        }
        .tab-container {
            width: 40%;
            margin: 50px auto 40px auto;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            position: relative;
            padding: 20px;
        }
        .tabs {
            display: flex;
            justify-content: space-around;
            background: #eee;
            border-radius:5px;
            cursor: pointer;
        }
        .tabs div {
            width: 50%;
            text-align: center;
            padding: 10px;
            font-weight: bold;
        }
        .tabs .active {
            background:  #2A1B49;;
            color: white;
        }
        .form {
            display: none;
            padding: 20px 10px;
        }
        .form.active {
            display: block;
        }
        input {
            padding: 7px;
            margin: 5px 0;
            width: 100%;
        }
        .blue { color:blue; }
        .login-btn {
            margin: 15px 0;
            padding: 10px;
            width: 100%;
            border-radius: 10px;
            border: none;
            background: #2A1B49;;
            color: white;
            font-size: 16px;
        }
        .login-btn:hover {
            box-shadow: 0 5px 10px rgba(0,0,0,0.2);
        }
        .or {
            display:flex;
            flex-direction: row;
            margin-top: 10px;
            margin-bottom: 20px;
        }
        .or::before, .or::after {
            content: "";
            flex: 1;
            border-bottom: 1px solid gray;
        }
        .or::before { margin-right: 10px; }
        .or::after { margin-left: 10px; }
        .facebook, .google {
                    margin-top: 10px;
                    padding: 10px;
                    width: 100%;
                    border-radius: 5px;
                    font-size: 14px;
                    position: relative;
                    text-align: center;
                }
                .facebook {
                    background: #60a3fa;
                    color: rgb(255, 255, 255);
                    border: 1 px solid  #60a3fa;
                }
                .google {
                    background: white;
                    border: 1px solid black;
                    color: #555;
                }
                .facebook i, .google i {
                    position: absolute;
                    left: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                }
                #text
                {
                    color:white;
                    text-align: center;
                    font-size: 1.2rem;
                }
    </style>
</head>

<h1>CAMPUS 360</h1>

<div class="tab-container">

    <div class="tabs">
        <div class="tab active" onclick="switchTab('login')">Login</div>
        <div class="tab" onclick="switchTab('signup')">Signup</div>
    </div>

    <!-- LOGIN FORM -->
    <div class="form active" id="login">
        <form action="loginnew" method="post">

            <input type="email" name="email" placeholder="Email" required>
            <input type="password" name="password" placeholder="Password" required>
             <input type="text" name="role" placeholder="role" >
            <button class="login-btn">Login</button>
        </form>

        <p style="text-align:center">Don't have an account?
            <span class="blue" onclick="switchTab('signup')" style="cursor:pointer">Signup</span>
        </p>

        <div class="or">Or</div>
        <button class="facebook"><i class="fa-brands fa-facebook"></i> Login with Facebook</button>
        <button class="google"><i class="fa-brands fa-google"></i> Login with Google</button>
    </div>

    <!-- SIGNUP FORM -->
    <div class="form" id="signup">
        <form action="registerdetail" method="post">
         <input type="text" name="name" placeholder="name" >
            <input type="email" name="email" placeholder="Email" required>
            <input type="password" name="password" placeholder="Password" required>
            <input type="password" name="confirm" placeholder="Confirm Password" required>
             <input type="text" name="role" placeholder="role" >
            <button class="login-btn">Signup</button>
        </form>

        <p style="text-align:center">Already have an account?
            <span class="blue" onclick="switchTab('login')" style="cursor:pointer">Login</span>
        </p>

        <div class="or">Or</div>
        <button class="facebook"><i class="fa-brands fa-facebook"></i> Signup with Facebook</button>
        <button class="google"><i class="fa-brands fa-google"></i> Signup with Google</button>
    </div>

</div>

<script>
function switchTab(tab) {
    document.querySelectorAll('.form').forEach(f => f.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

    document.getElementById(tab).classList.add('active');
    document.querySelector(`.tab:nth-child(${tab === 'login' ? 1 : 2})`).classList.add('active');
}
</script>

</body>
</html>
