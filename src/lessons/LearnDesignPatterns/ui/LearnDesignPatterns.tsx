import cls from './LearnDesignPatterns.module.scss'
import globalcls from '../../../styles/global.module.scss'
import { Block } from '@/shared/ui/Block/Block'
const LearnDesignPatterns = (): JSX.Element => {

  return (
    <>
    <Block className={globalcls.block} 
      title='Особенности проектирования'
      text='Когда начинаешь проектировать систему, возникает вопрос будущего и его неопределённости
      Тебе нужно определить что возможно в будущем для твоего проекта, ты должен задать себе вопрос:
      какое требование может появится потенциально'
    />

    <Block className={globalcls.block} 
    title='Пример ошибки(или нет?) 1'
    text='Необходимо спроектировть компонент который будет выглядеть как блоки текста которые будет видеть пользователь
    Например проектируем текущий блок в котором написан этот текст возникают вопросы:
    Нужно текст принимать пропсом, или дочерним элементом?
    Стилизация индивидуальная или одна на всех?
    Нужны ли дополнительные кнопки управления блоком(например копировать или показать подсказку)
    Разберём первый вопрос - допустим принимаем текст и загловок аргументом(ведь это лаконичнее и выглядит декларативно)
    В итоге  при задаче вывести ссылку мы получаем прямое отображение текста со всеми тегами например "блаблабла <a>Ссылка<a/>"
    '/>
    </>
    )
}
export default LearnDesignPatterns