import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
  type ArticleStateType,
  type OptionType,
} from '@/constants/articleProps';
import { RadioGroup } from '@/ui/radio-group';
import { Select } from '@/ui/select';
import { Separator } from '@/ui/separator';
// eslint-disable-next-line import/no-named-as-default
import clsx from 'clsx';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onSubmit(value: ArticleStateType): void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(true);

  const [fontFamily, setFontFamily] = useState<OptionType>(
    defaultArticleState.fontFamilyOption
  );

  const [fontSize, setFontSize] = useState<OptionType>(
    defaultArticleState.fontSizeOption
  );

  const [fontColor, setFontColor] = useState<OptionType>(defaultArticleState.fontColor);

  const [bgColor, setBgColor] = useState<OptionType>(
    defaultArticleState.backgroundColor
  );

  const [contentWidth, setContentWidth] = useState<OptionType>(
    defaultArticleState.contentWidth
  );

  const asideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleMouseDown = (evt: MouseEvent): void => {
      const aside = asideRef.current;
      const { target } = evt;
      if (!aside || !(target instanceof Node)) return;

      const arrow = aside?.previousElementSibling;

      if (!aside?.contains(target) && !arrow?.contains(target)) {
        setIsOpen(false);
      }
    };
    window.addEventListener('mousedown', handleMouseDown);
    return (): void => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isOpen]);

  function handleSubmit(evt: FormEvent<HTMLFormElement>): void {
    evt.preventDefault();
    props.onSubmit({
      fontFamilyOption: fontFamily,
      fontColor: fontColor,
      backgroundColor: bgColor,
      contentWidth: contentWidth,
      fontSizeOption: fontSize,
    });
    setIsOpen(false);
  }

  function handleReset(evt: FormEvent<HTMLFormElement>): void {
    evt.preventDefault();

    setFontFamily(defaultArticleState.fontFamilyOption);
    setFontSize(defaultArticleState.fontSizeOption);
    setFontColor(defaultArticleState.fontColor);
    setBgColor(defaultArticleState.backgroundColor);
    setContentWidth(defaultArticleState.contentWidth);
    props.onSubmit(defaultArticleState);
  }

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />
      <aside
        className={clsx(styles.container, { [styles.container_open]: isOpen })}
        ref={asideRef}
      >
        <form
          className={styles.form}
          onSubmit={(evt) => handleSubmit(evt)}
          onReset={(evt) => handleReset(evt)}
        >
          <Select
            title="шрифт"
            selected={fontFamily}
            options={fontFamilyOptions}
            onChange={(option) => setFontFamily(option)}
          />

          <RadioGroup
            name={'fontSizes'}
            options={fontSizeOptions}
            selected={fontSize}
            title={'размер шрифта'}
            onChange={(option) => setFontSize(option)}
          />

          <Select
            title="Цвет шрифта"
            selected={fontColor}
            options={fontColors}
            onChange={(option) => setFontColor(option)}
          />

          <Separator />

          <Select
            title="Цвет фона"
            selected={bgColor}
            options={backgroundColors}
            onChange={(option) => setBgColor(option)}
          />

          <Select
            title="Ширина контента"
            selected={contentWidth}
            options={contentWidthArr}
            onChange={(option) => setContentWidth(option)}
          />

          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
