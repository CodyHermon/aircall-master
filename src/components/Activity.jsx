import { useCallback, useEffect, useState } from 'react';
import activityService from '../services/activities';
import { Button } from '@chakra-ui/react';
import styles from './activity.module.css';

const Activity = ({ activity, archiveActivity, isArchived }) => {
  const [activityDetails, setActivityDetails] = useState(null);

  const getActivityDetails = useCallback(async (id) => {
    activityService.getSpecificCallDetails(id).then((res) => {
      setActivityDetails(res);
    });
  }, []);

  useEffect(() => {
    getActivityDetails(activity.id);
  }, [activity, getActivityDetails]);

  if (!activityDetails) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div>
        <p>{activityDetails.from}</p>
        <p>Tried to call on {activityDetails.via}</p>
      </div>
      <Button onClick={archiveActivity} colorScheme='green'>
        {!isArchived ? 'Archive' : 'Unarchive'}
      </Button>
    </div>
  );
};

export default Activity;
