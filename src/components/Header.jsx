import Image from '../assets/header.svg';
import styles from './header.module.css';
import { TabList, Tab } from '@chakra-ui/react';

const Header = () => {
  return (
    <header className={styles.container}>
      <div className={styles.icon}>
        <div className={styles.imageContainer}>
          <img src={Image} className={styles.image} />
        </div>
      </div>
      <TabList className={styles.tabList}>
        <Tab className={styles.tab}>All calls</Tab>
        <Tab className={styles.tab}>Archived</Tab>
      </TabList>
    </header>
  );
};

export default Header;
