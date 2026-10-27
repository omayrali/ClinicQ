
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Screen } from '@/components/ui/Screen';
import { Header } from '@/components/ui/Header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/button';
import { ScreenState } from '@/components/ui/ScreenState';
import { Text } from '@/components/ui/text';

import { colors } from '@/theme/tokens';
import { useStaffDashboardViewModel } from '@/features/staff/viewmodels/useStaffDashboardViewModel';



type KpiCardProps = {
  title: string;
  value: number;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
};

function KpiCard({
  title,
  value,
  icon,
  color,
}: KpiCardProps) {
  return (
    <Card className="gap-md">
      <CardHeader>
        <View className="flex-row items-center justify-between gap-md">
          <View className="flex-1 gap-xs">
            <CardDescription>{title}</CardDescription>
            <CardTitle className="text-3xl text-foreground">
              {value.toLocaleString()}
            </CardTitle>
          </View>

          <View
            className="h-14 w-14 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${color}18` }}
          >
            <Ionicons name={icon} size={28} color={color} />
          </View>
        </View>
      </CardHeader>
    </Card>
  );
}

export default function StaffDashboardScreen() {
  const { stats, doctor, clinic, openDoctorProfile, loading, error, reload } =
    useStaffDashboardViewModel();

  return (
    <Screen
      scroll
      header={<Header title="Dashboard" />}
    >
      <View className="gap-lg py-lg">

        {loading ? (
          <View className="min-h-48">
            <ScreenState
              type="loading"
              message="Loading dashboard statistics..."
            />
          </View>
        ) : error ? (
          <View className="min-h-48">
            <ScreenState
              type="error"
              title="Dashboard unavailable"
              message={error}
              actionLabel="Try Again"
              onAction={() => void reload()}
            />
          </View>
        ) : (
          <>
            {doctor && (
              <Card>
                <CardContent className="gap-4">
                  <View className="flex-row items-center gap-md">
                    <Avatar alt={doctor.name} className="size-16">
                      {doctor.photoKey ? (
                        <AvatarImage source={doctor.photoKey} />
                      ) : null}
                      <AvatarFallback className="bg-primary">
                        <Text className="font-inter-bold text-xl text-primary-foreground">
                          {doctor.name.replace('Dr. ', '')[0]}
                        </Text>
                      </AvatarFallback>
                    </Avatar>
                    <View className="flex-1 gap-xs">
                      <CardTitle className="text-lg">{doctor.name}</CardTitle>
                      <CardDescription>{doctor.specialty}</CardDescription>
                      {clinic && (
                        <View className="flex-row items-center gap-xs">
                          <Ionicons name="location-outline" size={14} color={colors.muted} />
                          <Text numberOfLines={1} className="flex-1 text-sm text-muted">
                            {clinic.name}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>

                  <View className="flex-row rounded-sm bg-secondary py-sm">
                    <View className="flex-1 items-center">
                      <Text className="font-inter-semibold text-md">
                        {doctor.rating ?? '-'}
                      </Text>
                      <Text className="text-sm text-muted">Rating</Text>
                    </View>
                    <View className="flex-1 items-center">
                      <Text className="font-inter-semibold text-md">
                        {doctor.yearsOfExperience} yrs
                      </Text>
                      <Text className="text-sm text-muted">Experience</Text>
                    </View>
                    <View className="flex-1 items-center">
                      <Text className="font-inter-semibold text-md">
                        {doctor.consultationFee} EGP
                      </Text>
                      <Text className="text-sm text-muted">Fee</Text>
                    </View>
                  </View>

                  <Button variant="outline" className="h-12" onPress={openDoctorProfile}>
                    <Ionicons name="create-outline" size={18} color={colors.primary} />
                    <Text className="font-inter-medium text-primary">
                      Edit Doctor Profile
                    </Text>
                  </Button>
                </CardContent>
              </Card>
            )}

            <View className="gap-md">
              <KpiCard
                title="Doctor Profiles Managed"
                value={stats.doctorsManaged}

                icon="people-outline"
                color={colors.primary}
              />

              <KpiCard
                title="Completed Appointments"
                value={stats.completedAppointments}
                icon="checkmark-circle-outline"
                color={colors.success}
              />

              <KpiCard
                title="Upcoming Appointments"
                value={stats.upcomingAppointments}
                icon="calendar-outline"
                color={colors.primaryDark}
              />
            </View>
          </>
        )}
      </View>
    </Screen>
  );
}
