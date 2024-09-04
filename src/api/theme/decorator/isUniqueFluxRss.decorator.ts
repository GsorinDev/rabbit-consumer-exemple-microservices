import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsUniqueFluxRss(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isUniqueFluxRss',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any[]) {
          // Ensure the value is an array
          if (!Array.isArray(value)) return false;

          const nameSet = new Set();
          const urlSet = new Set();

          // Iterate over each item in the array
          for (const item of value) {
            // Check if the source_name or url is already in the respective sets
            if (nameSet.has(item.source_name) || urlSet.has(item.url)) {
              return false; // Duplicate found
            }
            // Add source_name and url to the sets
            nameSet.add(item.source_name);
            urlSet.add(item.url);
          }

          return true; // No duplicates found
        },

        defaultMessage() {
          return `The list contains duplicate 'source_name' or 'url' values.`;
        },
      },
    });
  };
}
