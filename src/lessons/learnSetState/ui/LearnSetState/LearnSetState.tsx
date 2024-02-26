import { memo, useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import cls from './learnSetState.module.scss';
import { classNames } from '@/shared/libs/utils/classNames/classNames';
import { Block } from '@/shared/ui/Block/Block';
import { Note } from '@/shared/ui/Note/Note';
import { Code } from '@/shared/ui/Code/Code';
import TodoList from '../TodoList/TodoList';
import { flushSync } from 'react-dom';
import { RenderCounter } from '@/shared/ui/RenderCounter/RenderCounter';
import { Quote } from '@/shared/ui/Quote/Quote';
import { Counter } from '@/shared/ui/Counter/Conter';
import { SetStateObject } from '../SetStateObject/SetStateObject';
interface IlearnSetStateProps {
  className?: string
}

const LearnSetState = memo((props: IlearnSetStateProps): JSX.Element => {
  const {
    className
  } = props;
  const [count, setCount] = useState(0)
  const countRef = useRef(count);
  const [, forceUpdate] = useReducer(v => v+1, 0)
  useEffect(() => {
    countRef.current = count;
  }, [count])

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
          title='1. Вызов setState не производит ререндер мгновенно'
          text='Код сразу после setState работает с прежним значением, а не новым. Иными словами вызов setState асинхронный.'
          >
          <Quote author='react.dev' link='https://react.dev/reference/react/useState#setstate-caveats'>
            Функция set обновляет переменную состояния только для <b>следующего</b> рендера. 
            Если вы прочитаете переменную state после вызова функции set, вы получите старое значение, которое было на экране до вашего вызова. 
          </Quote> 
          <Note >
            <Code text='import { useCallback, useState } from "react"

export const Counter = () =>{
  const [count, setCount] = useState(0);
  const handleClick = () =>{
    setCount(count + 1);
    console.log("Count:", count); // Здесь значение до увелечения
  }
  return (<>  
  <span>{count}</span>
  <button onClick={handleClick}>Increment</button>
  </>
  )
}' />
          </Note>
          <Counter />
            
            </Block>
        <Block
          className={cls.block}
          title='2. Проверка нового значения с помощью Object.is.'
          text='Если мы указали в setState новое значение 
          которое равно согласно Object.is старому то ререндера не будет. 
          Обратите внимание что ссылочные типы сравниваются по ссылке' >
          
          <Quote link='https://react.dev/reference/react/useState#setstate-caveats' author='react.dev' text='Если новое значение, которое вы предоставляете, идентично текущему состоянию, 
          что определяется сравнением Object.is, 
          React пропустит повторный рендеринг компонента и его дочерних элементов. Это оптимизация. 
          Хотя в некоторых случаях React может потребоваться вызвать ваш компонент, 
          прежде чем пропустить дочерние элементы, это не должно повлиять на ваш код.'></Quote>

          
        <Note style={{marginTop: '10px'}}>
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
         import { useState } from "react";

         export const SetStateObject = () =>{
           const [data, setData] = useState({ value: 0 });
         
           const handleClick = () => {
             // Передача ссылочного типа данных напрямую
             data.value = Math.random();
             setData(data);
           };
         
           return (
             <div>
               <p>Value: {data.value}</p>
               <button onClick={handleClick}>Increment</button>
             </div>
           );
         }
          ' />
        </Note>
        <SetStateObject />
        <button style={{ marginTop: '10px' }} onClick={() => {forceUpdate() }}>Принудительно вызвать ререндер страницы</button>
          </Block>
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