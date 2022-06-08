/**
 * Say hello to {name}
 * @param {string} name Person name.
 * @return {string}
 */
export const sayHello = (name: string): string => {
    return 'Hello '.concat(name);
};

export * from 'class-transformer';
export * from './fetch';
export * from './compare';
export * from './transformers/index';
