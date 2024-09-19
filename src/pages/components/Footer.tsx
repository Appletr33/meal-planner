import styles from '../../styles/components/Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} AI Meal Planner</p>
    </footer>
  );
};

export default Footer;