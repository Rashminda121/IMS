import DeleteMerchant from "@/app/(routes)/components/deleteMerchantForm";
import { getMerchantById } from "@/lib/actions";

import { notFound } from "next/navigation";

const EditItems = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const merchant = await getMerchantById(id);

  if (!merchant) {
    notFound();
  }

  return (
    <div>
      <DeleteMerchant merchant={merchant} />
    </div>
  );
};

export default EditItems;
