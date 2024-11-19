export class User {
  public id: string;
  public name: string;
  public email: string;
  public password: string;
  public role: string;
  public teamId?: string;

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    role: string = 'user',
    teamId?: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.teamId = teamId;
  }
}
