
import { View, Pressable, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Screen } from '@/components/ui/Screen';
import { Header } from '@/components/ui/Header';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { ScreenState } from '@/components/ui/ScreenState';
import { colors } from '@/theme/tokens';

import {usePatientAppointments, type StatusFilter,} from '../viewmodels/usePatientAppointments';

const filters: StatusFilter[] = [
  'all',
  'upcoming',
  'completed',
  'cancelled',
];

function formatStatus(status: string) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function statusColor(status: string) {
  switch (status) {
    case 'completed':
      return colors.success;
    case 'cancelled':
      return colors.danger;
    default:
      return colors.primary;
  }
}

export default function PatientAppointmentsScreen() {
  const {
    visible,
    filter,
    setFilter,
    query,
    setQuery,
    loading,
    error,
    reload,
    updatingId,
    changeStatus,
  } = usePatientAppointments();

  return (
    <Screen scroll>
      <Header title="Patient Appointments" />
      <View className="mb-10 mt-4">
        <Input
          value={query}
          onChangeText={setQuery}
          placeholder="Search by patient ID..."
          autoCapitalize="none"
        />
      </View>

      <View className="mb-5 flex-row flex-wrap gap-2">
        {filters.map((item) => {
          const selected = filter === item;

          return (
            <Pressable
              key={item}
              onPress={() => setFilter(item)}
              className={`rounded-full border px-4 py-2 ${
                selected
                  ? 'border-primary bg-primary'
                  : 'border-border bg-surface'
              }`}
            >
              <Text
                className={
                  selected
                    ? 'font-medium text-primary-foreground'
                    : 'text-foreground'
                }
              >
                {formatStatus(item)}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {loading ? (
        <ScreenState
          type="loading"
          message="Loading patient appointments..."
        />
      ) : error ? (
        <ScreenState
          type="error"
          title="Unable to load appointments"
          message={error}
          actionLabel="Try again"
          onAction={reload}
        />
      ) : visible.length === 0 ? (
        <ScreenState
          type="empty"
          title="No appointments found"
          message="Try changing the status filter or search query."
          icon="calendar-outline"
          actionLabel="Refresh"
          onAction={reload}
        />
      ) : (
        <View className="gap-3">
          <Text className="mb-1 text-sm text-muted-foreground">
            {visible.length} appointment
            {visible.length === 1 ? '' : 's'} found
          </Text>

          {visible.map((appointment) => {
            const isUpdating = updatingId === appointment.id;
            const canUpdate = appointment.status === 'upcoming';

            return (
              <Card key={appointment.id}>
                <CardContent className="p-4">
                  <View className="flex-row items-start justify-between">
                    <View className="flex-1 pr-3">
                      <Text className="text-base font-semibold text-foreground">
                        Patient ID: {appointment.patientId}
                      </Text>

                      <Text className="mt-1 text-sm text-muted-foreground">
                        Appointment ID: {appointment.id}
                      </Text>
                    </View>

                    <View
                      className="rounded-full px-3 py-1"
                      style={{
                        backgroundColor: `${statusColor(appointment.status)}18`,
                      }}
                    >
                      <Text
                        className="text-xs font-semibold"
                        style={{ color: statusColor(appointment.status) }}
                      >
                        {formatStatus(appointment.status)}
                      </Text>
                    </View>
                  </View>

                  <View className="mt-4 flex-row items-center">
                    <Ionicons
                      name="calendar-outline"
                      size={18}
                      color={colors.muted}
                    />
                    <Text className="ml-2 text-sm text-muted-foreground">
                      Slot ID: {appointment.slotId}
                    </Text>
                  </View>

                  {canUpdate && (
                    <View className="mt-4 flex-row gap-2">
                      <View className="flex-1">
                        <Button
                          onPress={() =>
                            void changeStatus(
                              appointment.id,
                              'completed',
                            )
                          }
                          disabled={isUpdating}
                        >
                          {isUpdating ? (
                            <ActivityIndicator
                              size="small"
                              color={colors.surface}
                            />
                          ) : (
                            <Text>Complete</Text>
                          )}
                        </Button>
                      </View>

                      <View className="flex-1">
                        <Button
                          variant="outline"
                          onPress={() =>
                            void changeStatus(
                              appointment.id,
                              'cancelled',
                            )
                          }
                          disabled={isUpdating}
                        >
                          <Text>Cancel</Text>
                        </Button>
                      </View>
                    </View>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </View>
      )}

      <Button
        variant="outline"
        onPress={reload}
        className="mt-5"
      >
        <Ionicons
          name="refresh-outline"
          size={18}
          color={colors.primary}
        />
        <Text className="ml-2">Refresh Appointments</Text>
      </Button>
    </Screen>
  );
}
