import { NextResponse } from "next/server";
import React from "react";
import { Resend } from "resend";
import ContactFormEmail from "@/emails/page";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    const { email, subject, message, items } = formData;

    // Validate message
    if (!message || typeof message !== "string") {
      return new NextResponse(JSON.stringify({ error: "Invalid Message" }), {
        status: 400,
      });
    }

    // Create React element for email content
    const contact = React.createElement(ContactFormEmail, {
      message,
      items,
    });

    // Send email using Resend
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: subject,
      reply_to: "rashminda121@gmail.com",
      react: contact,
    });

    // Return success response
    return new NextResponse(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    // Return error response
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}

// export const SendEmail = async (formData: FormData) => {
//   // console.log("Running On Server");
//   // console.log(formData.get("sendEmail"));
//   // console.log(formData.get("message"));
//   try {
//     const email = formData.get("email") as string;
//     const subject = formData.get("subject") as string;
//     const message = formData.get("message") as string;
//     const items = formData.getAll("items[]");

//     if (!message || typeof message !== "string") {
//       return {
//         error: "Invalid Message",
//       };
//     }

//     await resend.emails.send({
//       from: "onboarding@resend.dev",
//       to: email as string,
//       subject: subject as string,
//       reply_to: "rashmindaeducation@gmail.com",
//       // text: "Hello World",
//       react: React.createElement(ContactFormEmail, {
//         message: message as string,
//         items: items as string[],
//       }),
//     });

//     return new NextResponse(
//       JSON.stringify({
//         success: true,
//         message: "Message sent successfully",
//       }),
//       { status: 200 }
//     );
//   } catch (error: unknown) {
//     console.error("[DB]", error);
//     return new NextResponse("Internal server error", { status: 500 });
//   }
// };
