// page.tsx
import { NextPage } from 'next';
import Link from 'next/link';
import styles from '../styles/Home.module.css'; // Assuming this is your CSS module

const Home: NextPage = () => {
  return (
    <div className={styles.main}>
      <h1>Welcome to AI Meal Planner</h1>
      <p>Create personalized meal plans tailored to your goals and dietary needs.</p>
      <Link href="/plan">
        <button>Start Planning</button>
      </Link>
    </div>
  );
};

export default Home;