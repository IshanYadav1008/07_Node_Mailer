const express  = require ('express'); 
const router   = express.Router();
const passport = require('passport');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');

const User   = require('./../models/User'); 

const multer  = require('multer');
const storage = multer.memoryStorage();
const upload  = multer({storage: storage});

const sendEmail = require('../mailer');

// POST route to add a person
router.post('/signup', upload.single('photo'), async (req, res) => {

    try{

        // Create a student record with Base64-encoded image.

        const { name, age, mobile, email, address, username, password } = req.body;

        const photoBase64 = req.file ? req.file.buffer.toString('base64'): null;

        const newUser = new User({ name, age, mobile, email, address, username,
                                   password, photo: photoBase64 });

        const savedUser = await newUser.save();

        const payload = {
            id: savedUser.id,
            username: savedUser.username
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);

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

        console.log('User created successfully');
        res.status(200).json({response: savedUser, token: token,
                              message: 'Signup successful'});
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
})

// Using Passport middleware in this Login Route
router.post(
    '/login',
    passport.authenticate('local', { session: false }),
    (req, res) => {
        
        // req.user passport se aata hai
        const payload = {
        id: req.user._id,
        username: req.user.username
      };
  
      const token = generateToken(payload);

      res.json({
        message: 'Login successful',
        token: token
      });
    }
  );
  
// Find all users
router.get('', async (req, res) => {
    try{
        const data = await User.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
})

// Find user by it's id
router.get('/profile/:id', jwtAuthMiddleware, async (req, res) => {
    try{
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({user});
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Serson Error' })
    }
})

// Updating the user by id.
router.put('/:id', jwtAuthMiddleware, async (req, res) => {

    try{

        const userId         = req.params.id; 
        const updateUserData = req.body;      
        const updatedUser    = await User.findByIdAndUpdate(userId, updateUserData, {

            new: true,          
            runValidators: true

        })

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' })
        }

        console.log('User updated successfully');
        res.status(200).json(updatedUser); 
    }
    catch{

        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
})

// Updating the user data partially by using patch method.
router.patch('/:id', jwtAuthMiddleware, async (req, res) => {

    try{

        const userId         = req.params.id; 
        const updateUserData = req.body;      
        const updatedUser    = await User.findByIdAndUpdate(userId, updateUserData, {

            new: true,          
            runValidators: true

        })

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' })
        }

        console.log('User updated successfully');
        res.status(200).json(updatedUser); 
    }
    catch{

        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
})

// Delete user
router.delete('/:id', jwtAuthMiddleware, async (req, res) => {

    try{
        const userId   = req.params.id; 
        const response = await User.findByIdAndDelete(userId)

        if(!response) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log('user deleted');
        res.status(200).json({message: 'user deleted successfully'})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
})

module.exports = router;