import { classNames } from '@/shared/libs/utils/classNames/classNames';
import cls from './Quote.module.scss';
import { memo } from 'react';

interface IQuoteProps {
  text?: string
  author?: string
  className?: string
  children?: React.ReactNode
}

export const Quote = memo((props: IQuoteProps): JSX.Element => {
  const {
    author,
    text,
    className = '',
    children
  } = props;
  return (
    <blockquote className={classNames(cls.styled_quote, {}, [className])}>
      {text && <p>{text}</p>}
      <p>{children}</p>
      {author && <footer>{author}</footer>}
    </blockquote>
  );
});
