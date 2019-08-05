import uuidv1 from"uuid/v1";
class Users {
    static users = [];
    static findAll() {
        return this.users;
    };

    static findByEmail(email) {
        if(email == null) return null;
        return this.users.find(user => user.email.toLowerCase() === email.toLowerCase());
    }

    static update(userId, userUpdate) {
        const user = {...this.findById(userId), ...userUpdate};
        this.users = this.users.filter(usr => usr.id !== userId).push(user);
        return user;
    }

    static delete(userId) {
        this.users = this.users.filter(user => user.id !== userId);
        return userId;
    }

    static create(user) {
        user.id = uuidv1();
        this.users.push(user);
        return user.id;
    }

    static findById(userId) {
        if(userId == null) return null;
        return this.users.find(user => user.id === userId);
    }
}

export default Users;
