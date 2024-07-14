import EditMerchant from "@/app/(routes)/components/editMerchant";
import { getMerchantById } from "@/lib/actions";
import { notFound } from "next/navigation";

const EditItems = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const merchant = await getMerchantById(id);
  // console.log(merchant);

  if (!merchant) {
    notFound();
  }

  return (
    <div>
      <EditMerchant merchant={merchant} />
    </div>
  );
};

export default EditItems;
