import DeleteUser from "@/app/(routes)/components/deleteUserForm";

import { getUserById } from "@/lib/actions";
import { notFound } from "next/navigation";

const EditItems = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const user = await getUserById(id);

  if (!user) {
    notFound();
  }

  return (
    <div>
      <DeleteUser user={user} />
    </div>
  );
};

export default EditItems;
