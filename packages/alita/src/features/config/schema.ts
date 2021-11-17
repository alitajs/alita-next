import type { Root } from '@umijs/core/compiled/@hapi/joi';

export function getSchemas(): Record<string, (Joi: Root) => any> {
  return {
    displayIcon: (Joi) => Joi.string(),
    displayName: (Joi) => Joi.string(),
    packageId: (Joi) => Joi.string(),
    complexRoute: (Joi) => Joi.boolean(),
    retainLog: (Joi) => Joi.boolean(),
  };
}
