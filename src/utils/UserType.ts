export interface UserType {
    id: number;
    name: string;
    email: string;
    phno: string;
}

export const users: UserType[] = [
  { id: 1, name: 'Alex', email: 'alex@gmail.com', phno: '234575' },
  { id: 2, name: 'Bob', email: 'bob@gmail.com', phno: '921002' },
  { id: 3, name: 'Maya', email: 'maya@gmail.com', phno: '292838' },
  { id: 4, name: 'Dani', email: 'dani@gmail.com', phno: '938292' },
  { id: 5, name: 'Svoka', email: 'svoka@gmail.com', phno: '382329' },
];
