import { memo, useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import cls from './learnSetState.module.scss';
import { classNames } from '@/shared/libs/utils/classNames/classNames';
import { Block } from '@/shared/ui/Block/Block';
import { Note } from '@/shared/ui/Note/Note';
import { Code } from '@/shared/ui/Code/Code';
import { useConditionObjectIs } from '../../model/hooks/useConditionObjectIs/useConditionObjectIs';
import TodoList from '../TodoList/TodoList';
import { flushSync } from 'react-dom';
import { RenderCounter } from '@/shared/ui/RenderCounter/RenderCounter';
import { Quote } from '@/shared/ui/Quote/Quote';
interface IlearnSetStateProps {
  className?: string
}

const LearnSetState = memo((props: IlearnSetStateProps): JSX.Element => {
  const {
    className
  } = props;
  const [count, setCount] = useState(0)
  const countRef = useRef(count);

  useEffect(() => {
    countRef.current = count;
  }, [count])

  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  const [obj, noRenderFunction] = useConditionObjectIs();

  const bathingCalls =  useCallback(() => {
    setCount(prev => ++prev); // Синхронно и попадет в батчинг
    setCount(prev => ++prev); // Синхронно и попадет в батчинг
    const asyncFunc = async () => {
      await setTimeout(() => {
        setCount(prev => ++prev); // Асинхронно и не попадает в общий батчинг
        setCount(prev => ++prev); // Асинхронно и не попадает в общий батчинг 
        console.log('async log in batching');
        console.log('current count:', countRef.current);
      }, 1000)
    }
    asyncFunc()

    setCount(prev => ++prev); // Синхронно и попадет в батчинг
    setCount(prev => ++prev);// Синхронно и попадет в батчинг
  }, [])

  const [count2, setCount2]=  useState(0);
  const flushSyncBathingCalls =  useCallback(() => {
    flushSync(()=>{
      setCount2(prev => ++prev); // Синхронно и вызовет индивидуальный рендер
    })

    setCount2(prev => ++prev); // Синхронно и попадет в батчинг
    const asyncFunc = async () => {
      await setTimeout(() => {
        setCount2(prev => ++prev); // Асинхронно и не попадает в общий батчинг
        setCount2(prev => ++prev); // Асинхронно и не попадает в общий батчинг 
        console.log('async log in batching');
      }, 1000)
    }
    asyncFunc()

    setCount2(prev => ++prev); // Синхронно и попадет в батчинг
    setCount2(prev => ++prev);// Синхронно и попадет в батчинг
  }, [])

  return (
    <div className={
      classNames(cls.learnSetState, {}, [className])
    }>
      <div className="card">
      <RenderCounter />
        <Block
          className={cls.block}
          title='1. Вызов setState говорит реакту сделай когда нибудь при ближайшей возможности ререндер'
          >
            <p>
            Код сразу после setState работает с прежним значением, а не новым
          Выдержка из документации:
          <Quote author='Документация Реакт'>
            Функция set обновляет переменную состояния только для следующего рендера. 
            Если вы прочитаете переменную state после вызова функции set, вы получите старое значение, которое было на экране до вашего вызова. 
          </Quote> 
          
            </p>
            </Block>
        <Block
          className={cls.block}
          title='2. Проверка нового значения с помощью Object.is.'
          text='Если мы указали в setState новое значение 
          которое равно согласно Object.is старому то ререндера не будет. 
          Обратите внимание что ссылочные типы сравниваются по ссылке
          Выдержка из документации: "Если новое значение, которое вы предоставляете, идентично текущему состоянию, что определяется сравнением Object.is, 
          React пропустит повторный рендеринг компонента и его дочерних элементов. Это оптимизация. 
          Хотя в некоторых случаях React может потребоваться вызвать ваш компонент, прежде чем пропустить дочерние элементы, это не должно повлиять на ваш код."' />
        <Note className={cls.block}>
          <Code text=' // Примеры для ===
  console.log(NaN === NaN);    // false
  console.log(0 === -0);        // true
  console.log(null === undefined);  // true

  // Примеры для Object.is
  console.log(Object.is(NaN, NaN));    // true
  console.log(Object.is(0, -0));        // false
  console.log(Object.is(null, undefined));  // false'/>
        </Note>
        <Note className={cls.block}>
          <Code text=' 
          export const useConditionObjectIs = (newName?: string) => {
            const srcObj = {
              name: "source object",
            };
            const [obj, setObj] = useState(srcObj);
            const noRenderFunction = useCallback(() => {
              const newSrcObj = srcObj;
              newSrcObj.name = newName ?? "New name";
              console.log("Объекты одинаковые? ", Object.is(srcObj, newSrcObj));
          
              setObj(newSrcObj); // Здесь рендера не будет,
              // Но при следующем рендере, значение обновится
            }, []);
            return [obj, noRenderFunction];
          };
          
          const [obj, noRenderFunction] = useConditionObjectIs();
          ' />
        </Note>
        <button className={cls.button} onClick={noRenderFunction}>
          obj is  {JSON.stringify(obj)}
        </button> {'->'}
        <button className={cls.button} onClick={forceUpdate}>
          Rerender
        </button>
        <Block
          className={cls.block}
          title='3. Батчинг.'
          text='Если мы указали несколько setState то реакт попытается объеденить все синхронные изменения в один рендер.
          т.к. все setState генерируют задачу реакту "Сделай ререндер в ближайшее время, т.к. изменился стейт" 
          то если setState вызывается последовательно то реакт совершит минимальное количество рендеров для изменения состояния.   
          '/>
          <Note className={cls.block}>
            <Code text={` const bathingCalls = useCallback(() => {
    setCount(prev => ++prev); // Синхронно и попадет в общий батчинг
    setCount(prev => ++prev); // Синхронно и попадет в общий батчинг
    const asyncFunc = async () => {
      await setTimeout(() => {
        setCount(prev => ++prev); // Асинхронно и не попадает в общий батчинг
        setCount(prev => ++prev); // Но будет сбатчено с прошлым setCount
        console.log('async log in batching'); 
        console.log('current count:', countRef.current); Здесь известно о предыдущем count, но не новом
      }, 1000)
    }
    asyncFunc()

    setCount(prev => ++prev); // Синхронно и попадет в общий батчинг
    setCount(prev => ++prev);// Синхронно и попадет в общий батчинг
  }, [])`}/>
          </Note>

        <button className={cls.button} onClick={bathingCalls}>
          batching increment, count is {count}
        </button>
        <button className={cls.button} onClick={() => setCount((count) => count + 1)}>
          increment, count is {count}
        </button>
      </div>

      <Block className={cls.block}
      title='Вынужденное обновление (отключение батчинга)'
        text='Если нужно заставить реакт действовать сразу после вызова setState, то можно обернуть код в flushSync
        В коде ниже вызовется три рендера вместо 2. Информация о рендерах в консоли'
      >
        <Code text={`const flushSyncBathingCalls =  useCallback(() => {
    flushSync(()=>{
      setCount2(prev => ++prev); // Синхронно и вызовет индивидуальный рендер
    })

    setCount2(prev => ++prev); // Синхронно и попадет в батчинг
    const asyncFunc = async () => {
      await setTimeout(() => {
        setCount2(prev => ++prev); // Асинхронно и не попадает в общий батчинг
        setCount2(prev => ++prev); // Асинхронно и не попадает в общий батчинг 
        console.log('async log in batching');
      }, 1000)
    }
    asyncFunc()

    setCount2(prev => ++prev); // Синхронно и попадет в батчинг
    setCount2(prev => ++prev);// Синхронно и попадет в батчинг
  }, [])`}/>
        <button onClick={flushSyncBathingCalls} className={cls.button}>flushSync batching increment, count2: {count2}</button>
      </Block>




    <TodoList />

    </div>
  );
});


export default LearnSetState