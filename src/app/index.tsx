import { AppButton } from "@/components/ui/AppButton";
import { AppText } from "@/components/ui/AppText";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { DayPill } from "@/components/ui/DayPill";
import { Header } from "@/components/ui/Header";
import { IconButton } from "@/components/ui/IconButton";
import { Input } from "@/components/ui/Input";
import { Screen } from "@/components/ui/Screen";
import { ScreenState } from "@/components/ui/ScreenState";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useState } from "react";
import { View } from "react-native";

export default function Index() {
  const [filter, setFilter] = useState("All");
  const [day, setDay] = useState("12");

  return (
    <Screen
      scroll
      header={
        <Header
          title="UI Preview"
          showBack={false}
          right={
            <IconButton
              icon="notifications-outline"
              accessibilityLabel="Notifications"
              onPress={() => {}}
            />
          }
        />
      }
    >
      <View className="gap-md pt-md">
        <AppText variant="display">Display</AppText>
        <AppText variant="title">Title</AppText>
        <AppText variant="heading">Heading</AppText>
        <AppText variant="body">Body text</AppText>
        <AppText variant="caption">Caption text</AppText>

        <Input
          label="Email"
          icon="mail-outline"
          placeholder="Enter your email"
        />
        <Input
          label="Password"
          icon="lock-closed-outline"
          placeholder="Enter your password"
          secureTextEntry
        />
        <Input
          label="With error"
          icon="call-outline"
          placeholder="Phone"
          error="Phone number is required"
        />

        <View className="flex-row flex-wrap gap-sm">
          {["All", "Upcoming", "Completed", "Cancelled"].map((f) => (
            <Chip
              key={f}
              label={f}
              selected={filter === f}
              onPress={() => setFilter(f)}
            />
          ))}
        </View>

        <View className="flex-row gap-sm">
          {[
            ["Sun", "10"],
            ["Mon", "11"],
            ["Tue", "12"],
            ["Wed", "13"],
          ].map(([name, num]) => (
            <DayPill
              key={num}
              dayName={name}
              dayNumber={num}
              selected={day === num}
              disabled={num === "10"}
              onPress={() => setDay(num)}
            />
          ))}
        </View>

        <Card className="gap-md">
          <AppText variant="label">22 Nov 2026, 09:00</AppText>
          <View className="flex-row gap-md">
            <Avatar name="Dr. Ahmed Hassan" />
            <View className="flex-1 gap-xs">
              <View className="flex-row items-center justify-between">
                <AppText variant="heading">Dr. Ahmed Hassan</AppText>
                <StatusBadge label="Upcoming" tone="warning" />
              </View>
              <AppText variant="caption">Cardiology</AppText>
            </View>
          </View>
          <View className="flex-row gap-sm">
            <AppButton
              title="Cancel"
              variant="outline"
              size="small"
              onPress={() => {}}
              className="flex-1"
            />
            <AppButton
              title="Reschedule"
              size="small"
              onPress={() => {}}
              className="flex-1"
            />
          </View>
        </Card>

        <View className="flex-row gap-md">
          <StatusBadge label="Completed" tone="success" />
          <StatusBadge label="Cancelled" tone="danger" />
          <IconButton
            icon="arrow-forward"
            variant="primary"
            size="sm"
            accessibilityLabel="Open"
            onPress={() => {}}
          />
        </View>

        <AppButton title="Book Appointment" onPress={() => {}} />
        <AppButton title="Loading" onPress={() => {}} loading />
        <AppButton title="Disabled" onPress={() => {}} disabled />

        <View className="h-72 rounded-md border border-border">
          <ScreenState
            type="empty"
            title="You have no appointments yet!"
            message="Start booking appointments"
          />
        </View>
        <View className="h-72 rounded-md border border-border">
          <ScreenState
            type="error"
            title="Something went wrong"
            message="Could not load doctors"
            actionLabel="Try again"
            onAction={() => {}}
          />
        </View>
        <View className="h-32 rounded-md border border-border">
          <ScreenState type="loading" message="Loading doctors..." />
        </View>
      </View>
    </Screen>
  );
}
