export type User = {
  id?: any;
  name: string;
  email: string;
  password: string;
  image: string;
  role: "Admin" | "inventory" | "sales";
};

export const users : User[] = [
  {
    name: "Dr/ Mina Emad",
    email: "minaemad@gmail.com",
    password: "password",
    image: '/images/users/user-1.jpg',
    role: "Admin",
  },
  {
    name: "Inventory Manager",
    email: "inventory@gmail.com",
    password: "inventory123",
    image: '/images/users/user-2.jpg',
    role: "inventory",
  },
  {
    name: "Sales Person",
    email: "sales@gmail.com",
    password: "sales123",
    image: '/images/users/user-3.jpg',
    role: "sales",
  },
];

export const UserRoles = [
  {
    id: "1A5A84FB-23C3-4F9B-A122-4C5BC6C5CB2D",
    name: "Inventory Manager",
  },
  {
    id: "E48E5A9F-2074-4DE9-A849-5C69FDD45E4E",
    name: "Pharmacy",
  },
  {
    id: "8C2F4F3A-7F6D-4DB8-8B02-4A04D31F35D6",
    name: "Admin",
  }
]


export const getUserByEmail = (email: string) => {
  return users.find((user) => user.email === email);
};
