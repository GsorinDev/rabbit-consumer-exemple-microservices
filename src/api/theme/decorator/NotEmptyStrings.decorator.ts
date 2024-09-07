import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { Transform } from 'class-transformer';

// Décorateur de validation pour vérifier que chaque chaîne n'est pas vide
export function NotEmptyStrings(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'notEmptyStrings',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (Array.isArray(value)) {
            return value.every(
              (str) => typeof str === 'string' && str.trim() !== '',
            );
          }
          return false;
        },
      },
    });
  };
}
