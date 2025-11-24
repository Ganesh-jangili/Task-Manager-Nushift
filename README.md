# User & Task Management Backend (Node.js + Express + MongoDB)

This backend project provides:
- User Profile Management
- Automatic Profile Completion Percentage
- Task Management (CRUD)
- MongoDB Database using Mongoose
- Password hashing using bcrypt
- Clean Express Generator structure

All routing logic is written directly inside route files (`routes/users.js` and `routes/tasks.js`), and profile completion is automatically calculated using Mongoose hooks.

---

# Tech Stack

- **Node.js**
- **Express.js** (Generated using express-generator)
- **MongoDB** (Mongoose ODM)
- **bcrypt** (Password hashing)
---



---
..............................................................................
#  Database Models

##  User Model  
(Location: `models/User.js`)  
Fields: :contentReference[oaicite:0]{index=0}

- name *(required)*
- email *(required, unique)*
- password *(hash stored using bcrypt)*
- bio
- address
- pincode
- state
- country
- phone
- profileCompletion *(auto-calculated)*
.....................................................................................
###  Profile Completion Logic  
Defined in: `models/profilecompletion.js`  
Referenced from: `User.js` pre-save & post-update hooks

Fields considered: name, email, password, bio, address, pincode, state, country, phone  
:contentReference[oaicite:1]{index=1}

Formula:profileCompletion = (filled_fields / total_fields) * 100



Hooks:
- `pre('save')` → calculates completion on creation  
- `post('findOneAndUpdate')` → recalculates completion on update  

---
.................................................................................
##  Task Model
(Location: `models/Task.js`) :contentReference[oaicite:2]{index=2}

Fields:
- title *(required)*
- description
- status: `pending | in-progress | completed` *(default: pending)*
- userId *(reference to User)*  
- timestamps

---

#  Database Connection
Defined in `app.js`:  
(MongoDB name: `NushiftTaskDB`)  
:contentReference[oaicite:3]{index=3}

```js
mongoose.connect('mongodb://localhost:27017/NushiftTaskDB')

.....................................................................

USER APIs ENDPOINTS
POST   /users/createUser
GET    /users/:id
PATCH  /users/updateUser/:id
GET    /users/ProfileCompletion/:id

TASK APIs ENDPOINTS
POST   /tasks/createTask
GET    /tasks/getTasks/:userId
GET    /tasks/getTask/:taskId
PATCH  /tasks/updateTask/:taskId
DELETE /tasks/deleteTask/:taskId
...............................................................
# Testing (Postman / Thunder Client)
Recommended Sequence:

POST /users/createUser
→ Copy generated _id

POST /tasks/createTask
→ Use the copied userId

GET /tasks/getTasks/<userId>

PATCH /tasks/updateTask/<taskId>

GET /users/ProfileCompletion/<userId>
...........................................................
