#                              Applying JWT Token 
#                              ==================

* Previous Project "06_Image_Upload" To be coutinue......

* Ab hum apne '06_Image_Upload' project ko continue rkte
  hue es project mai new functionality add krenge:

* Es project mai hum Node Mailer ko apply krenge. Iska use
  karke hum mail send krenge jaise signup ke baad or login
  ke baad mail jana chyiae hmre G-Mail par.

================================================================================

1. Lekin hmara ye project bhi filhal yhi "06_Image_Upload" project hai 
   mtlb same hai kyuki humne copy kiya hai bas naam hi toh folder ka 
   change kr diya hai usse project thodi naa change ho jayega.

  Agr hum apne es project mai koi change krke ise deploy krenge toh ye 
  GITHUB pr same es '06_Image_Upload' waali repo mai push ho jayega.

  Lekin hum aisa nhi chahte hume ise alg se push krna hai.

* Toh iske liye sbse pehle hume es project mai se '.git' folder ko hatana 
  pdega kyuki abhi .git folder same hai, es project k liye hume new .git 
  folder banana hai toh pehle old waale ko remove krna padega.

  Toh uski command hai:

Command:
--------

=> rm -rf .git

=> git status

fatal: not a git repository (or any of the parent directories): .git

* Toh ab .git folder hat gaya hai yaani ab ye git repo nhi hai toh hum 
  ab ise starting se ek new git repo banayenge.

<------------------------------------------------------------------------------>

* Ab hum apne es project ki git repo banayenge:

Commands:
---------

=> git init

=> git status

================================================================================

2. Lekin hume apne es project ke liye new DB chyiae toh uske liye ab hum
   kya krenge:

   .env file mai jayenge.

=> .env  // Or isme last mai ye name ('07_Node_Mailer') add kr 
            denge.

# URL of Local MongoDB Server
MONGODB_URL_LOCAL = mongodb://localhost:27017/07_Node_Mailer

================================================================================

#                                 Node Mailer:
                                ================

3. ✅ Best Mailer for Node.js (2025) :

🥇 Nodemailer
-------------

👉 Why Nodemailer?

. Node.js ka de-facto standard
. Simple
. Gmail, Outlook, Yahoo, SMTP sab support
. 99% companies me use hota hai

🧠 Overall Flow
---------------
User Signup/Login
        ↓
Backend Event
        ↓
Nodemailer
        ↓
SMTP (Gmail)
        ↓
User Inbox 📧

-------------------------------------------------------------------------------

* Steps of applying Nodemailer:

1️⃣ Install Nodemailer
---------------------
=> npm install nodemailer

-------------------------------------------------------------------------------

2️⃣ Gmail Setup (IMPORTANT ⚠️)
----------------------------

(Recommended)

✔ Use App Password

Steps:

1. Google Account → Security
2. Enable 2-Step Verification
3. Create App Password
4. Copy 16-digit password

📌 Normal Gmail password mat use karna


🔐 Gmail App Password kya hota hai? (1 line me)
-----------------------------------------------
👉 App Password = Gmail ka special password jo sirf Node app ke liye hota hai
👉 Tumhara real Gmail password kabhi share nahi hota.

🧭 Step-by-Step (Exact Process)
-------------------------------

✅ Step 1: Google Account open karo:
====================================
Browser me jao (link): myaccount.google.com

✅ Step 2: Security section:
============================
Left side menu → Security & sign-in -> How you sign in to Google

✅ Step 3: 2-Step Verification ON karo (MANDATORY):
===================================================
. Click 2-Step Verification
. Apna Gmail password daalo
. Phone OTP / Google Prompt enable karo
. Toh ye dono pehle se enable hai
. Fir 2-Step Verification pr click karor ise ON kardo.

👉 Jab tak 2-step ON nahi hoga, App Password option dikhega hi nahi

✅ Step 4: App Password create karo
===================================

Security page pe hi neeche jao:

👉 App passwords pe click karo

. Agar directly nahi dikhe, search box me type karo:

=> App passwords
=> Fir G-Mail password enter karo
=> For Phone par varification code aayega use click kro.
=> Toh ab 'App passwords' ka page open ho jaeyga.

=> App Name enter krna hai: 07_Node_mailer 
=> Create 
=> Hume ye 16-digit password milega: 'ezan xxui mgbm jqvi'

* Fir es password ko use karne k liye ye kch intructions hume show krega:

How to use it
-------------
Go to the settings for your Google Account in the application or device 
you are trying to set up. Replace your password with the 16-character 
password shown above. Just like your normal password, this app password 
grants complete access to your Google Account. You won't need to remember
it, so don't write it down or share it with anyone.. 

✅ Step 5: Password COPY kar lo (IMPORTANT)
===========================================

16-digit password: 'ezan xxui mgbm jqvi'

⚠️ Ye password dobara kabhi nahi dikhega

✔ Copy
✔ Paste in .env

(Spaces hata dena)
------------------

.env file code:
---------------
EMAIL_PASS = ezanxxuimgbmjqvi

-------------------------------------------------------------------------------

3️⃣ Create mailer.js (BEST PRACTICE)

📁 Root ya utils/ folder me

* Ab mail mailer.js file banayenge or usme suggest kiya hua code copy-paste
  kar denge.

-------------------------------------------------------------------------------

4️⃣ .env File (SECURITY 🔐)

EMAIL_USER = ishanyadav1008@gmail.com
EMAIL_PASS = ezanxxuimgbmjqvi

👉 server.js me:

require('dotenv').config();  // Ye alreday hai

-------------------------------------------------------------------------------

5️⃣ Signup ke baad Email bhejna 📩

userRoutes.js file code:
------------------------
const sendEmail = require('../mailer');


* Or es code ko signup route mai add kr denge:

// 📧 SEND EMAIL (non-blocking)
        sendEmail(
            savedUser.email,
            'Welcome to Our App 🎉',
            `
            <h2>Hello ${savedUser.name}</h2>
            <p>Your account has been created successfully.</p>
            <p><b>Username:</b> ${savedUser.username}</p>
            `
        ).catch(err => {
            console.log('Email error:', err.message);
        });
================================================================================

4. POSTMAN

=> 07_Node_Mailer => signup_with_mail => POST => http://localhost:3000/user/signup

=> BODY => raw => JSON =>

{
    "name"              : "Ishan Mailer",
    "age"               : 28,
    "mobile"            : "9898989898",
    "email"             : "ishanmailer@gmail.com",
    "address"           : "RRR, QQQ Street, GGG City",
    "username"          : "ishan",
    "password"          : "12345"
}

=> send

O/P:
----

{
    "response": {
        "name": "Ishan Mailer",
        "age": 28,
        "mobile": "9898989898",
        "email": "ishanmailer@gmail.com",
        "address": "RRR, QQQ Street, GGG City",
        "username": "ishan",
        "password": "$2b$10$jWwNdqdf7PE.DqGVhVNBROnZl1Sh0gccSCUtcwVJIZg5gmk81ZQp6",
        "photo": null,
        "_id": "695228d42e902d5d0f031425",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NTIyOGQ0MmU5MDJkNWQwZjAzMTQyNSIsInVzZXJuYW1lIjoiaXNoYW4iLCJpYXQiOjE3NjY5OTIwODR9.YNGYBT-hseFy1Km7K8cMc4X1PAKOAGgLJiXqSIaK2Kw",
    "message": "Signup successful"
}

* Or hum apne G-Mail account ko check krenge toh hume mail bhi show hoga.

================================================================================

***MOST_IMP***

Hume apne es app ko previous app ke countinuation mai hi bnaya hai or last
app mai humne multer use kiya tha or multer k liye data hume form-data se 
send karna hota hai kyuki hum waha se image upload karte hai.

Lekin yaha hum simply body mai data send kr rhe hai toh mailer toh work kr
rha hai lekin form-data naa use krne ki wajah se ye hume ek error throw kr
rha tha toh uske liye humne apni server.js file mai ek line add krdi jisse
ye issue solve ho gya.

Ab hum body se data send bhi krenge toh koi issue nhi aayega kyuki body se
hum image toh send kar nhi sakte isliye image waali field null rahegi or
baaki ka data send ho kr ad an response mil jayega.

server.js file code:
--------------------
app.use(bodyParser.urlencoded({ extended: true }));  // bs ye line add krdi.

================================================================================

5. Ab GITHUB pr jaa kr new repo create krenge:

Ab local git repo ko remote se kaise connect kare ??

jaise GitHub se kyuki hume hmara code ab online kahi par rakhna 
hai or uske liye GitHub ek free hoisting service provide krta 
hai code ko save or manage karne ke liye:
   
STEPS:
------
=> google => github => signin => email
                                 password

* Ab hum ek new repo banayenge:
-------------------------------

=> new repository => Repository name => 07_Node_Mailer.git 

=> public => create repository

Command:
--------
git remote add origin https://github.com/IshanYadav1008/07_Node_Mailer.git

* Ab hmri local repo, remote repo se connect ho chuki hai.

================================================================================

* Ab hum apni local repo ko push krenge:

Commands:
---------

=> git status

=> git add .

=> git commit -m "Applied Node mailer in app"

=> git push origin master