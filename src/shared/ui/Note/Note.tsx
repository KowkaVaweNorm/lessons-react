import { classNames } from '@/shared/libs/utils/classNames/classNames';
import cls from './Note.module.scss';
import { memo } from 'react';

export const Note = memo((
  { className, children }:
    { className?: string, children?: React.ReactNode }) => {
  return (
    <div className={
      classNames(cls.note, {}, [className])
    }>
      <div className={cls.icon}>i</div>
      {children}
    </div>
  );
});
