import Joi from "joi";
import i18n from "../i18n/langConfig.js"; 

export const createUserDTO = Joi.object({
  first_name: Joi.string().required().messages({
    "string.empty": i18n.__("USER.VALIDATION.FIRST_NAME_REQUIRED"),
  }),
  last_name: Joi.string().required().messages({
    "string.empty": i18n.__("USER.VALIDATION.LAST_NAME_REQUIRED"),
  }),
  email: Joi.string().email().required().messages({
    "string.empty": i18n.__("USER.VALIDATION.EMAIL_REQUIRED"),
    "string.email": i18n.__("USER.VALIDATION.EMAIL_INVALID"),
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": i18n.__("USER.VALIDATION.PASSWORD_REQUIRED"),
    "string.min": i18n.__("USER.VALIDATION.PASSWORD_MIN"),
  }),
  role: Joi.string()
    .valid("user", "librarian", "USER", "LIBRARIAN")
    .required()
    .messages({
      "any.only": i18n.__("USER.VALIDATION.ROLE_INVALID"),
      "string.empty": i18n.__("USER.VALIDATION.ROLE_REQUIRED"),
    }),
  language: Joi.string()
    .valid("am", "en", "ar")
    .required()
    .messages({
      "any.only": i18n.__("USER.VALIDATION.LANGUAGE_INVALID"),
      "string.empty": i18n.__("USER.VALIDATION.LANGUAGE_REQUIRED"),
    }),
});

export const loginUserDTO = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": i18n.__("USER.VALIDATION.EMAIL_REQUIRED"),
    "string.email": i18n.__("USER.VALIDATION.EMAIL_INVALID"),
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": i18n.__("USER.VALIDATION.PASSWORD_REQUIRED"),
    "string.min": i18n.__("USER.VALIDATION.PASSWORD_MIN"),
  }),
});
export const userUpdateDto   = Joi.object({
  first_name: Joi.string().required().messages({
    "string.empty": i18n.__("USER.VALIDATION.FIRST_NAME_REQUIRED"),
  }),
  last_name: Joi.string().required().messages({
    "string.empty": i18n.__("USER.VALIDATION.LAST_NAME_REQUIRED"),
  })
})
export const changePasswordDto = Joi.object({
  oldPassword: Joi.string().required().messages({
    "string.empty": i18n.__("USER.VALIDATION.OLD_PASSWORD_REQUIRED"),
  }),
  newPassword: Joi.string()
    .required()
    .invalid(Joi.ref("oldPassword")) 
    .messages({
      "string.empty": i18n.__("USER.VALIDATION.NEW_PASSWORD_REQUIRED"),
      "any.invalid": i18n.__("USER.VALIDATION.NEW_PASSWORD_NOT_SAME"), // add this to your i18n
    }),
});
export const changeLibrarianStatusDto = Joi.object({
  status: Joi.string().required().messages({
    "string.empty": i18n.__("USER.VALIDATION.LIBRARIAN_STATUS_REQUIRED"),
  }),
});


