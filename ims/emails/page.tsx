// import React from "react";

// import {
//   Html,
//   Body,
//   Head,
//   Heading,
//   Hr,
//   Container,
//   Preview,
//   Section,
//   Text,
// } from "@react-email/components";

// import { Tailwind } from "@react-email/components";

// type ContactFormProps = {
//   message: string;
//   items: string[];
// };

// export default function ContactFormEmail({ message, items }: ContactFormProps) {
//   return (
//     <Html>
//       <Head />
//       <Preview>New Message</Preview>
//       <Body>
//         <Container>
//           <Section>
//             <Heading>Your Received the following message from</Heading>
//             <Text>{message}</Text>
//             <Hr />
//             <Text>Sender Email</Text>
//           </Section>
//         </Container>
//       </Body>
//     </Html>
//   );
// }

import React from "react";
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type ContactFormProps = {
  message: string;
  items: string[];
};

function ContactFormEmail({ message, items }: ContactFormProps) {
  return (
    <Html>
      <Head />
      <Preview>New Message</Preview>
      <Body>
        <Container>
          <Section>
            <Heading>You Received the following message:</Heading>
            <Text>Dear Sir/Ma'am,</Text>
            <Text>{message}</Text>
            <Hr />
            <Heading>Items:</Heading>
            <ul>
              {items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <Hr />
            <Text>Best Regards!</Text>
            <Text>ABC Company</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
export default ContactFormEmail;
