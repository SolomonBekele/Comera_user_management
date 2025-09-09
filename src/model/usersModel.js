class User {
  constructor(id, first_name,last_name, email, password, role,created_at) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name  
    this.email = email;
    this.password = password;
    this.role = role;
    this.created_at=created_at
  }
}

export default User;
