import { useTranslation } from 'react-i18next';
import { PIIMaskedDisplay } from '@/components/bfsi';
import type { IUserProfileData } from '../types';

interface UserProfileCardProps {
  profile: IUserProfileData;
}

export function UserProfileCard({ profile }: UserProfileCardProps) {
  const { t } = useTranslation();

  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">{t('userProfile.title')}</h2>
      </div>

      <div className="divide-y">
        <ProfileField label={t('userProfile.fullName')} value={profile.fullName} />

        <div className="flex items-center justify-between px-6 py-4">
          <span className="text-sm font-medium text-gray-500">{t('userProfile.email')}</span>
          <PIIMaskedDisplay value={profile.email} type="email" />
        </div>

        <div className="flex items-center justify-between px-6 py-4">
          <span className="text-sm font-medium text-gray-500">{t('userProfile.phone')}</span>
          <PIIMaskedDisplay value={profile.phone} type="mobile" />
        </div>

        <div className="flex items-center justify-between px-6 py-4">
          <span className="text-sm font-medium text-gray-500">{t('userProfile.pan')}</span>
          <PIIMaskedDisplay value={profile.pan} type="pan" />
        </div>

        <div className="flex items-center justify-between px-6 py-4">
          <span className="text-sm font-medium text-gray-500">{t('userProfile.aadhaar')}</span>
          <PIIMaskedDisplay value={profile.aadhaar} type="aadhaar" />
        </div>
      </div>
    </div>
  );
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <span className="text-sm text-gray-900">{value}</span>
    </div>
  );
}
