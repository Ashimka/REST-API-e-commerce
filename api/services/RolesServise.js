class RolesService {
  addRole(role) {
    const roles = Object.values(role).slice(-3).filter(Number);

    return roles;
  }
}

export default new RolesService();
