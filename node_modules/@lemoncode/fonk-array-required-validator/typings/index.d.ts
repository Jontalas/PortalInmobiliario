import { FieldValidationFunctionSync } from '@lemoncode/fonk';

export namespace arrayRequired {
  export interface CustomValidatorArgs {
    minLength?: number;
    maxLength?: number;
  }

  export const validator: FieldValidationFunctionSync<CustomValidatorArgs>;
  export function setErrorMessage(message: string | string[]): void;
}
