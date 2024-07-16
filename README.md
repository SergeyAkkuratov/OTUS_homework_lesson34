<br/>
<p align="center">
  <h3 align="center">Chat</h3>
  <p align="center">
    Typescript приложение чата реализованное при помощи Redux на базе Firebase API.
    <br/>
    <br/>
  </p>
</p>

[![Check, Build and GitHub Pages deploy](https://github.com/SergeyAkkuratov/OTUS_homework_lesson34/actions/workflows/pull_request_check.yml/badge.svg?branch=lesson38)](https://github.com/SergeyAkkuratov/OTUS_homework_lesson34/actions/workflows/pull_request_check.yml)
![Contributors](https://img.shields.io/github/contributors/SergeyAkkuratov/OTUS_homework_lesson34?color=dark-green) ![Issues](https://img.shields.io/github/issues/SergeyAkkuratov/OTUS_homework_lesson34)

![typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34)

## Содержание

-   [О проекте](#о-проекте)
-   [Установка](#установка)
-   [Использование](#использование)

## О проекте

![general](./images/general.gif)

Приложение чат позволяет обмениваться сообщенияими с другими пользователями, которые также подключились к данному приложению.  
Обмен сообщениями осуществляется при помощи Firebase API.  
Чат позволяет задавать пользователю любой текстовый никнейм и посылать небольшой набор самйликов.

## Требования

Для локального запуска приложения вам потребуется [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

## Установка

Для локального запуска приложения вам нужно склонировать проект, скачать зависимости и скрипт запуска:

```bash
git clone https://github.com/SergeyAkkuratov/OTUS_homework_lesson47.git ./outlays

cd ./outlays

npm install

npm start

```

Приложение будет доступно по адресу http://localhost:8080/.

Так же попробовать приложение можно [онлайн](https://sergeyakkuratov.github.io/OTUS_homework_lesson34/).

## Использование

-   При открытии приложения вы увидите поле "Ваше имя" - в него можно внести любой текстовый никнейм для индетификации вас в сообщениях чата.
-   Для того, чтобы начать общение - нажмите кнопку старт.
-   В поле внизу приложения вы можете печатать свои сообщения и отправлять их по нажатию кнопки Enter.
-   Рядом с полем ввода сообщения есть кнопка смайликов, нажатие на неё откроет дополнительное окно, где вы можете выбрать смайлик, при клике на которой он поместится в текст вашего сообщения.
-   если вы хотите отключиться от чата но не закрывать окно приложения, вы можете нажать кнопку "Стоп".
