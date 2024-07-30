export interface InitialValues {
  title: string;
  status: string;
  priority: string;
  deadline: Date | null;
  description: string;
}

export interface UserRegisterData {
  name: string;
  email: string;
  password: string;
  cpassword: string;
}

export interface APIError {
  status: number;
  data: {
    error: Array<{
      type: string;
      msg: string;
      path?: string;
      location?: string;
    }>;
  };
}
