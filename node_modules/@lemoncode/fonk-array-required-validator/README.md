# fonk-array-required-validator

[![CircleCI](https://badgen.net/github/status/Lemoncode/fonk-array-required-validator/master?icon=circleci&label=circleci)](https://circleci.com/gh/Lemoncode/fonk-array-required-validator/tree/master)
[![NPM Version](https://badgen.net/npm/v/@lemoncode/fonk-array-required-validator?icon=npm&label=npm)](https://www.npmjs.com/package/@lemoncode/fonk-array-required-validator)
[![bundle-size](https://badgen.net/bundlephobia/min/@lemoncode/fonk-array-required-validator)](https://bundlephobia.com/result?p=@lemoncode/fonk-array-required-validator)

This is a [fonk](https://github.com/Lemoncode/fonk) microlibrary that brings validation capabilities to:

- Validate if an array field of a form has items

How to install it:

```bash
npm install @lemoncode/fonk-array-required-validator --save
```

How to add it to an existing form validation schema:

We have the following form model:

```
const myFormValues = {
  product : 'shoes',
  price: 20,
  sizes: [36, 38, 41]
}
```

We can add a arrayRequired validation to the myFormValues

```javascript
import { arrayRequired } from '@lemoncode/fonk-array-required-validator';

const validationSchema = {
  field: {
    sizes: [arrayRequired.validator],
  },
};
```

We must specify the minimum number (1 by default) and optionally the maximum number of items allowed:

```javascript
import { arrayRequired } from '@lemoncode/fonk-array-required-validator';
const validationSchema = {
  field: {
    sizes: [
      {
        validator: arrayRequired.validator,
        customArgs: { minLength: 1, maxLength: 10 },
      },
    ],
  },
};
```

You can customize the error message displayed in two ways:

- Globally, replace the default error message in all validationSchemas (e.g. porting to spanish):

```javascript
import { arrayRequired } from '@lemoncode/fonk-array-required-validator';

arrayRequired.setErrorMessage('El campo debe de ser una lista');
```

- Locally just override the error message for this validationSchema:

```javascript
import { arrayRequired } from '@lemoncode/fonk-array-required-validator';

const validationSchema = {
  field: {
    price: [
      {
        validator: arrayRequired.validator,
        message: 'Error message only updated for the validation schema',
      },
    ],
  },
};
```

Please, refer to [fonk](https://github.com/Lemoncode/fonk) to know more.

## License

[MIT](./LICENSE)

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
