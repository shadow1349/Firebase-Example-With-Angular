import { IModel } from "./model";

export interface IUser extends IModel {
  FirstName: string;
  LastName: string;
  Email: string;
  EmailVerified: boolean;
  Disabled: boolean;
  NumNotes: number;
  ProfilePhoto?: string;
  FCMToken?: string;
}
