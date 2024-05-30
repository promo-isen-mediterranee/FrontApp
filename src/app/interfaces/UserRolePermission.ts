import { RolePermission } from "./RolePermission";
import { User } from "./User";

export interface UserRolePermission {
  user: User;
  roles: RolePermission[]
}
