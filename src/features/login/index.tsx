import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setAuthToken } from '@/lib/http';
import axiosInstance from '@/api/axiosInstance';
import { ROUTES } from '@/constants/routes';
import { useLogin } from './hooks/useLogin';
import { LoginForm } from './components/LoginForm';
import type { ILoginFormValues } from './utils';

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate, isPending, isError } = useLogin();

  const handleSubmit = (values: ILoginFormValues) => {
    mutate(values, {
      onSuccess: (response) => {
        setAuthToken(axiosInstance, response.data.token);
        navigate(ROUTES.dashboard, { replace: true });
      },
    });
  };

  return (
    <div className="mx-auto max-w-md pt-12">
      <div className="rounded-lg border bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-semibold text-gray-900">
          {t('login.title')}
        </h1>
        {isError && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700" role="alert">
            {t('login.error')}
          </div>
        )}
        <LoginForm onSubmit={handleSubmit} isPending={isPending} />
      </div>
    </div>
  );
}
