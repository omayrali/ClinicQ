import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";
import { ScreenState } from "@/components/ui/ScreenState";
import { Text } from "@/components/ui/text";
import { AppointmentCard } from "../components/AppointmentCard";
import { useAppointments } from "../viewmodels/useAppointments";
import { FlatList, View } from "react-native";

export function UserAppointmentsScreen() {
  const {
    appointments,
    filter,
    setFilter,
    isLoading,
    error,
    reload,
    openAppointment,
  } = useAppointments();

  function renderContent() {
    if (isLoading) return <ScreenState type="loading" />;

    if (error) {
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

    if (appointments.length === 0) {
      return (
        <ScreenState
          type="empty"
          icon="calendar-outline"
          title="No appointments yet"
          message="Appointments you book will show up here."
        />
      );
    }

    return (
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        contentContainerClassName="gap-sm py-md"
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <AppointmentCard
            appointmentView={item}
            onPress={() => openAppointment(item.id)}
          />
        )}
      />
    );
  }

  return (
    <Screen header={<Header title="My Appointments" />}>
      <View className="flex-row gap-xs pt-md">
        {(["all", "upcoming", "completed", "cancelled"] as const).map((f) => (
          <Button
            key={f}
            size="sm"
            variant={filter === f ? "default" : "outline"}
            className="flex-1 rounded-pill px-0"
            onPress={() => setFilter(f)}
          >
            <Text className="capitalize">{f}</Text>
          </Button>
        ))}
      </View>
      <View className="flex-1">{renderContent()}</View>
    </Screen>
  );
}
