import { Role } from "./Role";

export interface Alert  {
  id: number;
  role: Role;
  set_on: Date;
  mail: string;
}
