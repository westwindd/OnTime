export class Room {
  private id: string;
  private name: string;
  private capacity: number;
  private organizationId: string;

  constructor(id: string, name: string, capacity: number, organizationId: string) {
    this.id = id;
    this.name = name;
    this.capacity = capacity;
    this.organizationId = organizationId;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getCapacity(): number {
    return this.capacity;
  }

  public setCapacity(capacity: number): void {
    this.capacity = capacity;
  }

  public getOrganizationId(): string {
    return this.organizationId;
  }

  public setOrganizationId(organizationId: string): void {
    this.organizationId = organizationId;
  }

  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      capacity: this.capacity,
      organizationId: this.organizationId,
    };
  }
}
