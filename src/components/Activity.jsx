import { useCallback, useEffect, useState } from 'react';
import activityService from '../services/activities';
import { IconButton } from '@chakra-ui/react';
import moment from 'moment';
import { FiPhoneIncoming, FiPhoneOutgoing } from 'react-icons/fi';
import { MdOutlineArchive, MdOutlineUnarchive } from 'react-icons/md';

import styles from './activity.module.css';

const Activity = ({ activity, archiveActivity, isArchived }) => {
  const [activityDetails, setActivityDetails] = useState(null);
  const [callType, setCallType] = useState('');

  const getActivityDetails = useCallback(async (id) => {
    activityService.getSpecificCallDetails(id).then((res) => {
      setActivityDetails(res);
    });
  }, []);

  const time = moment(activity.created_at).format('MM/DD, YYYY, HH:mm:ss');

  const iconColor =
    callType === 'Answered call'
      ? 'green'
      : callType === 'Voicemail'
      ? 'blue'
      : 'red';

  useEffect(() => {
    getActivityDetails(activity.id);
    if (activity.call_type === 'voicemail') {
      setCallType('Voicemail');
    } else if (activity.call_type === 'missed') {
      setCallType('Missed call');
    } else if (activity.call_type === 'answered') {
      setCallType('Answered call');
    }
  }, [activity, getActivityDetails]);

  if (!activityDetails) {
    return null;
  }

  console.log(activity);

  return (
    <div className={styles.container}>
      <div className={styles.details}>
        <div>
          {activity.direction === 'inbound' ? (
            <FiPhoneIncoming color={iconColor} size='2em' />
          ) : (
            <FiPhoneOutgoing color={iconColor} size='2em' />
          )}
        </div>
        <div>
          <p className={styles.type}>{callType}</p>
          <p className={styles.number}>{activityDetails.from}</p>
          <p className={styles.detail}>
            Tried to call on {activityDetails.via}
          </p>
          <p className={styles.detail}>{time}</p>
        </div>
      </div>
      <div className={styles.archive}>
        <IconButton
          className={styles.button}
          onClick={archiveActivity}
          colorScheme='green'
          fontSize='30px'
          icon={!isArchived ? <MdOutlineArchive /> : <MdOutlineUnarchive />}
        />
      </div>
    </div>
  );
};

export default Activity;
