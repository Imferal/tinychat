import React from 'react'
import s from './Room.module.scss'
import socket from "../../socket";

function Room(props) {
  // Функция публикации нового сообщения
  const onSendMessage = () => {
    // Формируем объект с новым сообщением
    const message = {
      userName: props.userName,
      text: props.newMessageText
    }
    // Диспатчим новое сообщение в стейт
    props.sendNewMessage(message)
    // Отправляем новое сообщение на сервер
    socket.emit('NEW_MESSAGE', {
      roomId: props.roomId,
      ...message
    })
  }

  // Находим "сигнальный" блок для автоскролла
  const messagesEndRef = React.useRef(null)

  // Если изменились сообщения - прокручиваем до сигнального блока
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    })
  }, [props.messages]);

  return (
    <div className="fixedContainer">
      <h2 className={s.chat__title}>{props.roomId}</h2>
      <div className={s.chat__body}>
        <div className={s.chat__status}>
          <p className={s.chat__online}>Онлайн (<b>{props.users.length}</b>)</p>
          <ul>
            {props.users.map(
              (name, i) => <li className={s.chat__user} key={name + i}>{name}</li>
            )}
          </ul>
        </div>
        <div className={s.chat__dialogs}>
          <div className={s.chat__messages}>
            {props.messages.map(
              (message, i) => (
                <div key={i} className={s.chat__message}>
                  <p className={`${s.chat__text} ${
                    props.userName === message.userName ?
                      s.chat__text_left :
                      s.chat__text_right
                  }`}>{message.text}</p>
                  <span className={`${s.chat__author} ${
                    props.userName === message.userName ?
                      s.chat__author_left :
                      s.chat__author_right
                  }`}>{message.userName}</span>
                </div>)
            )}
            <div ref={messagesEndRef}/>
          </div>
          <form className={s.chat__newMessage}>
                <textarea
                  value={props.newMessageText}
                  onChange={(e) => props.setNewMessageText(e.target.value)}
                  rows='3'/>
            <button
              onClick={() => onSendMessage()}
              type='button'>Отправить
            </button>
          </form>
        </div>
      </div>
      <small className={s.chat__footer}><span>Copyleft, 2021 Копируйте на здоровье</span><a
        href='https://github.com/Imferal'>исходники тут</a></small>
    </div>
  )
}

export default Room
