import express from 'express';
import { insertAdminController, updateAdmin } from '../controllers/controller_admin.js';
import { Admin } from '../db/entities/Admin.js';
import { login, deleteAdmin } from '../controllers/controller_admin.js';
import { Adminauthentication } from '../middleware/admin_authentication.js';

const route = express.Router();


route.post('/signup', async (req, res) => {
    try {
        const { userName, email, password, type } = req.body;
        if (type !== 'admin') {

            res.status(400).send({ error: "You are not admin." });
        }
        if (!userName || !email || !password) {
            res.status(400).send({ error: "All fields are required." });
        }
        const existingAdmin = await Admin.findOne({ where: { email: req.body.email } });
        if (existingAdmin) {
            res.status(400).send({ error: "Admin already exists." });
        }
        await insertAdminController(req.body);
        res.status(201).send('Admin successfully')

    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error')
    }
})


// route.post("/login", async (req, res) => {
//     try {
//         const email = req.body.email;
//         const password = req.body.password;
//         if (email && password) {
//             const log = await login(email, password)
//             res.status(200).send(log)
//         } else {
//             res.status(404).send("Email and Password are required")
//         }
//     } catch (error) {
//         throw "something went wrong"
//     }
// })
route.post("/login", (req, res) => {
    if (req.body.email && req.body.password) {
        login(req.body.email, req.body.password).then((data) => {
            res.send(data?.token)
        }).catch((error) => {
            res.status(400).send(error)
        })
    } else {
        res.status(404).send("email and password are required")
    }
})

route.put('/update/:id', Adminauthentication, async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const admin = await updateAdmin(id, req.body);
        if (admin) {
            res.status(201).send('admin Updated');
        } else {
            res.status(404).send('admin not found!');
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
            res.status(404).send('Admin not found');
        } else {
            await deleteAdmin(email);
            res.status(200).send('Admin deleted successfully');
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete the product' });
    }
});


route.get('/admins', (req, res) => {
    console.log('list of admins')
    res.status(200).send('list of admins returned successfully');
})


export default route;