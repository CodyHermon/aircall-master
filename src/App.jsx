import { useState, useEffect } from 'react';
import activityService from './services/activities';
import Activity from './components/Activity';
import Header from './components/Header';
import { Tabs, TabPanels, TabPanel, Button } from '@chakra-ui/react';

import styles from './app.module.css';

function App() {
  const [activities, setActivities] = useState(null);

  const getActivities = async () => {
    const response = await activityService.getAllActivities();
    setActivities(response);
  };

  useEffect(() => {
    getActivities();
  }, []);

  if (!activities) {
    return null;
  }

  const toggleArchiveActivity = async (id) => {
    const activity = activities.find((activity) => activity.id === id);
    await activityService.archiveCall(id, {
      ...activity,
      is_archived: !activity.is_archived,
    });
    const updatedActivities = await activityService.getAllActivities();
    setActivities(updatedActivities);
  };

  const activitiesToShow = activities.filter(
    (activity) => !activity.is_archived && activity.from !== undefined
  );

  const archivedActivities = activities.filter(
    (activity) => activity.is_archived
  );

  const archiveAllCalls = async () => {
    await Promise.all(
      activitiesToShow.map(async (activity) => {
        if (!activity.is_archived) {
          await activityService.archiveCall(activity.id, {
            ...activity,
            is_archived: true,
          });
        }
      })
    );

    const updatedActivities = await activityService.getAllActivities();
    setActivities(updatedActivities);
  };

  const unarchiveAllCalls = async () => {
    await activityService.resetAllCalls();

    const updatedActivities = await activityService.getAllActivities();
    setActivities(updatedActivities);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Tabs className={styles.tabs} variant='enclosed'>
          <Header />
          <TabPanels className={styles.tabPanels}>
            <TabPanel className={styles.tabPanel} p='20px' pb='100px'>
              <Button
                onClick={archiveAllCalls}
                variant='outline'
                colorScheme='red'
              >
                Archive all calls
              </Button>
              {activitiesToShow.map((activity) => (
                <Activity
                  key={activity.id}
                  activity={activity}
                  archiveActivity={() => toggleArchiveActivity(activity.id)}
                  isArchived={activity.is_archived}
                />
              ))}
            </TabPanel>
            <TabPanel className={styles.tabPanel} p='20px' pb='100px'>
              <Button
                onClick={unarchiveAllCalls}
                variant='outline'
                colorScheme='red'
              >
                Unarchive all calls
              </Button>
              {archivedActivities.map((activity) => (
                <Activity
                  key={activity.id}
                  activity={activity}
                  archiveActivity={() => toggleArchiveActivity(activity.id)}
                  isArchived={activity.is_archived}
                />
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
