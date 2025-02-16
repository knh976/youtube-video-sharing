import { useEffect } from "react";
import { createConsumer } from "@rails/actioncable";
import { useSnackbar } from "notistack";
import { WEBSOCKET_BASE_URL } from "../../constants";
import useUser from "../../hooks/useUser";

const Notification = () => {
  const { isAuth, token, username } = useUser();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!isAuth) return;

    const consumer = createConsumer(`${WEBSOCKET_BASE_URL}?token=${token}`);
    const subscription = consumer.subscriptions.create("SharedVideosChannel", {
      received(data) {
        if (username === data.username) return;

        enqueueSnackbar(
          `${data.username} shared ${data.video_title}`,
          {
            variant: 'success',
            autoHideDuration: 5000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            }
          }
        );
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [isAuth]);

  return null
}

export default Notification;
