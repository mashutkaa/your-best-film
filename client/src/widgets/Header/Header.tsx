import styles from './Header.module.scss';

import LogoImg from '@/shared/assets/images/Logo_YBF.png';

export const Header: React.FC = () => {
  return (
    <header className={styles.header__wrapper}>
        <img src={LogoImg} alt="Logo YourBestFilm project" className={styles.project_logo__img}/>
        <nav>
          <ul>
            <li><button>Пошук</button></li>
            <li><a href="#">Головна</a></li>
            <li><a href="#">Про нас</a></li>
            <li><a href="#">Вхід/Реєстрація</a></li>
          </ul>
        </nav>
    </header>
  );
};
