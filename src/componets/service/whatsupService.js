import axios from "axios";

export const sendMessage = (formData) => {
  axios.post(
    `https://api.green-api.com/waInstance${formData.idInstance}/SendMessage/${formData.apiTokenInstance}`,
    {
      chatId: `${formData.mobileNumber}@c.us`,
      message: formData.message,
    }
  );
};

export const getMessage = (formData) => {
  return axios.get(
    `https://api.green-api.com/waInstance${formData.idInstance}/receiveNotification/${formData.apiTokenInstance}`,
  );
};

export const deleteNotification = (formData, id) => {
  axios.delete(
    `https://api.green-api.com/waInstance${formData.idInstance}/deleteNotification/${formData.apiTokenInstance}/${id}`
  );
};

export const setSettings = (formData) => {
  axios.post(
    `https://api.green-api.com/waInstance${formData.idInstance}/SetSettings/${formData.apiTokenInstance}`,
    {
      outgoingWebhook: "no",
      outgoingMessageWebhook: "no",
      stateWebhook: "no",
      incomingWebhook: "yes",
      deviceWebhook: "no",
      statusInstanceChangedWebhook: "no",
    }
  );
};
