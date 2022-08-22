import style from './Header.module.css';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  return <header className={style.header}>
    <NavLink to='/' className={`${style.headerLink} ${style.headerLogo}`}>RSlang</NavLink>
    <nav className={style.headerNav}>
      <ul className={style.headerList}>
        <NavLink
            to='/'
            className={({isActive}) => (isActive ? `${style.headerLink} ${style.active}` : style.headerLink)}
        >
          Главная
        </NavLink>
        <NavLink
            to='/textbook'
            className={({isActive}) => (isActive ? `${style.headerLink} ${style.active}` : style.headerLink)}
        >
          Учебник
        </NavLink>
        <NavLink
            to='/games'
            className={({isActive}) => (isActive ? `${style.headerLink} ${style.active}` : style.headerLink)}
        >
          Игры
        </NavLink>
        <NavLink
            to='/statistics'
            className={({isActive}) => (isActive ? `${style.headerLink} ${style.active}` : style.headerLink)}
        >
          Статистика
        </NavLink>
      </ul>
    </nav>
  </header>
}
