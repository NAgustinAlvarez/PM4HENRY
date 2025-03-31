// import { Injectable } from '@nestjs/common';
// // import { User } from './user.interface';

// @Injectable()
// export class UsersRepository {
//   users = [
//     {
//       id: 1,
//       email: 'john.doe@example.com',
//       name: 'John Doe',
//       password: 'password123',
//     },
//     {
//       id: 2,
//       email: 'jane.smith@example.com',
//       name: 'Jane Smith',
//       password: 'securePass456',
//     },
//     {
//       id: 3,
//       email: 'michael.johnson@example.com',
//       name: 'Michael Johnson',
//       password: 'mikePass789',
//     },
//     {
//       id: 4,
//       email: 'emily.davis@example.com',
//       name: 'Emily Davis',
//       password: 'emilySecret321',
//     },
//     {
//       id: 5,
//       email: 'david.brown@example.com',
//       name: 'David Brown',
//       password: 'daveBrown987',
//     },
//     {
//       id: 6,
//       email: 'sophia.miller@example.com',
//       name: 'Sophia Miller',
//       password: 'sophiaPass654',
//     },
//     {
//       id: 7,
//       email: 'william.wilson@example.com',
//       name: 'William Wilson',
//       password: 'willSecure111',
//     },
//     {
//       id: 8,
//       email: 'olivia.moore@example.com',
//       name: 'Olivia Moore',
//       password: 'oliviaSafe222',
//     },
//     {
//       id: 9,
//       email: 'james.taylor@example.com',
//       name: 'James Taylor',
//       password: 'jamesPass333',
//     },
//     {
//       id: 10,
//       email: 'isabella.anderson@example.com',
//       name: 'Isabella Anderson',
//       password: 'bellaSecure444',
//     },
//   ];

//   // async getUsers(page: number, limit: number) {
//   //   const definedPage = page;
//   //   const definedLimit = limit;
//   //   const startIndex = (definedPage - 1) * definedLimit;
//   //   const endIndex = startIndex + definedLimit;
//   //   const paginatedUsers = this.users.slice(startIndex, endIndex);
//   //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   //   const withoutPassword = paginatedUsers.map(({ password, ...user }) => user);
//   //   return withoutPassword;
//   // }
//   // getById(id: number) {
//   //   return this.users.find((user) => user.id === id);
//   // }
//   // createUser(user: Omit<User, 'id'>): User {
//   //   const id = this.users.length + 1;
//   //   this.users = [...this.users, { id, ...user }];
//   //   return { id, ...user };
//   // }
//   // modifiedUser(id: number, user: Partial<User>) {
//   //   let modified = this.users.find((u) => id === u.id);
//   //   const index = this.users.findIndex((u) => id === u.id);
//   //   if (modified) {
//   //     modified = { ...modified, ...user };
//   //     this.users[index] = modified;
//   //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   //     const { password, ...withoutPassword } = modified;
//   //     return withoutPassword;
//   //   }
//   //   return null;
//   // }
//   // deleteUser(id: number) {
//   //   const index = this.users.findIndex((u) => u.id === id);
//   //   const deleted = this.users[index];
//   //   if (index != -1) {
//   //     this.users.splice(index, 1);
//   //   }
//   //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   //   const { password, ...userDeleted } = deleted;
//   //   return { message: 'el usuario ha sido eliminado', userDeleted };
//   // }

//   loginUser(email: string, password: string) {
//     const loginRequest = this.users.find((u) => u.email == email);
//     if (loginRequest && loginRequest?.password == password) {
//       return `inició sesión como ${loginRequest.name}`;
//     } else {
//       return {
//         message: 'Email o password incorrectos',
//         user: loginRequest?.email,
//       };
//     }
//   }
// }
