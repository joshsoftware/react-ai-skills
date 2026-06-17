import { useTranslation } from 'react-i18next';
import { useUserProfile } from './hooks/useUserProfile';
import { UserProfileCard } from './components/UserProfileCard';

export default function UserProfilePage() {
  const { t } = useTranslation();
  // TODO: Replace with real userId from auth state
  const userId = 'current';
  const { data, isPending, isError } = useUserProfile(userId);

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">{t('common.loading')}</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-md bg-red-50 p-4 text-sm text-red-700" role="alert">
        {t('common.error')}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl pt-6">
      <UserProfileCard profile={data.data} />
    </div>
  );
}
