import WebPushService from '@/services/webPush';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showNotif } from '@/store/notifSlice';

const NotificationSettingsGroup = () => {
    const dispacth = useDispatch();
    const checkIfShouldShowModal = () => {
        if (WebPushService.hasPermission()) return false;
        if (!WebPushService.hasPermission() && !localStorage.getItem('remindLater')) {
            return true;
        }
        let remindLater = localStorage.getItem('remindLater');
        // convert to date
        remindLater = new Date(Number(remindLater));
        return remindLater < new Date();
    };
    const [showModal, setShowModal] = useState(checkIfShouldShowModal());

    const handleAllowNotification = async () => {
        try {
            if (!WebPushService.hasPermission()) {
                await WebPushService.requestPermission();
            }

            // await 1 second
            await new Promise((resolve) => setTimeout(resolve, 1000));

            let subscription = await WebPushService.getSubscription();
            if (!subscription) {
                subscription = await WebPushService.subscribe();
            }

            await WebPushService.sendSubscription(subscription); // server
            dispacth(showNotif({ message: 'Subscribed to push notifications', type: 'success' }));
            setShowModal(false);
        } catch (error) {
            dispacth(showNotif({ message: error.message, type: 'error' }));
            setShowModal(false);
        }
    };

    const handleReminderLater = () => {
        // remind later in 1 hour
        // set time to 1 hour later from now

        let time = new Date().getTime() + 60 * 60 * 1000;
        // stringifying the time
        time = time.toString();
        localStorage.setItem('remindLater', time);

        setShowModal(false);
        dispacth(showNotif({ message: 'You will be reminded later', type: 'success' }));
    };

    return (
        showModal && (
            <div className="fixed bottom-0 right-0 w-full h-full flex items-end justify-end z-index">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold">Allow Push Notifications</h2>
                    <p className="text-gray-600">Do you want to allow push notifications?</p>
                    <div className="flex justify-end mt-4">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleAllowNotification}>
                            Allow
                        </button>
                        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={handleReminderLater}>
                            Remind Me Later
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default NotificationSettingsGroup;
