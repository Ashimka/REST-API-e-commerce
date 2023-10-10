import ApiError from "../error/apiError.js";

const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) {
      return res.status(401).json({ message: "Не авторизован" });
    }

    const rolesArrey = [...allowedRoles];

    let role = [];

    if (req.roles.admin_role) role.push(req.roles.admin_role);
    role.push(req.roles.user_role);

    const result = role
      .map((role) => rolesArrey.includes(role))
      .find((value) => value === true);

    if (!result) {
      return res.status(401).json({ message: "Нет доступа" });
    }
    next();
  };
};
export default verifyRoles;
