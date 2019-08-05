import Users from "../db/users";
import logger from "morgan";

class usersController {
    static getUsers(req, res) {
        logger("list all users");
        return res.json({
            users: Users.findAll()
        });
    }

    static createUser(req, res) {
        const {firstName, lastName, email, password} = req.body;
        const newUser = {
            firstName,
            lastName,
            email,
            password
        };
        if (Users.findByEmail(email)) {
            return res.status(422).json({});
        }
        return res.status(201).json({id: Users.create(newUser)});
    }

    static getUserById(req, res) {
        const {id} = req.params;
        let user = Users.findById(id);
        if (user) {
            return res.status(200).json(user);
        } else {
            res.status(404).json({});
        }
    }

    static updateUser(req, res) {
        const {id} = req.params;
        const {firstName, lastName, password} = req.body;
        const user = Users.findById(id);
        if (user) {
            if (user.id !== id) {
                return res.status(401).json();
            } else if (Users.update(id, {firstName, lastName, password})) {
                return res.status(200).json();
            }
        } else {
            res.status(422).json({});
        }
    }

  static deleteUser(req, res) {
    const {id} = req.params;
    const user = Users.findById(id);
    if (user) {
      if (user.id !== id) {
        return res.status(401).json();
      } else if (Users.delete(id)) {
        return res.status(200).json();
      }
    } else {
      res.status(422).json({});
    }
  }

    static login(req, res) {
        const {email, password} = req.body;
        const user = Users.findByEmail(email);
        if (user && user.password === password) {
            return res.status(200).json({id: user.id});
        } else {
            return res.status(401).json({});
        }
    }
}

export default usersController;
