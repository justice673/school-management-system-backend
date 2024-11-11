const Joi = require('joi');

const validateForm = (req, res, next) => {
    const schema = Joi.object({
        first_name: Joi.string().min(3).max(10).required(),
        last_name: Joi.string().min(3).max(10).required(),
        username: Joi.string().min(3).max(10).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(20).required(),
        password_confirm: Joi.string().valid(Joi.ref('password')).required().messages({
            'any.only': 'Confirm password must match the password'
        })
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessage = error.details.map(detail => detail.message).join(', ');
        return res.status(400).json({ error: true, message: errorMessage });
    }

    next();
};

module.exports = { validateForm };
