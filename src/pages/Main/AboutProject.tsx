import React from 'react';
import ProjectItem from './ProjectItem';

const AboutProject = () => {
  return (
    <div className="about-progect">
      <h2 className="about-progect__title">Приемущества</h2>
      <div className="about-progect__list">
        <ProjectItem
          title="Учебник"
          description="Электронный учебник содержит все необходимое для успешного изучения языка. Он включает в себя 6 разделов, каждый из которых состоит из 30 страниц по 20 слов"
        />
        <ProjectItem
          title="Игры"
          description="В приложение включены две игры Аудиовызов, в которой Вам предстоит правильно угадывать услышанные слова и Спринт - которая поможет лучше запомнить верный перевод слов. Игры помогут Вам лучше закрепить изученный в учебнике материал."
        />
        <ProjectItem
          title="Статистика"
          description="Весь Ваш прогресс обучения сохраняется в статистике. информация представлена в виде графиков с описанием прогресса обучения."
        />
      </div>
    </div>
  );
};

export default AboutProject;
