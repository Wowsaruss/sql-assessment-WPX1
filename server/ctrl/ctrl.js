module.exports = {
    getUsers: (req, res) => {
        req.app.get('db').get_all_users().then(users => {
            res.status(200).send(users);
        }).catch((err) => {console.log(err)});
    },
    getVehicles: (req, res) => {
        req.app.get('db').get_all_vehicles().then(vehicles => {
            res.status(200).send(vehicles);
        }).catch((err) => {console.log(err)});
    },
    addUser: (req, res) => {
        req.app.get('db').add_user(req.body.name, req.body.email).then(user => {
            res.status(200).send(user);
        }).catch((err) => {console.log(err)});
    },
    addVehicle: (req, res) => {
        req.app.get('db').add_vehicle(req.body.make, req.body.model, req.body.year, req.body.owner_id).then(vehicle => {
            res.status(200).send(vehicle);
        }).catch((err) => {console.log(err)});
    },
    countVehicles: (req, res) => {
        req.app.get('db').count_vehicles(req.params.userId).then(num => {
            res.status(200).send(num);
        }).catch((err) => {console.log(err)});
    },
    getVihiclesByUserId: (req, res, next) => {
        req.app.get('db').vehicle_by_userid(req.params.userId).then(vehicle_id =>{
                res.status(200).send(vehicle_id);
        }).catch((err)=>{console.log(err)})
    },
    getVehicleByQuery: (req, res) => {
        const db = req.app.get("db");
        if (req.query.userEmail) {
          return db.email_by_vehicle(req.query.userEmail).then(result => {
            return res.json(result);
          });
        }
        if (req.query.userFirstStart) {
          return db
            .by_user_letter(req.query.userFirstStart + "%")
            .then(result => {
              return res.json(result);
            });
        }
    },
    vehiclesByYear: (req, res, next) => {
        const db = req.app.get('db');
        db.vehicles_by_year().then(result => {
            res.json(result);
        });
    },
    changeVehicleOwner: (req, res) => {
        const db = req.app.get('db');
        db.change_vehicle_owner([req.params.vehicleId, req.params.userId]).then(result => {
            res.json(result)
        });
    },
    removeOwnershipOfVehicle: (req, res) => {
        const db = req.app.get('db');
        db.remove_vehicle_owner([req.params.vehicleId]).then(result => {
            res.json(result);
        });
    },
    deleteVehicle: (req, res) => {
        const db = req.app.get('db');
        db.delete_vehicle([req.params.vehicleId]).then(vehicle => {
            res.status(200).json(vehicle);
        }).catch((err)=>{console.log(err)})
    }
};