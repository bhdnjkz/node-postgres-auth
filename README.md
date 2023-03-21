# codeit-nodetrainee

Run application with `npm start`

Current checklist of features: 

| Feature               | Status |
|-----------------------|--------|
| Registration form     | 🟢      |
| Login form            | 🟡      |
| Automated DB creation | 🟢      |

**TBA**

 - Fix login system;
 - Rewrite project to follow M-V-C pattern;
 - Add ORM?;
 - Add better UI;
 - Add user schema;


 project
│   README.md
│   package.json
│   .env
│   app.js
│
└───config
│       db.js
│
└───controllers
│       authController.js
│
└───middleware
│       authentication.js
│
└───models
│       user.js
│
└───routes
│       authRoutes.js
│
└───views
│       login.ejs
│       register.ejs
│
└───public
        │───css
        │───js
        │───images