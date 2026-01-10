declare module "#auth-utils" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface User extends JimUser {}

  interface UserSession {
    user?: User;
  }
}

export {};
