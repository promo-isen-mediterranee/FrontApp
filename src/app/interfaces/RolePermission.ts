import { Permission } from "./Permission";

export interface RolePermission {
  id: number;
  label: string;
  permissions: Permission[];
}
