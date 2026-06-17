import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { FormInput } from '@/components/common';
import { loginSchema, type ILoginFormValues, LOGIN_FORM_DEFAULT_VALUES } from '../utils';

interface LoginFormProps {
  onSubmit: (values: ILoginFormValues) => void;
  isPending: boolean;
}

export function LoginForm({ onSubmit, isPending }: LoginFormProps) {
  const { t } = useTranslation();
  const form = useForm<ILoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: LOGIN_FORM_DEFAULT_VALUES,
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-4">
      <FormInput
        control={form.control}
        name="username"
        label={t('login.username')}
        placeholder={t('login.username')}
        isRequired
      />
      <FormInput
        control={form.control}
        name="password"
        label={t('login.password')}
        placeholder={t('login.password')}
        isSensitive
        isRequired
      />
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? t('common.loading') : t('login.submit')}
      </button>
    </form>
  );
}
