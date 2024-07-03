import config from '../config';
import axiosApiInstance from './axios';

class WebPushService {
    static vapid_key = config.PUBLIC_KEY_VAPID;

    static hasPermission() {
        return Notification.permission === 'granted';
    }

    static async requestPermission() {
        return await Notification.requestPermission();
    }

    static async getSubscription() {
        return await navigator.serviceWorker.ready.then(async (registration) => {
            return await registration.pushManager.getSubscription();
        });
    }
    static async subscribe() {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: WebPushService.vapid_key,
        });

        return subscription;
    }

    static async unsubscribe() {
        const subscription = await this.getSubscription();
        if (subscription) {
            await subscription.unsubscribe();
        }
        return subscription;
    }

    static async sendSubscription(subscription) {
        console.log(subscription);
        return await axiosApiInstance.post('/api/notifications/subscribe', subscription);
    }

    static async sendUnsubscription(subscription) {
        return await axiosApiInstance.post('/api/notifications/unsubscribe', subscription);
    }

    static async sendNotification(payload) {
        return await axiosApiInstance.post('/api/notifications/send', { ...payload });
    }

    static async sendNotificationToAll(payload) {
        return await axiosApiInstance.post('/api/notifications/boardcast', { ...payload });
    }
}

export default WebPushService;
