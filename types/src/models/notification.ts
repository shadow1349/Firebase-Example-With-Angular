import { IModel } from "./model";

export interface INotification extends IModel {
  Title: string;
  Message: string;
  Read: boolean;
}
