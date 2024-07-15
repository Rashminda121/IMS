"use server";
import { NextResponse } from "next/server";
import { Resend } from "resend";

// import nodemailer from "nodemailer";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  // const { subject, message } = nodemailer;
  try {
    const formData = await req.json();
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    // Validate message
    if (!message || typeof message !== "string") {
      return new NextResponse(JSON.stringify({ error: "Invalid Message" }), {
        status: 400,
      });
    }

    // Send email using Resend
    resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: subject,
      reply_to: "rashminda121@gmail.com",
      text: message,
    });

    // Return success response
    return new NextResponse(
      JSON.stringify({ success: true, message: "Email Sent Successfully" }),
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
//   try {
//     const email = formData.get("email") as string;
//     const subject = formData.get("subject") as string;
//     const message = formData.get("message") as string;

//     if (!message || typeof message !== "string") {
//       return {
//         error: "Invalid Message",
//       };
//     }

//     // Assuming resend.emails.send is correctly imported and used
//     await resend.emails.send({
//       from: "onboarding@resend.dev",
//       to: email,
//       subject: subject,
//       reply_to: "rashmindaeducation@gmail.com",
//       text: message, // Use the actual message here
//     });

//     return new NextResponse(
//       JSON.stringify({
//         success: true,
//         message: "Message sent successfully",
//       }),
//       { status: 200 }
//     );
//   } catch (error: unknown) {
//     console.error("[SendEmail] Error:", error);
//     return new NextResponse("Internal server error", { status: 500 });
//   }
// };
