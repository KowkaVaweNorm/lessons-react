import { classNames } from '@/shared/libs/utils/classNames/classNames';
import cls from './Note.module.scss';
import { CSSProperties, memo } from 'react';

interface IProps {
  style?: CSSProperties
  className?: string
  children?: React.ReactNode
}

export const Note = memo((props: IProps) => {
  const {
    style,
    className, 
    children,
    ...otherProps  
  } = props
  return (
    <div style={style} className={
      classNames(cls.note, {}, [className])
    } {...otherProps}>
      <div className={cls.icon}>i</div>
      {children}
    </div>
  );
});
