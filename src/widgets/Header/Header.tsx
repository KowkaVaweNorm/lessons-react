import cls from './Header.module.scss';
import { classNames } from '@/shared/libs/utils/classNames/classNames';
import { memo } from 'react';
import { Link } from 'react-router-dom';

interface IHeaderProps {
  className?: string
}

export const Header = memo((props: IHeaderProps): JSX.Element => {
  const {
    className
  } = props;
  return (
    <div
      className={classNames(cls.header ?? '', {}, [className])}
    >
      <ul className={cls.list}>
        <li className={cls.list_item}>
          <Link to={'/'} className={cls.list_item_link}>Главная</Link>
        </li>
        <li>
          <Link to={'/setState'} className={cls.list_item_link}>setState</Link>
        </li>
        <li>
          <Link to={'/design-patterns'} className={cls.list_item_link}>Design Patterns</Link>
        </li>
      </ul>
    </div>
  );
});
