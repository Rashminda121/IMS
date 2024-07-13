import EditItem from "@/app/(routes)/components/editItemForm";

const EditItems = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  console.log(id);

  return (
    <div>
      <EditItem />
    </div>
  );
};

export default EditItems;
