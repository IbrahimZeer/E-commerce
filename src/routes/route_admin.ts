import express from 'express';
import { getAdmins, insertAdminController, updateAdmin } from '../controllers/controller_admin.js';
import { Admin } from '../db/entities/Admin.js';
import { login, deleteAdmin } from '../controllers/controller_admin.js';
import { Adminauthentication } from '../middleware/admin_authentication.js';

const route = express.Router();


route.post('/signup', async (req, res) => {
    try {
        const { userName, email, password, type } = req.body;
        if (type !== 'admin') {
            res.status(400).json({ error: "You are not admin." });
        }
        if (!userName || !email || !password) {
            res.status(400).json({ error: "All fields are required." });
        }

        const existingAdmin = await Admin.findOne({ where: { email: req.body.email } });
        const existinguserName = await Admin.findOne({ where: { userName: req.body.userName } });
        if (existingAdmin) {
            console.log('from route')
            res.status(400).json({ error: "Admin already exists." });
        } else {
            if (!existinguserName) {
                await insertAdminController(req.body);
                res.status(201).json('Admin successfully')
            } else {
                res.status(400).json({ error: "User Name already exists." });
            }
        }


    } catch (error) {
        console.log(error)
        res.status(500).json('Internal server error')
    }
})

route.post("/login", (req, res) => {
    if (req.body.email && req.body.password) {
        login(req.body.email, req.body.password).then((data) => {
            res.json(data?.token)
        }).catch((error) => {
            res.status(400).json(error)
        })
    } else {
        res.status(404).json("email and password are required")
    }
})

route.put('/update', Adminauthentication, async (req, res) => {
    try {
        const email = req.body.email;
        const admin = await updateAdmin(email, req.body);
        if (admin) {
            res.status(201).json('admin Updated');
        } else {
            res.status(404).json('admin not found!');
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update the admin' });
    }
})

route.delete('/delete', Adminauthentication, async (req, res) => {
    try {
        const email = req.body.email;
        const admin = await Admin.findOne({ where: { email: email } })
        if (!admin) {
            res.status(404).json('Admin not found');
        } else {
            await deleteAdmin(email);
            res.status(200).json('Admin deleted successfully');
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete the product' });
    }
});

route.get('/admins', (req, res) => {
    getAdmins()
        .then(admin => {
            res.status(200).json(admin)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})


export default route;