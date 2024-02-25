import { classNames } from '@/shared/libs/utils/classNames/classNames';
import cls from './Block.module.scss';
import { memo } from 'react';

interface IBlockProps {
  title?: string
  text?: string
  className?: string
  children?: React.ReactNode
}

export const Block = memo((props: IBlockProps): JSX.Element => {
  const {
    text = '',
    title = '',
    children,
    className
  } = props;
  return (
    <div
      className={classNames(cls.block ?? '', {}, [className])}
    >
      {title && <h2>{title}</h2>}
      {text && <p className={cls.text}>{text}</p>}
      {children}
    </div>
  );
});
