class RolesService {
  addRole(user) {
    let roles = [];

    if (user.role.admin_role) roles.push(user.role.admin_role);
    roles.push(user.role.user_role);

    return roles;
  }
}

export default new RolesService();
