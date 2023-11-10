import './WithCss.css' 

const WithCss = ({logotest}) => {
  return (
    <div className="chat-notification">
        <div className="chat-notification-logo-wrapper">
          <img className="chat-notification-logo" src={logotest} alt="ChitChat Logo"/>
        </div>
        <div className="chat-notification-content">
          <h4 className="chat-notification-title">ChitChat with CSS</h4>
          <p className="chat-notification-message">You have a new message!</p>
        </div>
    </div>
  )
}

export default WithCss
