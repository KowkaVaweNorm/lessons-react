import { MouseEventHandler, useCallback, useMemo, useState } from "react";

export const useConditionObjectIs = (newName?: string) => {
  const srcObj = {
    name: "source object",
  };
  const [obj, setObj] = useState(srcObj);
  const noRenderFunction = useCallback((e: MouseEventHandler<HTMLButtonElement>) => {
    const newSrcObj = srcObj;
    newSrcObj.name = newName ?? "New name";
    console.log("Объекты одинаковые? ", Object.is(srcObj, newSrcObj));

    setObj(newSrcObj); // Здесь рендера не будет,
    // Но при следующем рендере, значение обновится
  }, []);
  return [obj, noRenderFunction];
};
