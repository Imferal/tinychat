import React from 'react'
import s from './Room.module.scss'
import socket from "../../socket";

function Room({users, messages, userName, roomId, onAddMessage}) {
  // Добавляем в стейт значение textarea
  const [messageValue, setMessageValue] = React.useState('')
  // Находим "сигнальный" блок для автоскролла
  const messagesEndRef = React.useRef(null)

  // Если изменились сообщения - прокручиваем до сигнального блока
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    })
  }, [messages]);

  // Функция отправки сообщения
  const onSendMessage = () => {
    // Отправляем сообщение через сокет
    socket.emit('NEW_MESSAGE', {
      userName,
      roomId,
      text: messageValue,
    })
    // Диспатчим сообщение в стейт
    onAddMessage({userName, text: messageValue})
    setMessageValue('')
  }

  return (
    <div className="fixedContainer">
      <h2 className={s.chat__title}>{roomId}</h2>
      <div className={s.chat__body}>
        <div className={s.chat__status}>
          <p className={s.chat__online}>Онлайн (<b>{users.length}</b>)</p>
          <ul>
            {users.map((name, i) => <li className={s.chat__user} key={name + i}>{name}</li>)}
          </ul>
        </div>
        <div className={s.chat__dialogs}>
          <div className={s.chat__messages}>
            {messages.map((message, i) => (
              <div key={i} className={s.chat__message}>
                <p className={`${s.chat__text} ${
                  userName === message.userName ? s.chat__text_left : s.chat__text_right
                }`}>{message.text}</p>
                <span className={`${s.chat__author} ${
                  userName === message.userName ? s.chat__author_left : s.chat__author_right
                }`}>{message.userName}</span>
              </div>
            ))}
            <div ref={messagesEndRef}/>
          </div>
          <form className={s.chat__newMessage}>
                <textarea
                  value={messageValue}
                  onChange={(e) => setMessageValue(e.target.value)}
                  rows='3'/>
            <button onClick={onSendMessage} type='button'>Отправить</button>
          </form>
        </div>
      </div>
      <small className={s.chat__footer}><span>Copyleft, 2021 Копируйте на здоровье</span><a
        href='https://github.com/Imferal'>исходники тут</a></small>
    </div>
  )
}

export default Room
