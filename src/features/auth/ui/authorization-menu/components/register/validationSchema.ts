import * as yup from 'yup';
export const registerSchema = yup.object({
  login: yup
    .string()
    .required('Введите имя пользователя')
    .min(2, 'Минимум 2 символа')
    .max(20, 'Максимум 20 символов')
    .matches(/^[a-zA-Z0-9_]+$/, 'Только латинские буквы, цифры и подчеркивание'),
  email: yup.string().required('Введите email').email('Введите корректный email'),
  password: yup
    .string()
    .required('Введите пароль')
    .min(6, 'Минимум 6 символов')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Пароль должен содержать хотя бы одну заглавную букву, одну строчную букву и одну цифру',
    ),
});
export type RegisterFormData = yup.InferType<typeof registerSchema>;
