import { useTranslate } from '@tolgee/react';
import Button from 'components/Button/Button';
import useNotificationsContext from './context/notificationsContext';
import NotificationListItem from './NotificationListItem';

type NotificationsDropdownProps = {
  closeDropdown: () => void;
};

const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({ closeDropdown }) => {
  const { notifications, pageNumber, changePageNumber, isLoading, hasMore, markSeenSuccess } =
    useNotificationsContext();
  const t = useTranslate();
  return (
    <div className='w-[300px] p-3'>
      <ul className='max-h-96 overflow-auto'>
        {notifications.length === 0 && <p className='p-3'>{t('notifications.noNotifications')}</p>}
        {notifications.map((notification) => (
          <NotificationListItem
            markSeenSuccess={markSeenSuccess}
            key={notification._id}
            onClickItem={closeDropdown}
            notification={notification}
          />
        ))}
      </ul>
      <Button
        tooltip={!hasMore ? t('notifications.noMoreNotifications') : undefined}
        disabled={isLoading || !hasMore}
        className='w-full mt-4'
        onClick={() => changePageNumber(pageNumber + 1)}
      >
        {t('labels.showMore')}
      </Button>
    </div>
  );
};

export default NotificationsDropdown;
