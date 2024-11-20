# 📚 Projeto de Reserva de Salas

Bem-vindo ao meu projeto de reserva de salas! Este aplicativo permite gerenciar usuários, salas e reservas de forma eficiente. Utilizei conceitos fundamentais de **Programação Orientada a Objetos (POO)** em TypeScript para criar uma estrutura robusta e escalável.

## 📝 Índice

- [Introdução](#introdução)
- [Conceitos de POO Utilizados](#conceitos-de-poo-utilizados)
  - [1. Classes e Objetos](#1-classes-e-objetos)
    - [Classes Utilizadas e Suas Finalidades](#classes-utilizadas-e-suas-finalidades)
  - [2. Hierarquia](#2-hierarquia)
    - [Exemplos de Hierarquia no Código](#exemplos-de-hierarquia-no-código)
  - [3. Encapsulamento](#3-encapsulamento)
  - [4. Polimorfismo](#4-polimorfismo)
  - [5. Injeção de Dependência](#5-injeção-de-dependência)
  - [6. Singleton](#6-singleton)
- [Justificativa para o Uso de Classes](#justificativa-para-o-uso-de-classes)
- [Classificação dos Componentes](#classificação-dos-componentes)
- [Conclusão](#conclusão)

## Introdução

Desenvolvi este projeto para facilitar a gestão de reservas de salas em uma organização. Utilizei TypeScript com Node.js e Express para criar uma API RESTful que permite operações CRUD em usuários, salas e reservas.

## Conceitos de POO Utilizados

### 1. **Classes e Objetos**

As **classes** são a base da POO e as utilizei para representar as entidades principais do sistema. Cada classe encapsula dados e comportamentos relacionados à entidade que representa.

#### **Classes Utilizadas e Suas Finalidades:**

1. **Classe \`Person\`:** Uma classe base que representa uma pessoa, contendo atributos comuns como \`id\` e \`name\`.

   **Exemplo:**

   ```
   export class Person {
     public id: string;
     public name: string;

     constructor(id: string, name: string) {
       this.id = id;
       this.name = name;
     }
   }
   ```

2. **Classe \`User\` (herda de \`Person\`):** Representa os usuários do sistema. Armazena informações como \`email\`, \`password\`, \`role\` e \`teamId\`.

   **Por que usei esta classe?**

   - **Especialização:** Extende \`Person\` adicionando atributos específicos de um usuário.
   - **Organização de Dados:** Agrupa propriedades relacionadas a um usuário em um único objeto.

   **Exemplo:**

  ```
   import { Person } from './Person';

   export class User extends Person {
     public email: string;
     public password: string;
     public role: string;
     public teamId: string | null;

     constructor(
       id: string,
       name: string,
       email: string,
       password: string,
       role: string = 'user',
       teamId: string | null = null
     ) {
       super(id, name);
       this.email = email;
       this.password = password;
       this.role = role;
       this.teamId = teamId;
     }
   }
   ```

3. **Classe \`TimeSlot\`:** Representa um intervalo de tempo com \`startTime\` e \`endTime\`, e métodos para manipulação de tempo.

   **Exemplo:**

```
   export class TimeSlot {
     public startTime: Date;
     public endTime: Date;

     constructor(startTime: Date, endTime: Date) {
       this.startTime = startTime;
       this.endTime = endTime;
     }

     public getDurationInMinutes(): number {
       const durationMs = this.endTime.getTime() - this.startTime.getTime();
       return durationMs / (1000 * 60);
     }

     public overlapsWith(other: TimeSlot): boolean {
       return this.startTime < other.endTime && this.endTime > other.startTime;
     }
   }
```
4. **Classe \`Booking\` (herda de \`TimeSlot\`):** Representa as reservas realizadas pelos usuários. Armazena detalhes como \`id\`, \`roomId\`, \`userId\`, além dos atributos herdados de \`TimeSlot\`.

   **Por que usei esta classe?**

   - **Reutilização de Lógica:** Herda métodos de manipulação de tempo de \`TimeSlot\`.
   - **Gerenciar Reservas:** Facilita operações como criação, modificação e verificação de conflitos de reservas.

   **Exemplo:**

```
   import { TimeSlot } from './TimeSlot';

   export class Booking extends TimeSlot {
     public id: string;
     public roomId: string;
     public userId: string;

     constructor(
       id: string,
       roomId: string,
       userId: string,
       startTime: Date,
       endTime: Date
     ) {
       super(startTime, endTime);
       this.id = id;
       this.roomId = roomId;
       this.userId = userId;
     }


   }
   ```

5. **Classe \`Resource\`:** Uma classe base que representa um recurso, contendo atributos como \`id\` e \`name\`.

   **Exemplo:**

```
   export class Resource {
     public id: string;
     public name: string;

     constructor(id: string, name: string) {
       this.id = id;
       this.name = name;
     }
   }
   ```

6. **Classe \`Room\` (herda de \`Resource\`):** Representa as salas disponíveis para reserva. Contém informações como \`capacity\` e \`organizationId\`.

   **Por que usei esta classe?**

   - **Especialização:** Extende \`Resource\` adicionando atributos específicos de uma sala.
   - **Facilitar a Gestão de Salas:** Centraliza informações sobre uma sala.

   **Exemplo:**

```
   import { Resource } from './Resource';

   export class Room extends Resource {
     public capacity: number;
     public organizationId: string;

     constructor(
       id: string,
       name: string,
       capacity: number,
       organizationId: string
     ) {
       super(id, name);
       this.capacity = capacity;
       this.organizationId = organizationId;
     }
   }
```
### 2. **Hierarquia**

A hierarquia em POO permite criar relacionamentos de herança entre classes, promovendo reutilização de código e organização.

#### **Exemplos de Hierarquia no Código:**

- **\`Person\` > \`User\`:** \`User\` herda de \`Person\`, compartilhando atributos comuns e adicionando especificidades.

- **\`TimeSlot\` > \`Booking\`:** \`Booking\` herda de \`TimeSlot\`, reutilizando métodos de manipulação de tempo.

- **\`Resource\` > \`Room\`:** \`Room\` herdam de \`Resource\`, compartilhando atributos comuns e adicionando suas próprias características.

**Por que utilizei estas hierarquias?**

- **Reuso de Código:** Evita duplicação de código, permitindo que subclasses herdem atributos e métodos de superclasses.
- **Organização Lógica:** Estrutura o código de forma que reflita as relações do mundo real entre entidades.
- **Extensibilidade:** Facilita a adição de novas classes que compartilham características comuns.

### 3. **Encapsulamento**

Protegi os dados internos das classes usando modificadores de acesso como \`private\` e \`public\`. Isso impede o acesso direto aos atributos, permitindo controle sobre como eles são modificados e garantindo a integridade dos dados.

**Exemplo na classe \`Room\`:**

```
export class Room extends Resource {
  private capacity: number;
  private organizationId: string;

  constructor(
    id: string,
    name: string,
    capacity: number,
    organizationId: string
  ) {
    super(id, name);
    this.capacity = capacity;
    this.organizationId = organizationId;
  }

  public getCapacity(): number {
    return this.capacity;
  }

  public setCapacity(newCapacity: number): void {
    this.capacity = newCapacity;
  }

  // Outros getters e setters
}
```

### 4. **Injeção de Dependência**

Desacoplei as classes utilizando a injeção de dependência, permitindo que as dependências sejam fornecidas de fora da classe, em vez de serem criadas internamente.

**Exemplo no \`BookingController\`:**

```
import { Request, Response } from 'express';
import { BookingRepository } from '../repositories/BookingRepository';

export class BookingController {
  private bookingRepository: BookingRepository;

  constructor(bookingRepository: BookingRepository) {
    this.bookingRepository = bookingRepository;
  }

  public createBooking(req: Request, res: Response): void {
    // Uso do this.bookingRepository
  }
}
```

### 5. **Singleton**

Implementei os repositórios como **Singletons** para garantir que haja apenas uma instância de cada repositório em toda a aplicação, mantendo a consistência dos dados.

**Exemplo:**

```
// src/repositories/index.ts
import { UserRepository } from './UserRepository';
import { RoomRepository } from './RoomRepository';
import { BookingRepository } from './BookingRepository';

export const userRepository = new UserRepository();
export const roomRepository = new RoomRepository();
export const bookingRepository = new BookingRepository();
```
## Justificativa para o Uso de Classes

Optei por usar classes porque:

- **Modelagem de Entidades Reais:** As classes permitem representar entidades do mundo real de forma organizada.
- **Encapsulamento de Dados e Comportamentos:** Classes encapsulam atributos e métodos relacionados, promovendo coesão.
- **Reutilização e Extensibilidade:** Através de herança e composição, é possível reutilizar código e estender funcionalidades.
- **Clareza e Manutenibilidade:** O uso de classes torna o código mais legível e mais fácil de manter.

## Classificação dos Componentes

- **Modelos (Models):** Representam as entidades do domínio (\`Person\`, \`User\`, \`Resource\`, \`Room\`, \`TimeSlot\`, \`Booking\`).
- **Interfaces:** Definem contratos para os modelos e repositórios.
- **Repositórios (Repositories):** Gerenciam o armazenamento e a recuperação dos dados.
- **Controladores (Controllers):** Lidam com as requisições HTTP e a lógica de negócio.
- **Rotas (Routes):** Mapeiam endpoints para os controladores correspondentes.
