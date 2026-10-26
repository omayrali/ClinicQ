import { Button } from "@/components/ui/button";
import { DayPill } from "@/components/ui/DayPill";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";
import { ScreenState } from "@/components/ui/ScreenState";
import { Text } from "@/components/ui/text";
import { DetailRow } from "@/features/appointments/components/DetailRow";
import { BookingSuccess } from "@/features/booking/components/BookingSuccess";
import { TimeSlotChip } from "@/features/booking/components/TimeSlotChip";
import { useBooking } from "@/features/booking/viewmodels/useBooking";
import { DoctorPhoto } from "@/features/doctors/components/DoctorPhoto";
import { colors } from "@/theme/tokens";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";

export function BookingScreen({
  doctorId,
  appointmentId,
}: {
  doctorId: string;
  appointmentId?: string;
}) {
  const router = useRouter();
  const title = appointmentId ? "Reschedule Appointment" : "Book Appointment";
  const {
    doctor,
    clinic,
    error,
    loading,
    dates,
    selectedDate,
    selectDate,
    slotGroups,
    selectedSlot,
    selectSlot,
    confirm,
    submitting,
    bookingError,
    booked,
  } = useBooking(doctorId, appointmentId);

  if (!doctor || !clinic || loading) {
    return (
      <Screen header={<Header title={title} />}>
        {error ? (
          <ScreenState
            type="error"
            title="Something went wrong"
            message="Could not load this doctor"
          />
        ) : (
          <ScreenState type="loading" message="Loading..." />
        )}
      </Screen>
    );
  }

  if (booked) {
    return (
      <Screen
        header={
          <Header
            title={appointmentId ? "Reschedule Confirmed" : "Booking Confirmed"}
          />
        }
      >
        <BookingSuccess
          title={appointmentId ? "Appointment rescheduled" : undefined}
          doctorName={doctor.name}
          date={new Date(booked.slot.date).toLocaleDateString()}
          time={booked.slot.startTime}
          clinic={`${clinic.name}, ${clinic.address}`}
          onViewAppointment={() =>
            router.replace(`/appointments/${booked.appointment.id}`)
          }
        />
      </Screen>
    );
  }

  if (dates.length === 0) {
    return (
      <Screen header={<Header title={title} />}>
        <ScreenState
          type="empty"
          icon="calendar-outline"
          title="No available slots"
          message={`${doctor.name} has no free appointments right now.`}
        />
      </Screen>
    );
  }

  return (
    <Screen
      scroll
      header={<Header title={title} />}
      footer={
        <Button
          size="lg"
          className="h-12"
          disabled={!selectedSlot || submitting}
          onPress={confirm}
        >
          <Text className="font-inter-semibold text-lg">
            {submitting
              ? appointmentId
                ? "Rescheduling..."
                : "Booking..."
              : !selectedSlot
                ? "Choose a time"
                : appointmentId
                  ? "Confirm Reschedule"
                  : "Confirm Booking"}
          </Text>
        </Button>
      }
    >
      <View className="gap-lg pt-md">
        <View className="flex-row items-center gap-md rounded-sm border border-border bg-surface p-md">
          <DoctorPhoto doctor={doctor} className="h-16 w-16 rounded-sm" />
          <View className="flex-1 gap-xs">
            <Text className="font-inter-semibold text-lg">{doctor.name}</Text>
            <Text className="text-md text-subtext">{doctor.specialty}</Text>
            <View className="flex-row items-center gap-xs">
              <Ionicons name="location-outline" size={14} color={colors.muted} />
              <Text numberOfLines={1} className="flex-1 text-sm text-muted">
                {clinic.name}, {clinic.address}
              </Text>
            </View>
          </View>
        </View>

        <View className="gap-md">
          <View className="flex-row items-center justify-between">
            <Text className="font-inter-semibold text-lg">Select a date</Text>
            <Text className="text-md text-muted">
              {new Date(selectedDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </Text>
          </View>

          <View className="-mx-md">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}
            >
              {dates.map((date) => (
                <DayPill
                  key={date}
                  dayName={new Date(date).toLocaleDateString("en-US", { weekday: "short" })}
                  dayNumber={String(new Date(date).getDate())}
                  selected={date === selectedDate}
                  onPress={() => selectDate(date)}
                />
              ))}
            </ScrollView>
          </View>

          <Text className="text-md text-subtext">
            {new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </Text>
        </View>

        {slotGroups.map((group) => (
          <View key={group.title} className="gap-md">
            <View className="flex-row items-center justify-between">
              <Text className="font-inter-semibold text-lg">{group.title}</Text>
              <Text className="text-md text-muted">
                {group.slots.filter((slot) => slot.status === "available").length}{" "}
                available
              </Text>
            </View>

            <View className="flex-row flex-wrap gap-sm">
              {group.slots.map((slot) => (
                <TimeSlotChip
                  key={slot.id}
                  label={slot.startTime}
                  selected={slot.id === selectedSlot?.id}
                  disabled={slot.status !== "available"}
                  onPress={() => selectSlot(slot.id)}
                />
              ))}
            </View>
          </View>
        ))}

        {bookingError !== "" && (
          <Text className="text-md text-danger">{bookingError}</Text>
        )}

        {selectedSlot && (
          <View className="gap-md rounded-sm border border-border bg-surface p-md">
            <Text className="font-inter-semibold text-lg">Your booking</Text>
            <DetailRow
              icon="calendar-outline"
              label="Date"
              value={new Date(selectedSlot.date).toLocaleDateString()}
            />
            <DetailRow
              icon="time-outline"
              label="Time"
              value={selectedSlot.startTime}
            />
            <DetailRow
              icon="cash-outline"
              label="Fee, paid at the clinic"
              value={`${doctor.consultationFee} EGP`}
            />
          </View>
        )}
      </View>
    </Screen>
  );
}
