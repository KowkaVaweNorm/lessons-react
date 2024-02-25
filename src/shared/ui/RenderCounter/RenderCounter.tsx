import { useCallback, useEffect, useLayoutEffect, useReducer, useRef, useState } from "react";
import cls from './RenderCounter.module.scss'
import { Block } from "../Block/Block";
import { classNames } from "@/shared/libs/utils/classNames/classNames";

let renderCount = 0;
let afterClear = false;

interface IProps{
  title?: string 
  fixed?: boolean
}

export const RenderCounter= ({fixed = true, title = 'Render counter'}: IProps)=>{
  const [, forceUpdate] = useReducer(v => v+1, 0)
  if(!afterClear){
    renderCount+= 1
  }

  const clear = useCallback(() => {
    afterClear = true;
      renderCount = 0;
      forceUpdate();
  }, [])

useEffect(()=>{
  afterClear = false;
})

  return <div className={
      classNames('', {
        [cls.counter ?? '']: fixed, 
      }, ['sdfsdf'])
  }>
    <Block>
      <div>{title}: </div>
      develop: {renderCount}
    <div>
      production: {renderCount === 1 ? 1 : renderCount / 2}
    </div>
    <br />
    <button onClick={clear}>Clear</button>
    </Block>
    </div>
}