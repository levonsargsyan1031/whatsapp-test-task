import Button from "./Button";
import Input from "./Input";
import imgis from "./image/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg";
import phon from './image/phone-icon-telephone-icon-symbol-for-app-and-messenger-vector.jpg';
import video from './image/camera_video_icon_176703.png';
import search from './image/1024px-Search_Icon.svg.png';
import smaile from './image/smile-icon.png'

import {
  deleteNotification,
  getMessage,
  sendMessage,
  setSettings,
} from "./service/whatsupService";
import "./styles.css";
import React, { useState } from "react";

const SendMessager = () => {
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({
    mobileNumber: "",
    message: "",
    idInstance: "",
    apiTokenInstance: "",
  });
  const { mobileNumber, message, apiTokenInstance, idInstance } = formData;

  const onChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  React.useEffect(() => {
    setSettings(formData);
    setTimeout(function () {
      handleGetMessage();
    }, 1000);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(`Sending message to ${mobileNumber}: ${message}`);
    sendMessage(formData);

    setMessages([...messages, { from: false, message: formData.message }]);
    setFormData({ ...formData, message: "" });
  };

  const handleGetMessage = async () => {
    const { data } = await getMessage(formData);
    console.log(data);
    if (data?.receiptId) {
      if (data?.body.typeWebhook === "incomingMessageReceived" && data?.body.senderData.chatId === `${formData.mobileNumber}@c.us`) {
        setMessages((msgs) => [
          ...msgs,
          {
            from: true,
            message: data.body.messageData.extendedTextMessageData.text,
          },
        ]);
      }
      await deleteNotification(formData, data.receiptId);
    }
  };

  return (
    <div className="home-whatsapp-page">
      <div className="left-section">
        <div className="user-img">
          <img src={imgis} alt="" />
        </div>
        <div className="group"></div>
        <div className="frame">
          <div className="whatsapp-input-number">
            <Input
              name="mobileNumber"
              placeholder="Mobile number"
              value={mobileNumber}
              onChange={onChange}
            />
            <Input
              name="idInstance"
              placeholder="idInstance"
              value={idInstance}
              onChange={onChange}
            />
            <Input
              name="apiTokenInstance"
              placeholder="apiTokenInstance"
              value={apiTokenInstance}
              onChange={onChange}
            />
          </div>
          <div className="contact-list">
            <div className="contact-info">
              <div className="contact-info-img">
                <img src={imgis} alt="" />
              </div>
              <div className="contact-name">
                <div className="name">Jane Cooper</div>
                <div className="message">Hello ..</div>
              </div>
            </div>
            <div className="contact-info">
              <div className="contact-info-img">
                <img src={imgis} alt="" />
              </div>
              <div className="contact-name">
                <div className="name">Yuri</div>
                <div className="message">Hello ..</div>
              </div>
            </div>
            <div className="contact-info">
              <div className="contact-info-img">
                <img src={imgis} alt="" />
              </div>
              <div className="contact-name">
                <div className="name">Sasha</div>
                <div className="message">Hello ..</div>
              </div>
            </div>
            <div className="contact-info">
              <div className="contact-info-img">
                <img src={imgis} alt="" />
              </div>
              <div className="contact-name">
                <div className="name">Andrey</div>
                <div className="message">Hello ..</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rigth-section">
        <div className="user-frame">
          <div className="user-frame-01">
            <div className="user-info">
              <div className="user-img-1">
                <img src={imgis} alt="" />
              </div>
              <div className="user-name">
                <div className="user-name-1">Levon</div>
                <div className="user-status">Online</div>
              </div>
            </div>
            <div className="user-instruments">
              <div>
              <img src={phon} alt="" />
              </div>
              <div>
              <img src={video } alt="" />
              </div>
              <div>
              <img src={search} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="whatsapp-messager-output">
        {messages.map((m) => (
                <div
                  style={{
                    padding: 18 ,
                    gap:12,
                    width: "90%",
                    height: 20,
                    borderRadius: 18 ,
                    marginTop: 10,
                    backgroundColor: m.from ?   " #FFFFFF;" : "#D7F8F4",
                    textAlign: m.from ? "start" : "end",
                    fontSize: 14,
                    fontStyle: 'normal',
                    fontWeight: 400 ,
                  }}
                >
                  <span>{m.message}</span>
                </div>
              ))}
        </div>
        <div className="whatsapp--messager-input">
          <div className="whatsapp--messager-input-1">
              <div className="smail">
              <img src={smaile  } alt="" />
              </div>
              <div className="input-text">
                <div className="input">
                <Input name="message" value={message} onChange={onChange} />
                </div>
                <div className="button">
                <Button onClick={onSubmit}>SEND</Button>
                </div>
              
              

              </div>
          </div>
        </div>
      </div>
    </div>












    // <div className="whatsapp">
    //   <div className="whatsapp-titel">
    //     <div>
    //       <img src={imgis} alt="" />
    //     </div>
    //     <div className="titel">Send Message</div>
    //   </div>
    //   <div className="whatsapp-body">
    //     <div className="section-first">
    //       <div className="whatsapp-input-number">

    //         />
    //       </div>
    //     </div>
    //     <div className="section-second">
    //       <div className="whatsapp-messager">
    //         <div className="whatsapp-output">
             
    //         </div>
    //         <div className="whatsapp-input-messager">
    //           <div className="whatsapp-input-text">
                
    //           </div>
    //           <div className="button">
    //             <Button onClick={onSubmit}>SEND</Button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};
export default SendMessager;
