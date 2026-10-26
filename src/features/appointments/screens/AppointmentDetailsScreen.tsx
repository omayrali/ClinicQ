import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";
import { ScreenState } from "@/components/ui/ScreenState";
import { Text } from "@/components/ui/text";
import { View } from "react-native";
import { DetailRow } from "../components/DetailRow";
import { useAppointmentDetails } from "../viewmodels/useAppointmentDetails";

export function AppointmentDetailsScreen() {
  const {
    appointment,
    isLoading,
    error,
    reload,
    openDoctorProfile,
    cancel,
    reschedule,
    addToCalendar,
  } = useAppointmentDetails();

  function renderContent() {
    if (isLoading) return <ScreenState type="loading" />;

    if (error || !appointment) {
      return (
        <ScreenState
          type="error"
          title="Something went wrong"
          message={error}
          actionLabel="Try again"
          onAction={reload}
        />
      );
    }

    return (
      <View className="gap-md py-md">
        <View className="items-center gap-sm">
          <Avatar alt={appointment.doctorName} className="size-20">
            <AvatarImage source={appointment.doctorPhotoKey} />
            <AvatarFallback className="bg-accent">
              <Text className="font-inter-bold text-xxl text-primary">
                {appointment.doctorName.replace("Dr. ", "")[0].toUpperCase()}
              </Text>
            </AvatarFallback>
          </Avatar>
          <Text className="font-inter-semibold text-xl">
            {appointment.doctorName}
          </Text>
          <Text className="text-md text-subtext">{appointment.specialty}</Text>
          <Button
            variant="outline"
            size="sm"
            className="rounded-pill border-primary px-md"
            onPress={openDoctorProfile}
          >
            <Text className="font-inter-medium text-primary">
              View Doctor Profile
            </Text>
          </Button>
        </View>

        <Card className="gap-4 py-4">
          <CardHeader>
            <CardTitle>Appointment</CardTitle>
          </CardHeader>
          <CardContent className="gap-md">
            <DetailRow
              icon="calendar-outline"
              label="Date"
              value={new Date(appointment.date).toLocaleDateString()}
            />
            <DetailRow
              icon="time-outline"
              label="Time"
              value={`${appointment.startTime} - ${appointment.endTime}`}
            />
            <DetailRow
              icon="information-circle-outline"
              label="Status"
              value={
                appointment.status[0].toUpperCase() +
                appointment.status.slice(1)
              }
            />
          </CardContent>
        </Card>

        <Card className="gap-4 py-4">
          <CardHeader>
            <CardTitle>Clinic</CardTitle>
          </CardHeader>
          <CardContent className="gap-md">
            <DetailRow
              icon="business-outline"
              label="Name"
              value={appointment.clinicName}
            />
            <DetailRow
              icon="location-outline"
              label="Address"
              value={appointment.clinicAddress}
            />
            <DetailRow
              icon="call-outline"
              label="Phone"
              value={appointment.clinicPhone ?? "Not available"}
            />
          </CardContent>
        </Card>

        <Card className="gap-4 py-4">
          <CardHeader>
            <CardTitle>Payment & Booking</CardTitle>
          </CardHeader>
          <CardContent className="gap-md">
            <DetailRow
              icon="cash-outline"
              label="Consultation fee"
              value={`${appointment.consultationFee} EGP`}
            />
            <DetailRow
              icon="checkmark-done-outline"
              label="Booked on"
              value={new Date(appointment.createdAt).toLocaleDateString()}
            />
            <DetailRow
              icon="receipt-outline"
              label="Booking reference"
              value={appointment.id.toUpperCase()}
            />
          </CardContent>
        </Card>
      </View>
    );
  }

  const footer =
    appointment?.status === "upcoming" ? (
      <View className="gap-sm">
        <View className="flex-row gap-sm">
          <Button
            variant="outline"
            className="h-12 flex-1 rounded-pill border-danger"
            onPress={cancel}
          >
            <Text className="font-inter-semibold text-lg text-danger">
              Cancel
            </Text>
          </Button>
          <Button className="h-12 flex-1 rounded-pill" onPress={reschedule}>
            <Text className="font-inter-semibold text-lg">Reschedule</Text>
          </Button>
        </View>
        <Button className="h-12 rounded-pill" onPress={addToCalendar}>
          <Text className="font-inter-semibold text-lg">
            Add to Google Calendar
          </Text>
        </Button>
      </View>
    ) : undefined;

  return (
    <Screen
      scroll
      header={<Header title="Appointment Details" />}
      footer={footer}
    >
      {renderContent()}
    </Screen>
  );
}
