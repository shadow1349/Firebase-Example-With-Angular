import { IModel } from "./model";

export interface INote extends IModel {
  Note: string;
  /**
   * ID of the user who created the document
   */
  Author: string;
}
