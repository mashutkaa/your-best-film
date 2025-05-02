import styles from './Footer.module.scss';

import logoStarLight from "@src/shared/assets/images/Logo_StarLight.png";
import logoGitHub from "@src/shared/assets/icons/contact_github.svg";
import logoTelegram from "@src/shared/assets/icons/contact_tg.svg";
import logoGmail from "@src/shared/assets/icons/contact_gmail.svg";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer__wrapper}>
        <div className={styles.footer__content}>
          <div className={styles.footer_links__container}>
            <div className={styles.menu__container}>
              <nav>
                <ul>
                  <li><button>Знайти фільм</button></li>
                  <li><a href="#">Головна</a></li>
                  <li><a href="#">Про нас</a></li>
                </ul>
              </nav>
              <div className={styles.legal_links__container}>
                <a href="#">Політика конфіденційності</a>
                <a href="#">Умови надання послуг</a>
              </div>
            </div>
            <address>
              <a className={styles.gmail} href="#"><img src={logoGitHub} alt="Посилання на GitHub репозиторій" /></a>
              <a className={styles.telegram} href="#"><img src={logoTelegram} alt="Напишіть у нашого бота в Telegram для допомоги та підтримки" /></a>
              <a className={styles.telegram} href="#"><img src={logoGmail} alt="Зв'яжіться з нами через Gmail для отримання підтримки" /></a>
            </address>
          </div>
          <img className={styles.star_light__logo} src={logoStarLight} alt="StarLight team logo" />
        </div>
      
        <hr />

        <p className={styles.copyright}>© 2024–2025 YourBestFilm by StarLight. Усі права захищено.</p>

    </footer>
  );
};
