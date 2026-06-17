import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';

export function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-6xl font-bold text-gray-300">404</h1>
      <p className="text-lg text-gray-600">The page you are looking for does not exist.</p>
      <Link
        to={ROUTES.home}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
      >
        {t('common.back')}
      </Link>
    </div>
  );
}
