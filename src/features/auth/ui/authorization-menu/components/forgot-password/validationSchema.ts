import * as yup from 'yup';
export const forgotPasswordSchema = yup.object({
  loginOrEmail: yup.string().required('Введите логин или email').min(2, 'Минимум 2 символа'),
});
export type ForgotFormData = yup.InferType<typeof forgotPasswordSchema>;
