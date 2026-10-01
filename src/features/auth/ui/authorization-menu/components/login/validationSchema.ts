import * as yup from 'yup';
export const loginSchema = yup.object({
  loginOrEmail: yup.string().required('Введите логин или email').min(2, 'Минимум 2 символа'),
  password: yup.string().required('Введите пароль').min(1, 'Введите пароль'),
});
export type LoginFormData = yup.InferType<typeof loginSchema>;
