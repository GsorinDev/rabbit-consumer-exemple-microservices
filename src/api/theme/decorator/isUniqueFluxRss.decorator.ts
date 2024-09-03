import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsUniqueFluxRss(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isUniqueFluxRss',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any[], args: ValidationArguments) {
          if (!Array.isArray(value)) return false;

          const nameSet = new Set();
          const urlSet = new Set();

          for (const item of value) {
            if (nameSet.has(item.source_name) || urlSet.has(item.url)) {
              return false;
            }
            nameSet.add(item.source_name);
            urlSet.add(item.url);
          }

          return true;
        },

        defaultMessage(args: ValidationArguments) {
          return `flux_rss_list contains duplicate names or URLs.`;
        },
      },
    });
  };
}
