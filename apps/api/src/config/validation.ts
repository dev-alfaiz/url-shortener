import * as Joi from 'joi';

export default Joi.object({
    NODE_ENV: Joi.string()
        .valid(
            'development',
            'production',
            'test',
        )
        .required(),

    PORT: Joi.number()
        .port()
        .required(),

    DATABASE_HOST: Joi.string().required(),

    DATABASE_PORT: Joi.number()
        .port()
        .required(),

    DATABASE_USERNAME: Joi.string().required(),

    DATABASE_PASSWORD: Joi.string().required(),

    DATABASE_NAME: Joi.string().required(),

    JWT_SECRET: Joi.string().min(16).required(),

    JWT_EXPIRES_IN: Joi.string().required(),

    JWT_REFRESH_SECRET: Joi.string().min(16).required(),

    JWT_REFRESH_EXPIRES_IN: Joi.string().required(),
});