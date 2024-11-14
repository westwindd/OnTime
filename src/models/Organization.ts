import { Room } from './Room';
import { Team } from './Team';

export class Organization {
  constructor(
    public id: string,
    public name: string,
    public rooms: Room[] = [],
    public teams: Team[] = []
  ) {}
}
