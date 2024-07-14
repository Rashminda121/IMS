"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const SendMail = async (formData: FormData) => {
  console.log("Running On Server");
  console.log(formData.get("sendEmail"));
  console.log(formData.get("message"));

  resend.emails.send({
    from: "onboarding@resend.dev",
    to: "",
    subject: "",
  });
};
