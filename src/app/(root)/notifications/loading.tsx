import Header from "@/components/Header";
import NotificationItemLoading from "@/components/NotificationItemLoading";

const NotifcationsLoading = () => {
  return (
    <>
      <Header title="Notifications" />

      {Array.from({ length: 4 }, (_, i) => i + 1).map((_, i) => {
        return <NotificationItemLoading key={i} />;
      })}
    </>
  );
};

export default NotifcationsLoading;
