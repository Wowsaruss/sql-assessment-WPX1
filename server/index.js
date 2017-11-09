require('dotenv').config();
const cors = require('cors')
, express = require('express')
, bodyParser = require('body-parser')
, massive = require('massive');
const app = express();
const port  =  3000;

const ctrl = require('./ctrl/ctrl');

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('build'));

massive(process.env.CONNECTION_STRING)
.then( db => {
    app.set('db', db)
    db.init_tables.user_create_seed().then( response => {
        console.log('User table init');
        db.init_tables.vehicle_create_seed().then( response => {
          console.log('Vehicle table init');
        })
    })
})

// GET
app.get('/api/users', ctrl.getUsers);
app.get('/api/vehicles', ctrl.getVehicles);
app.get('/api/user/:userId/vehiclecount', ctrl.countVehicles);
app.get('/api/user/:userId/vehicle', ctrl.getVihiclesByUserId);
app.get('/api/vehicle', ctrl.getVehicleByQuery);
app.get('/api/newervehiclesbyyear', ctrl.vehiclesByYear);
// POST
app.post('/api/users', ctrl.addUser);
app.post('/api/vehicles', ctrl.addVehicle);
// PUT
app.put('/api/vehicle/:vehicleId/user/:userId', ctrl.changeVehicleOwner);
// DELETE
app.delete('/api/user/:userId/vehicle/:vehicleId', ctrl.removeOwnershipOfVehicle);
app.delete('/api/vehicle/:vehicleId', ctrl.deleteVehicle);

app.listen(port, () => console.log(`listening on port ${port}`));