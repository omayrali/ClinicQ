
import { useLocalSearchParams, router } from 'expo-router';
import { useMemo } from 'react';
import {ActivityIndicator, Alert,Pressable,TextInput,View} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Screen } from '@/components/ui/Screen';
import { Header } from '@/components/ui/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { ScreenState } from '@/components/ui/ScreenState';
import { DayPill } from '@/components/ui/DayPill';

import { colors} from '@/theme/tokens';
import { useManageDoctorScheduleViewModel } from '@/features/staff/viewmodels/useManageDoctorScheduleViewModel';

export default function ManageDoctorScheduleScreen() {
  const params = useLocalSearchParams<{ doctorId?: string | string[] }>();

  const doctorId = Array.isArray(params.doctorId)
    ? params.doctorId[0]
    : params.doctorId;

  if (!doctorId) {
    return (
      <Screen>
        <Header title="Manage Schedule" showBack />
        <ScreenState
          type="error"
          title="Doctor not found"
          message="Open this screen from the assigned doctor's profile."
          actionLabel="Go back"
          onAction={() => router.back()}
        />
      </Screen>
    );
  }

  return <ScheduleContent doctorId={doctorId} />;
}

function ScheduleContent({ doctorId }: { doctorId: string }) {
  const vm = useManageDoctorScheduleViewModel(doctorId);

  const workingDayIds = useMemo(
    () => new Set(vm.draft?.workingDays.map((day) => day.dayOfWeek) ?? []),
    [vm.draft?.workingDays],
  );

  if (vm.loading) {
    return (
      <Screen>
        <Header title="Manage Schedule" showBack />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.primary} />
          <Text className="mt-3 text-muted-foreground">
            Loading doctor schedule...
          </Text>
        </View>
      </Screen>
    );
  }

  if (vm.error && !vm.doctor) {
    return (
      <Screen>
        <Header title="Manage Schedule" showBack />
        <ScreenState
          type="error"
          title="Unable to load schedule"
          message={vm.error}
          actionLabel="Try again"
          onAction={vm.reloadSchedule}
        />
      </Screen>
    );
  }

  if (!vm.doctor || !vm.draft) {
    return (
      <Screen>
        <Header title="Manage Schedule" showBack />
        <ScreenState
          type="empty"
          title="Schedule unavailable"
          message="No schedule is available for this doctor."
          actionLabel="Reload"
          onAction={vm.reloadSchedule}
        />
      </Screen>
    );
  }

  const showMessage = vm.error ?? vm.formError ?? vm.successMessage;
  const isError = Boolean(vm.error || vm.formError);

  return (
    <Screen scroll>
      <Header title="Manage Schedule" showBack />

      <View className="gap-5 pb-8">
        {/* Assigned doctor */}
        <Card>
          <CardContent>
            <View className="flex-row items-center gap-3">
              <View className="h-12 w-12 items-center justify-center rounded-full bg-accent">
                <Ionicons
                  name="person-outline"
                  size={24}
                  color={colors.primaryDark}
                />
              </View>

              <View className="flex-1">
                <Text className="text-lg font-semibold">
                  {vm.doctor.name}
                </Text>
                <Text className="text-muted-foreground">
                  {vm.doctor.specialty}
                </Text>
                <Text className="mt-1 text-xs text-muted-foreground">
                  Assigned doctor
                </Text>
              </View>
            </View>
          </CardContent>
        </Card>

        {/* General schedule settings */}
        <Card>
          <CardHeader>
            <CardTitle>Schedule Settings</CardTitle>
          </CardHeader>

          <CardContent>
            <Text className="mb-2 font-medium">Appointment duration</Text>

            <View className="flex-row items-center gap-3">
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Decrease appointment duration"
                className="h-11 w-11 items-center justify-center rounded-lg border border-border"
                onPress={() =>
                  vm.updateSlotDuration(Math.max(5, vm.draft!.slotMinutes - 5))
                }
              >
                <Ionicons name="remove" size={20} color={colors.text} />
              </Pressable>

              <View className="min-w-24 flex-1 items-center rounded-lg border border-border p-3">
                <Text className="text-lg font-semibold">
                  {vm.draft.slotMinutes} min
                </Text>
              </View>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Increase appointment duration"
                className="h-11 w-11 items-center justify-center rounded-lg border border-border"
                onPress={() =>
                  vm.updateSlotDuration(vm.draft!.slotMinutes + 5)
                }
              >
                <Ionicons name="add" size={20} color={colors.text} />
              </Pressable>
            </View>

            <Text className="mt-2 text-xs text-muted-foreground">
              This duration applies to newly created appointment slots.
            </Text>
          </CardContent>
        </Card>

      
        <Card>
          <CardHeader>
            <CardTitle>Working Days & Hours</CardTitle>
          </CardHeader>

          <CardContent>
            <View className="mb-4 flex-row flex-wrap gap-2">
              {[
                { name: 'Sun', value: 0 },
                { name: 'Mon', value: 1 },
                { name: 'Tue', value: 2 },
                { name: 'Wed', value: 3 },
                { name: 'Thu', value: 4 },
                { name: 'Fri', value: 5 },
                { name: 'Sat', value: 6 },
              ].map((day) => (
                <Pressable
                  key={day.value}
                  accessibilityRole="checkbox"
                  accessibilityState={{
                    checked: workingDayIds.has(day.value),
                  }}
                  onPress={() => vm.toggleWorkingDay(day.value)}
                  className={`rounded-full border px-3 py-2 ${
                    workingDayIds.has(day.value)
                      ? 'border-primary bg-primary'
                      : 'border-border bg-background'
                  }`}
                >
                  <Text
                    className={
                      workingDayIds.has(day.value)
                        ? 'font-medium text-primary-foreground'
                        : 'text-foreground'
                    }
                  >
                    {day.name}
                  </Text>
                </Pressable>
              ))}
            </View>

            {[
              { name: 'Sunday', value: 0 },
              { name: 'Monday', value: 1 },
              { name: 'Tuesday', value: 2 },
              { name: 'Wednesday', value: 3 },
              { name: 'Thursday', value: 4 },
              { name: 'Friday', value: 5 },
              { name: 'Saturday', value: 6 },
            ]
              .filter((day) => workingDayIds.has(day.value))
              .map((day) => {
                const workingDay = vm.draft!.workingDays.find(
                  (item) => item.dayOfWeek === day.value,
                );

                if (!workingDay) return null;

                return (
                  <View
                    key={day.value}
                    className="mb-4 rounded-xl border border-border p-3"
                  >
                    <Text className="mb-3 font-semibold">{day.name}</Text>

    <View className="flex-row gap-3">
    <View className="flex-1">
            <Text className="mb-1 text-sm text-muted-foreground">
                          Start
                        </Text>
                        <TextInput
                          value={workingDay.startTime}
                          onChangeText={(value) =>
                            vm.updateWorkingDay(day.value, {
                              startTime: value,
                            })
                          }
                          placeholder="09:00"
                          accessibilityLabel={`${day.name} start time`}
                          className="rounded-lg border border-border bg-background p-3 text-foreground"
                          placeholderTextColor={colors.placeholder}
                          maxLength={5}
                        />
                      </View>

                      <View className="flex-1">
                        <Text className="mb-1 text-sm text-muted-foreground">
                          End
                        </Text>
                        <TextInput
                          value={workingDay.endTime}
                          onChangeText={(value) =>
                            vm.updateWorkingDay(day.value, {
                              endTime: value,
                            })
                          }
                          placeholder="17:00"
                          accessibilityLabel={`${day.name} end time`}
                          className="rounded-lg border border-border bg-background p-3 text-foreground"
                          placeholderTextColor={colors.placeholder}
                          maxLength={5}
                        />
                      </View>
                    </View>

                    <Text className="mt-2 text-xs text-muted-foreground">
                      Use 24-hour format, e.g. 09:00 or 17:30.
                    </Text>
                  </View>
                );
              })}

        
            <View className="mt-2 gap-3">
              <Button
                onPress={vm.saveSchedule}
                disabled={vm.savingSchedule || !vm.hasScheduleChanges}
              >
                <Text>
                  {vm.savingSchedule ? 'Saving...' : 'Save Schedule'}
                </Text>
              </Button>

              <Button
                variant="outline"
                onPress={vm.resetSchedule}
                disabled={vm.savingSchedule || !vm.hasScheduleChanges}
              >
                <Text>Discard Changes</Text>
              </Button>
            </View>
          </CardContent>
        </Card>

        
        <Card>
          <CardHeader>
            <CardTitle>Appointment Slots</CardTitle>
          
          </CardHeader>

          <CardContent>
            <View className="gap-2">
              {vm.days.map((day) => (
                <DayPill
                  key={day.date}
                  dayName={day.dayName.slice(0, 3)}
                  dayNumber={String(day.dayNumber)}
                  selected={vm.selectedDate === day.date}
                  onPress={() => vm.selectDate(day.date)}
                />
              ))}
            </View>

            {vm.selectedDay && (
              <Text className="mt-3 text-sm font-medium">
                Selected: {vm.selectedDay.dayName}, {vm.selectedDate}
              </Text>
            )}
          </CardContent>
        </Card>

        {/* Add slot */}
        <Card>
          <CardHeader>
            <CardTitle>Add Appointment Slot</CardTitle>
          </CardHeader>

          <CardContent>
            <View className="flex-row gap-3">
              <View className="flex-1">
                <Text className="mb-1 text-sm text-muted-foreground">
                  Start time
                </Text>
                <TextInput
                  value={vm.startTime}
                  onChangeText={vm.setStartTime}
                  placeholder="09:00"
                  accessibilityLabel="New slot start time"
                  className="rounded-lg border border-border bg-background p-3 text-foreground"
                  placeholderTextColor={colors.placeholder}
                  maxLength={5}
                />
              </View>

              <View className="flex-1">
                <Text className="mb-1 text-sm text-muted-foreground">
                  End time
                </Text>
                <TextInput
                  value={vm.endTime}
                  onChangeText={vm.setEndTime}
                  placeholder="09:30"
                  accessibilityLabel="New slot end time"
                  className="rounded-lg border border-border bg-background p-3 text-foreground"
                  placeholderTextColor={colors.placeholder}
                  maxLength={5}
                />
              </View>
            </View>

            <Button
              className="mt-4"
              onPress={vm.addSlot}
              disabled={vm.savingSlot || !vm.selectedDate}
            >
              <Text>
                {vm.savingSlot ? 'Adding...' : 'Add Slot'}
              </Text>
            </Button>
          </CardContent>
        </Card>

       
        <Card>
          <CardHeader>
            <CardTitle>Existing Slots</CardTitle>
          </CardHeader>

          <CardContent>
            {vm.slotsLoading ? (
              <ActivityIndicator color={colors.primary} />
            ) : vm.slots.length === 0 ? (
              <Text className="py-3 text-center text-muted-foreground">
                No appointment slots for this date.
              </Text>
            ) : (
              <View className="gap-3">
                {vm.slots.map((slot) => (
                  <View
                    key={slot.id}
                    className="flex-row items-center gap-3 rounded-xl border border-border p-3"
                  >
                    <View className="h-10 w-10 items-center justify-center rounded-lg bg-accent">
                      <Ionicons
                        name="time-outline"
                        size={20}
                        color={colors.primaryDark}
                      />
                    </View>

                    <View className="flex-1">
                      <Text className="font-semibold">
                        {slot.startTime} – {slot.endTime}
                      </Text>
                      <Text className="mt-1 text-xs capitalize text-muted-foreground">
                        {slot.status}
                      </Text>
                    </View>

                    {slot.status !== 'booked' && (
                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={`Remove slot ${slot.startTime}`}
                        disabled={vm.savingSlot}
                        onPress={() =>
                          Alert.alert(
                            'Remove appointment slot',
                            `Remove the ${slot.startTime}–${slot.endTime} slot?`,
                            [
                              { text: 'Cancel', style: 'cancel' },
                              {
                                text: 'Remove',
                                style: 'destructive',
                                onPress: () => {
                                  void vm.removeSlot(slot.id);
                                },
                              },
                            ],
                          )
                        }
                        className="h-10 w-10 items-center justify-center rounded-lg"
                      >
                        <Ionicons
                          name="trash-outline"
                          size={20}
                          color={colors.danger}
                        />
                      </Pressable>
                    )}
                  </View>
                ))}
              </View>
            )}
          </CardContent>
        </Card>

        
        {showMessage && (
          <View
            className={`rounded-xl border p-3 ${
              isError
                ? 'border-destructive'
                : 'border-border'
            }`}
          >
            <Text
              className={
                isError ? 'text-destructive' : 'text-foreground'
              }
            >
              {showMessage}
            </Text>
          </View>
        )}
      </View>
    </Screen>
  );
}
