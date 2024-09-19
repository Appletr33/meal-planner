import Link from 'next/link';
import styles from '../../styles/components/Navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/">Home</Link>
      <Link href="/plan">Plan Your Meal</Link>
    </nav>
  );
};

export default Navbar;