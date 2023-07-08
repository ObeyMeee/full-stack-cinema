export interface User {
  id: string;
  status: string;
  created: string;
  activated: string;
  statusChanged: string;
  lastLogin: string | null;
  lastUpdated: string;
  passwordChanged: string | null;
  type: {
    id: string;
  };
  profile: {
    firstName: string;
    lastName: string;
    mobilePhone: string;
    secondEmail: string | null;
    login: string;
    email: string;
  };
  credentials: {
    emails: {
      value: string;
      status: string;
      type: string;
    }[];
    provider: {
      type: string;
      name: string;
    };
  };
}
