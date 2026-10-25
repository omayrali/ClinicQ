import { Button } from "@/components/ui/button";
import { DayPill } from "@/components/ui/DayPill";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";
import { ScreenState } from "@/components/ui/ScreenState";
import { Text } from "@/components/ui/text";
import { DetailRow } from "@/features/appointments/components/DetailRow";
import { DoctorPhoto } from "@/features/doctors/components/DoctorPhoto";
import { useDoctorProfile } from "@/features/doctors/viewmodels/useDoctorProfile";
import { BookingSuccess } from "@/features/booking/components/BookingSuccess";
import { TimeSlotChip } from "@/features/booking/components/TimeSlotChip";
import { colors } from "@/theme/tokens";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";

const days = [
  { name: "Sun", number: "22", full: "Sunday, 22 November" },
  { name: "Mon", number: "23", full: "Monday, 23 November" },
  { name: "Tue", number: "24", full: "Tuesday, 24 November" },
  { name: "Wed", number: "25", full: "Wednesday, 25 November" },
  { name: "Thu", number: "26", full: "Thursday, 26 November" },
  { name: "Fri", number: "27", full: "Friday, 27 November", disabled: true },
  { name: "Sat", number: "28", full: "Saturday, 28 November" },
];

const timeGroups = [
  {
    title: "Morning",
    times: [
      { label: "9:00 AM" },
      { label: "9:30 AM", disabled: true },
      { label: "10:00 AM" },
      { label: "10:30 AM" },
      { label: "11:00 AM" },
      { label: "11:30 AM", disabled: true },
    ],
  },
  {
    title: "Afternoon",
    times: [
      { label: "1:00 PM" },
      { label: "1:30 PM" },
      { label: "2:00 PM", disabled: true },
      { label: "2:30 PM" },
    ],
  },
];

export function BookingScreen({ doctorId }: { doctorId: string }) {
  const router = useRouter();
  const { doctor, clinic, error } = useDoctorProfile(doctorId);
  const [day, setDay] = useState(days[0]);
  const [time, setTime] = useState("");
  const [booked, setBooked] = useState(false);

  if (!doctor || !clinic) {
    return (
      <Screen header={<Header title="Book Appointment" />}>
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
      <Screen header={<Header title="Booking Confirmed" />}>
        <BookingSuccess
          doctorName={doctor.name}
          date={day.full}
          time={time}
          clinic={`${clinic.name}, ${clinic.address}`}
          onViewAppointment={() => router.replace("/appointments")}
        />
      </Screen>
    );
  }

  return (
    <Screen
      scroll
      header={<Header title="Book Appointment" />}
      footer={
        <Button
          size="lg"
          className="h-12"
          disabled={time === ""}
          onPress={() => setBooked(true)}
        >
          <Text className="font-inter-semibold text-lg">
            {time === "" ? "Choose a time" : "Confirm Booking"}
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
            <Text className="text-md text-muted">November 2026</Text>
          </View>

          <View className="-mx-md">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}
            >
              {days.map((item) => (
                <DayPill
                  key={item.number}
                  dayName={item.name}
                  dayNumber={item.number}
                  selected={item.number === day.number}
                  disabled={item.disabled}
                  onPress={() => {
                    setDay(item);
                    setTime("");
                  }}
                />
              ))}
            </ScrollView>
          </View>

          <Text className="text-md text-subtext">{day.full}</Text>
        </View>

        {timeGroups.map((group) => (
          <View key={group.title} className="gap-md">
            <View className="flex-row items-center justify-between">
              <Text className="font-inter-semibold text-lg">{group.title}</Text>
              <Text className="text-md text-muted">
                {group.times.filter((t) => !t.disabled).length} available
              </Text>
            </View>

            <View className="flex-row flex-wrap gap-sm">
              {group.times.map((item) => (
                <TimeSlotChip
                  key={item.label}
                  label={item.label}
                  selected={item.label === time}
                  disabled={item.disabled}
                  onPress={() => setTime(item.label)}
                />
              ))}
            </View>
          </View>
        ))}

        {time !== "" && (
          <View className="gap-md rounded-sm border border-border bg-surface p-md">
            <Text className="font-inter-semibold text-lg">Your booking</Text>
            <DetailRow icon="calendar-outline" label="Date" value={day.full} />
            <DetailRow icon="time-outline" label="Time" value={time} />
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
