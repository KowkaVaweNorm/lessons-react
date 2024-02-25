import { classNames } from '@/shared/libs/utils/classNames/classNames';
import cls from './Code.module.scss';
import { memo, useCallback } from 'react';
interface IProps {
  className?: string
  text: string
}

export const Code = memo((props: IProps): JSX.Element => {
  const {
    className,
    text
  } = props;
  
  return (
    <pre className={classNames(cls.code ?? '', {}, [className])}>
      <code>
        {text}
      </code>
    </pre>
  );
});