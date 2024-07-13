import EditUsers from "@/app/(routes)/components/editUsersForm";
import { getUserById } from "@/lib/actions";
import { notFound } from "next/navigation";

const EditItems = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const user = await getUserById(id);
  // console.log(user);

  if (!user) {
    notFound();
  }

  return (
    <div>
      <EditUsers user={user} />
    </div>
  );
};

export default EditItems;
