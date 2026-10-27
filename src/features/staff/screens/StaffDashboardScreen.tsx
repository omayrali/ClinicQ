
import { Platform, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Screen } from '@/components/ui/Screen';
import { Header } from '@/components/ui/Header';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { ScreenState } from '@/components/ui/ScreenState';

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
    <Card
      className={`gap-md ${Platform.select({
        web: 'border-l-4 border-l-transparent transition-all duration-200 ease-out hover:z-10 hover:scale-[1.02] hover:border-l-blue-500 hover:shadow-[0_0_18px_rgba(59,130,246,0.45)]',
      }) ?? ''}`}
    >
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
  const { stats, loading, error, reload } =
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
