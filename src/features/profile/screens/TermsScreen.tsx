import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/text";
import { View } from "react-native";

const sections = [
  {
    title: "1. Using ClinicQ",
    body: "ClinicQ lets you browse doctors and book, reschedule or cancel outpatient appointments. You must give correct personal details when you register.",
  },
  {
    title: "2. Appointments",
    body: "A booking reserves a time slot with the doctor. Please arrive on time. If you cannot attend, cancel or reschedule the appointment from the app so the slot can be given to another patient.",
  },
  {
    title: "3. Fees",
    body: "Consultation fees are shown before you book and are paid at the clinic. ClinicQ does not take payments.",
  },
  {
    title: "4. Medical advice",
    body: "ClinicQ is a booking tool only and does not give medical advice. In an emergency, call your local emergency number.",
  },
  {
    title: "5. Your data",
    body: "We store your name, email, phone number and appointments to run the service. Your data is shared only with the clinic you book with.",
  },
  {
    title: "6. Your account",
    body: "You are responsible for keeping your password safe and for all activity on your account. Tell us straight away if you think someone else has used it.",
  },
  {
    title: "7. Cancellations and missed appointments",
    body: "Please cancel at least 24 hours before your appointment. Repeated missed appointments without cancelling may lead to your account being limited.",
  },
  {
    title: "8. Clinic changes",
    body: "Clinics may need to change or cancel an appointment, for example if a doctor is unavailable. You will be notified in the app when this happens.",
  },
  {
    title: "9. Notifications",
    body: "We send in-app notifications about bookings, reschedules, cancellations and reminders. These are part of the service and cannot be fully turned off.",
  },
  {
    title: "10. Acceptable use",
    body: "Do not make fake bookings, book slots you do not plan to use, or try to access other users' data. We may suspend accounts that break these rules.",
  },
  {
    title: "11. Liability",
    body: "ClinicQ is not responsible for the medical care given by clinics or doctors. Each clinic is responsible for its own services.",
  },
  {
    title: "12. Changes",
    body: "We may update these terms. Continuing to use the app means you accept the updated terms.",
  },
  {
    title: "13. Contact",
    body: "For questions about these terms, contact support@clinicq.example.com.",
  },
];

export function TermsScreen() {
  return (
    <Screen scroll header={<Header title="Terms and Conditions" showBack />}>
      <View className="gap-md py-md">
        {sections.map((section) => (
          <View key={section.title} className="gap-xs">
            <Text className="font-inter-semibold text-md">{section.title}</Text>
            <Text className="text-md text-subtext">{section.body}</Text>
          </View>
        ))}
      </View>
    </Screen>
  );
}
