// src/utils/classes.js

// Base Class
class User {
  constructor(name) {
    this.name = name;
  }

  accessLevel() {
    return `${this.name} has basic access.`;
  }
}

// Subclass
class AdminUser extends User {
  constructor(name, permissionLevel) {
    super(name);
    this.permissionLevel = permissionLevel;
  }

  accessLevel() {
    return `${this.name} has ADMIN access with level ${this.permissionLevel}.`;
  }
}

export { User, AdminUser };
