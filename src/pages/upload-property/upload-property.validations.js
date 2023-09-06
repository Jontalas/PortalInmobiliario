import { Validators, createFormValidation } from '@lemoncode/fonk';
import { isUrl } from '@lemoncode/fonk-is-url-validator';
const validationSchema = {
  field: {
    title: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
    ],
    notes: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
    ],
    email: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
      {
        validator: Validators.email,
        message: 'Email no válido',
      },
    ],
    phone: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
      {
        validator: Validators.pattern,
        customArgs: { pattern: '^[1-9][0-9]{8}$' },
        message: 'Teléfono no válido',
      },
    ],
    price: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
      {
        validator: Validators.pattern,
        customArgs: { pattern: '^[1-9][0-9]*(.[0-9]{1,2})?$' },
        message: 'Precio no válido',
      },
    ],
    saleTypes: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
    ],
    address: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
    ],
    city: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
    ],
    province: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
    ],
    squareMeter: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
      {
        validator: Validators.pattern,
        customArgs: { pattern: '^[1-9][0-9]*$' },
        message: 'Superficie no válida',
      },
    ],
    rooms: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
      {
        validator: Validators.pattern,
        customArgs: { pattern: '^[1-9][0-9]*$' },
        message: 'Cantidad no válida',
      },
    ],
    bathrooms: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
      {
        validator: Validators.pattern,
        customArgs: { pattern: '^[1-9][0-9]*$' },
        message: 'Cantidad no válida',
      },
    ],
    locationUrl: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
      {
        validator: isUrl.validator,
        message: 'URL no válida',
      },
    ],
    mainFeatures: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
    ],
  },
};
export const formValidation = createFormValidation(validationSchema);
