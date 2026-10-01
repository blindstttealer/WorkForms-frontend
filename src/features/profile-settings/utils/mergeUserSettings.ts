import type { SaveSettingsDto } from '@/api/generated/model/saveSettingsDto';
import type { UserSettingsResponse } from '@/api/generated/model/userSettingsResponse';
import { SettingsNotificationsDtoNotificationStyle } from '@/api/generated/model/settingsNotificationsDtoNotificationStyle';
const defaultProfileSettings: SaveSettingsDto = {
  profile: {
    name: '',
    jobTitle: '',
    experience: '0-1',
    location: 'Moscow',
    skills: [],
    bio: '',
    photo: '',
  },
  jobPreferences: {
    jobType: [],
    workLocation: 'remote',
    salaryMin: '',
    salaryMax: '',
    industries: [],
    willingToRelocate: false,
  },
  notifications: {
    alerts: {
      jobMatches: false,
      applicationUpdates: false,
      interviewReminders: false,
      formsInsights: false,
    },
    notificationStyle: SettingsNotificationsDtoNotificationStyle.both,
  },
  privacy: {
    showSalaryExpectations: false,
    showContactInfo: false,
    allowRecruiterMessages: false,
  },
  account: {
    email: '',
    language: 'ru',
  },
};
export function mergeBaseAndInputSettings(
  base: SaveSettingsDto,
  patch: Partial<SaveSettingsDto> | undefined,
): SaveSettingsDto {
  if (!patch) return base;
  const profile = { ...base.profile, ...patch.profile };
  const jobPreferences = { ...base.jobPreferences, ...patch.jobPreferences };
  return {
    profile: {
      ...profile,
      skills: [...profile.skills],
    },
    jobPreferences: {
      ...jobPreferences,
      jobType: [...jobPreferences.jobType],
      industries: [...jobPreferences.industries],
    },
    notifications: {
      ...base.notifications,
      ...patch.notifications,
      alerts: {
        ...base.notifications.alerts,
        ...patch.notifications?.alerts,
      },
    },
    privacy: {
      ...base.privacy,
      ...patch.privacy,
    },
    account: {
      ...base.account,
      ...patch.account,
    },
  };
}
export function toFormDefaults(data: UserSettingsResponse | undefined): SaveSettingsDto {
  if (!data) {
    return structuredClone(defaultProfileSettings);
  }
  return mergeBaseAndInputSettings(defaultProfileSettings, data);
}
