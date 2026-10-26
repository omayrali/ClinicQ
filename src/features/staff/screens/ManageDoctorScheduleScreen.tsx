import { useEffect } from 'react';
import { ScrollView, View } from 'react-native';

import { Screen } from '@/components/ui/Screen';
import { Header } from '@/components/ui/Header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Text } from '@/components/ui/text';
import { DayPill } from '@/components/ui/DayPill';
import { ScreenState } from '@/components/ui/ScreenState';
import { colors } from '@/theme/tokens';
import { useDoctorSchedule } from '@/features/staff/viewmodels/useDoctorSchedule';

export default function ManageDoctorScheduleScreen() {
  const {
    days,
    doctors,
    doctorId,
    setDoctorId,
    date,
    setDate,
    slots,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    formError,
    loading,
    error,
    saving,
    reload,
    addSlot,
    removeSlot,
  } = useDoctorSchedule();

  useEffect(() => {
    void reload();
  }, [reload]);

  const selectedDoctor = doctors.find(
    (doctor) => doctor.id === doctorId,
  );

  return (
    <Screen
      scroll
      header={<Header title="Manage Doctor Schedule" />}
    >
      <View className="gap-lg py-lg">
       
        <View className="gap-xs">
          <Text className="text-2xl font-inter-semibold text-foreground">
            Doctor Availability
          </Text>

          <Text className="text-sm text-muted-foreground">
            Manage working hours and appointment slots.
          </Text>
        </View>

        <View className="gap-sm">
          <Text className="text-lg font-inter-semibold text-foreground">
            Select Doctor
          </Text>

          {doctors.length === 0 ? (
            <Text className="text-sm text-muted-foreground">
              {loading ? 'Loading doctors...' : 'No doctors available.'}
            </Text>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="gap-sm"
            >
              {doctors.map((doctor) => {
                const selected = doctor.id === doctorId;

                return (
                  <Button
                    key={doctor.id}
                    variant={selected ? 'default' : 'outline'}
                    size="sm"
                    onPress={() => setDoctorId(doctor.id)}
                    accessibilityState={{ selected }}
                  >
                    <Text>{doctor.name}</Text>
                  </Button>
                );
              })}
            </ScrollView>
          )}

          {selectedDoctor && (
            <Text className="text-sm text-muted-foreground">
              Selected doctor: {selectedDoctor.name}
            </Text>
          )}
        </View>

        
        <View className="gap-sm">
          <Text className="text-lg font-inter-semibold text-foreground">
            Select Date
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-sm"
          >
            {days.map((day) => {
              const dayDate = new Date(`${day.key}T12:00:00`);

              const dayName = dayDate.toLocaleDateString(undefined, {
                weekday: 'short',
              });

              const dayNumber = String(dayDate.getDate());

              return (
                <DayPill
                  key={day.key}
                  dayName={dayName}
                  dayNumber={dayNumber}
                  selected={date === day.key}
                  onPress={() => setDate(day.key)}
                />
              );
            })}
          </ScrollView>

          <Text className="text-xs text-muted-foreground">
            Selected date: {date}
          </Text>
        </View>

        
        <Card>
          <CardHeader>
            <CardTitle>Add Time Slot</CardTitle>
            <CardDescription>
              Enter the start and end times in 24-hour format.
            </CardDescription>
          </CardHeader>

          <CardContent className="gap-md">
            <View className="gap-xs">
              <Text className="text-sm font-inter-medium text-foreground">
                Start Time
              </Text>

              <Input
                value={startTime}
                onChangeText={setStartTime}
                placeholder="09:00"
                placeholderTextColor={colors.placeholder}
                keyboardType="numbers-and-punctuation"
                maxLength={5}
                accessibilityLabel="Start time"
              />
            </View>

            <View className="gap-xs">
              <Text className="text-sm font-inter-medium text-foreground">
                End Time
              </Text>

              <Input
                value={endTime}
                onChangeText={setEndTime}
                placeholder="09:30"
                placeholderTextColor={colors.placeholder}
                keyboardType="numbers-and-punctuation"
                maxLength={5}
                accessibilityLabel="End time"
              />
            </View>

            {formError && (
              <Text className="text-sm text-destructive">
                {formError}
              </Text>
            )}

            <Button
              className="w-full"
              disabled={!doctorId || saving}
              onPress={() => void addSlot()}
            >
              <Text>
                {saving ? 'Adding Slot...' : 'Add Time Slot'}
              </Text>
            </Button>
          </CardContent>
        </Card>

     
        <View className="gap-sm">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-inter-semibold text-foreground">
              Existing Time Slots
            </Text>

            <Button
              variant="outline"
              size="sm"
              disabled={!doctorId || loading}
              onPress={() => void reload()}
            >
              <Text>Refresh</Text>
            </Button>
          </View>

          {loading ? (
            <View className="min-h-40">
              <ScreenState
                type="loading"
                message="Loading schedule..."
              />
            </View>
          ) : error ? (
            <View className="min-h-40">
              <ScreenState
                type="error"
                title="Unable to load schedule"
                message={error}
                actionLabel="Try Again"
                onAction={() => void reload()}
              />
            </View>
          ) : !doctorId ? (
            <Card>
              <CardContent className="py-lg">
                <Text className="text-center text-muted-foreground">
                  Select a doctor to view their schedule.
                </Text>
              </CardContent>
            </Card>
          ) : slots.length === 0 ? (
            <View className="min-h-40">
              <ScreenState
                type="empty"
                title="No time slots"
                message="Add a time slot for the selected doctor and date."
                icon="time-outline"
              />
            </View>
          ) : (
            <View className="gap-sm">
              {slots.map((slot) => {
                const booked = slot.status === 'booked';

                return (
                  <Card key={slot.id} className="gap-md py-md">
                    <CardContent className="gap-sm">
                      <View className="flex-row items-center justify-between gap-sm">
                        <View className="flex-1 gap-xs">
                          <Text className="font-inter-semibold text-foreground">
                            {slot.startTime} - {slot.endTime}
                          </Text>

                          <View className="flex-row items-center gap-xs">
                            <View
                              className="h-2 w-2 rounded-full"
                              style={{
                                backgroundColor: booked
                                  ? colors.warning
                                  : colors.success,
                              }}
                            />

                            <Text
                              className="text-sm font-inter-medium"
                              style={{
                                color: booked
                                  ? colors.muted
                                  : colors.success,
                              }}
                            >
                              {booked ? 'Booked' : 'Available'}
                            </Text>
                          </View>
                        </View>

                        <Button
                          variant="destructive"
                          size="sm"
                          disabled={booked}
                          onPress={() => void removeSlot(slot)}
                        >
                          <Text>
                            {booked ? 'Booked' : 'Remove'}
                          </Text>
                        </Button>
                      </View>
                    </CardContent>
                  </Card>
                );
              })}
            </View>
          )}
        </View>
      </View>
    </Screen>
  );
}