export interface BaseResult {
  success: boolean;
  message: string;
}

export interface ErrorResult {
  success: boolean;
  message: string;
  errors: Array[any];
  [key: string]: any;
}
