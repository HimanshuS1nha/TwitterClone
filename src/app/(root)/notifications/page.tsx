import Header from "@/components/Header";
import NotificationItem from "@/components/NotificationItem";
import { AuthOptions } from "@/libs/AuthOptions";
import prisma from "@/libs/db";
import { getServerSession } from "next-auth";

export const revalidate = 0;

const Notifications = async () => {
  const session = await getServerSession(AuthOptions);

  const notifications = await prisma.notifications.findMany({
    where: {
      userId: session?.user.id,
    },
  });
  return (
    <section className="pb-10">
      <Header title="Notifications" />

      {notifications.map((notification) => {
        return (
          <NotificationItem notification={notification} key={notification.id} />
        );
      })}
    </section>
  );
};

export default Notifications;
