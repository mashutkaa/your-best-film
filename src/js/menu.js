const Menu = () => {
    menuWrapper = document.querySelector(".header");
    menuWrapper.innerHTML = `
            <a href="index.html" class="logo">
          <h1 class="main-title">YBF</h1>
          <p class="secondary-text">our best film</p></a
        >

        <nav id="my-navigation">
          <ul class="menu-items">
            <li class="menu-item"><a href="#" data-modal> Пошук </a></li>
            <li class="menu-item" onclick="goToHomePage()"><a href="index.html"> Головна </a></li>
            <li class="menu-item"><a href="#about-us"> Про нас </a></li>
            <li class="menu-item-login"><a href="#"> Увійти / Зареєструватися </a></li>
            <li class="menu-item-personal-account">
              <button class="dropbutton" >
                <img src="icons/IMG_3948 1.png" alt="user-icon" class="user-icon">
                <p class="username">username</p>
                <span>▼</span>
              </button>
              <div class="dropdown">
                <a href="#" onclick="showMessage()" class="dropdown-link">Налаштування акаунту</a>
                <a href="#" onclick="showMessage()" class="dropdown-link">Збережені фільми</a>
                <a href="#" onclick="showMessage()" class="dropdown-link">Збережені добірки</a>
                <a href="#" onclick="logOut()" class="dropdown-link">Вихід з акаунту</a>
              </div>
            </li>
         
          </ul>
        </nav>
    `;
};

export default Menu;
