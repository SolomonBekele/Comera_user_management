import Joi from "joi";
import i18n from "../i18n/langConfig.js"; // import your i18n config

export const createBookDTO = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": i18n.__("BOOK.VALIDATION.TITLE_REQUIRED"),
  }),
  author: Joi.string().required().messages({
    "string.empty": i18n.__("BOOK.VALIDATION.TITLE_REQUIRED"),
  }),
  // author: Joi.array().items(Joi.string()).min(1).required().messages({
  //   "array.base": i18n.__("BOOK.VALIDATION.AUTHOR_ARRAY"),
  //   "array.min": i18n.__("BOOK.VALIDATION.AUTHOR_MIN"),
  // }),
  isbn: Joi.string().required().messages({
    "string.empty": i18n.__("BOOK.VALIDATION.ISBN_REQUIRED"),
  }),
  publicationDate: Joi.date().iso().required().messages({
    "date.base": i18n.__("BOOK.VALIDATION.PUBLICATIONDATE_INVALID"),
    "any.required": i18n.__("BOOK.VALIDATION.PUBLICATIONDATE_REQUIRED"),
  }),
  publisher: Joi.string().required().messages({
    "string.empty": i18n.__("BOOK.VALIDATION.PUBLISHER_REQUIRED"),
  }),
  genre: Joi.string().required().messages({
    "string.empty": i18n.__("BOOK.VALIDATION.GENRE_REQUIRED"),
  }),
  language: Joi.string().valid("en", "am", "ar").required().messages({
    "any.only": i18n.__("BOOK.VALIDATION.LANGUAGE_INVALID"),
    "string.empty": i18n.__("BOOK.VALIDATION.LANGUAGE_REQUIRED"),
  }),
});
