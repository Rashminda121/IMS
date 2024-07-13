import DeleteItem from "@/app/(routes)/components/deleteItemForm";
import EditItem from "@/app/(routes)/components/editItemForm";
import { getItemById } from "@/lib/actions";
import { notFound } from "next/navigation";

const EditItems = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const item = await getItemById(id);

  if (!item) {
    notFound();
  }

  return (
    <div>
      <DeleteItem item={item} />
    </div>
  );
};

export default EditItems;
