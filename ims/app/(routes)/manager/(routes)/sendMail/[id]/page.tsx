import EditItem from "@/app/(routes)/components/editItemForm";
import SendMail from "@/app/(routes)/components/mailForm";
import { getMerchantById } from "@/lib/actions";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

const AddMail = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const items = await db.item.findMany();

  const merchant = await getMerchantById(id);
  // console.log(merchant);

  if (!merchant) {
    notFound();
  }

  return (
    <div>
      <SendMail merchant={merchant} items={items} />
    </div>
  );
};

export default AddMail;
