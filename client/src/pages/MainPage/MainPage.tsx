import { BestFilms } from '@/widgets/BestFilms/BestFilms';

import styles from './MainPage.module.scss';

export const MainPage: React.FC = () => {
  return (
    <>
        <BestFilms/>
        <div>
          <h1>Що подивитися сьогодні?</h1>
          <button>Знайти фільм</button>
        </div>
    </>
  );
};
