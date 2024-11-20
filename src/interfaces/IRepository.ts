export interface Repository<T> {
    add(item: T): void;
    findById(id: string): T | undefined;
    update(item: T): void;
    delete(id: string): boolean;
  }
  