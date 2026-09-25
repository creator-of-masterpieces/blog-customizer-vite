import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
  type ArticleStateType,
} from '@/constants/articleProps';
import { RadioGroup } from '@/ui/radio-group';
import { Select } from '@/ui/select';
import { Separator } from '@/ui/separator';
import { clsx } from 'clsx';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onSubmit(value: ArticleStateType): void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps): React.JSX.Element => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isFormOpen) return;

    const handleMouseDown = (evt: MouseEvent): void => {
      const div = divRef.current;
      const { target } = evt;
      if (!div || !(target instanceof Node)) return;

      const arrow = div?.previousElementSibling;

      if (!div?.contains(target) && !arrow?.contains(target)) {
        setIsFormOpen(false);
      }
    };
    window.addEventListener('mousedown', handleMouseDown);
    return (): void => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isFormOpen]);

  function handleSubmit(evt: FormEvent<HTMLFormElement>): void {
    evt.preventDefault();
    props.onSubmit(formState);
    setIsFormOpen(false);
  }

  function handleReset(evt: FormEvent<HTMLFormElement>): void {
    evt.preventDefault();

    setFormState(defaultArticleState);
    props.onSubmit(defaultArticleState);
  }

  return (
    <>
      <div ref={divRef}>
        <ArrowButton
          isOpen={isFormOpen}
          onClick={() => setIsFormOpen((prev) => !prev)}
        />
        <aside
          className={clsx(styles.container, { [styles.container_open]: isFormOpen })}
        >
          <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
            <Text as="h2" size={31} weight={800} uppercase>
              Задайте параметры
            </Text>

            <Select
              title="Шрифт"
              selected={formState.fontFamilyOption}
              options={fontFamilyOptions}
              onChange={(option) =>
                setFormState((prev) => ({ ...prev, fontFamilyOption: option }))
              }
            />

            <RadioGroup
              title="Размер шрифта"
              selected={formState.fontSizeOption}
              options={fontSizeOptions}
              onChange={(option) =>
                setFormState((prev) => ({ ...prev, fontSizeOption: option }))
              }
              name="fontSizes"
            />

            <Select
              title="Цвет шрифта"
              selected={formState.fontColor}
              options={fontColors}
              onChange={(option) =>
                setFormState((prev) => ({ ...prev, fontColor: option }))
              }
            />

            <Separator />

            <Select
              title="Цвет фона"
              selected={formState.backgroundColor}
              options={backgroundColors}
              onChange={(option) =>
                setFormState((prev) => ({ ...prev, backgroundColor: option }))
              }
            />

            <Select
              title="Ширина контента"
              selected={formState.contentWidth}
              options={contentWidthArr}
              onChange={(option) =>
                setFormState((prev) => ({ ...prev, contentWidth: option }))
              }
            />

            <div className={styles.bottomContainer}>
              <Button title="Сбросить" htmlType="reset" type="clear" />
              <Button title="Применить" htmlType="submit" type="apply" />
            </div>
          </form>
        </aside>
      </div>
    </>
  );
};
