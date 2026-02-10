import { message } from 'antd';

export const useNotification = () => {
    return (messageText: string) => {
        message.error(messageText);
    };
};