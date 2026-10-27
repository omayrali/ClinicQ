import { useState } from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Screen } from '@/components/ui/Screen';
import { Header } from '@/components/ui/Header';
import {Card, CardContent,CardHeader, CardTitle} from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { ScreenState } from '@/components/ui/ScreenState';
import { colors } from '@/theme/tokens';
import { useManageDoctorProfileViewModel } from '../viewmodels/useDoctorProfile';
import { router } from 'expo-router';

export default function ManageDoctorProfileScreen() {
  const {
    doctors,
    selectedDoctor,
    draft,
    loading,
    saving,
    error,
    successMessage,
    hasChanges,
    updateDraft,
    saveChanges,
    reload,
  } = useManageDoctorProfileViewModel();

  const [feeInput, setFeeInput] = useState('');
  const [experienceInput, setExperienceInput] = useState('');

  if (loading) {
    return (
      <Screen>
        <Header title="Manage Doctor Profile" />
        <ScreenState
          type="loading"
          message="Loading doctor profiles..."
        />
      </Screen>
    );
  }

  if (doctors.length === 0 && !error) {
    return (
      <Screen>
        <Header title="Manage Doctor Profile" />
        <ScreenState
          type="empty"
          title="No doctors found"
          message="There are no doctor profiles to manage yet."
          icon="people-outline"
          actionLabel="Refresh"
          onAction={reload}
        />
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <Header title="Manage Doctor Profile" />

      <View className="mb-5 mt-3">
        <Text className="text-2xl font-bold text-foreground">
          Doctor Profile
        </Text>
      </View>

      {error && (
        <View className="mb-4 rounded-xl border border-destructive p-3">
          <Text className="text-sm text-destructive">{error}</Text>
        </View>
      )}

      {successMessage && (
        <View className="mb-4 rounded-xl border border-border bg-accent p-3">
          <Text className="text-sm text-accent-foreground">
            {successMessage}
          </Text>
        </View>
      )}
      {selectedDoctor && (
        <Card className="mb-5">
          <CardHeader>
            <CardTitle>Edit Doctor Information</CardTitle>
          </CardHeader>

          <CardContent>
            <View className="gap-4">
              <View>
                <Text className="mb-2 text-sm font-medium text-foreground">
                  Full Name
                </Text>
                <Input
                  value={String(draft.name ?? '')}
                  onChangeText={(value) => updateDraft('name', value)}
                  placeholder="Enter doctor's name"
                />
              </View>

              <View>
                <Text className="mb-2 text-sm font-medium text-foreground">
                  Specialty
                </Text>
                <Input
                  value={String(draft.specialty ?? '')}
                  onChangeText={(value) => updateDraft('specialty', value)}
                  placeholder="Enter medical specialty"
                />
              </View>

              <View>
                <Text className="mb-2 text-sm font-medium text-foreground">
                  Bio
                </Text>
                <Input
                  value={String(draft.bio ?? '')}
                  onChangeText={(value) => updateDraft('bio', value)}
                  placeholder="Enter professional biography"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  className="min-h-24"
                />
              </View>

              <View>
                <Text className="mb-2 text-sm font-medium text-foreground">
                  Consultation Fee
                </Text>
                <Input
                  value={
                    feeInput !== ''
                      ? feeInput
                      : String(draft.consultationFee ?? '')
                  }
                  onChangeText={(value) => {
                    setFeeInput(value);
                    const parsed = Number(value);
                    if (value.trim() !== '' && Number.isFinite(parsed)) {
                      updateDraft('consultationFee', parsed);
                    }
                  }}
                  onBlur={() => {
                    if (feeInput.trim() !== '') {
                      const parsed = Number(feeInput);
                      if (Number.isFinite(parsed)) {
                        updateDraft('consultationFee', parsed);
                      }
                    }
                  }}
                  placeholder="Enter consultation fee"
                  keyboardType="decimal-pad"
                />
              </View>

              <View>
                <Text className="mb-2 text-sm font-medium text-foreground">
                  Years of Experience
                </Text>
                <Input
                  value={
                    experienceInput !== ''
                      ? experienceInput
                      : String(draft.yearsOfExperience ?? '')
                  }
                  onChangeText={(value) => {
                    setExperienceInput(value);
                    const parsed = Number(value);
                    if (
                      value.trim() !== '' &&
                      Number.isInteger(parsed)
                    ) {
                      updateDraft('yearsOfExperience', parsed);
                    }
                  }}
                  onBlur={() => {
                    if (experienceInput.trim() !== '') {
                      const parsed = Number(experienceInput);
                      if (Number.isInteger(parsed)) {
                        updateDraft('yearsOfExperience', parsed);
                      }
                    }
                  }}
                  placeholder="Enter years of experience"
                  keyboardType="number-pad"
                />
              </View>

              <View>
                <Text className="mb-2 text-sm font-medium text-foreground">
                  Profile Photo Key (optional)
                </Text>
                <Input
                  value={
                    draft.photoKey === undefined
                      ? ''
                      : String(draft.photoKey)
                  }
                  onChangeText={(value) => {
                    const parsed = Number(value);
                    updateDraft(
                      'photoKey',
                      value.trim() === '' || !Number.isInteger(parsed)
                        ? undefined
                        : parsed,
                    );
                  }}
                  placeholder="Enter photo key"
                  keyboardType="number-pad"
                />
              </View>

              <View>
                <Text className="mb-2 text-sm font-medium text-foreground">
                  Rating
                </Text>
                <Input
                  value={
                    draft.rating === undefined
                      ? ''
                      : String(draft.rating)
                  }
                  onChangeText={(value) => {
                    const parsed = Number(value);
                    updateDraft(
                      'rating',
                      value.trim() === '' || !Number.isFinite(parsed)
                        ? undefined
                        : parsed,
                    );
                  }}
                  placeholder="Enter rating (optional)"
                  keyboardType="decimal-pad"
                />
              </View>

          <View className="mt-2 gap-3">
  <Button
    onPress={() => void saveChanges()}
    disabled={!hasChanges || saving}
  >
    {saving ? (
      <Text>Saving...</Text>
    ) : (
      <>
        <Ionicons
          name="save-outline"
          size={18}
          color={colors.surface}
        />
        <Text className="ml-2">Save Changes</Text>
      </>
    )}
  </Button>

  <Button
    variant="outline"
    onPress={() => {
      if (!selectedDoctor) return;

      router.push({
        pathname: '/(staff)/manage-doctor-schedule',
        params: {
          doctorId: selectedDoctor.id,
        },
      });
    }}
    disabled={!selectedDoctor}
  >
    <Ionicons
      name="calendar-outline"
      size={18}
      color={colors.primary}
    />
    <Text className="ml-2">Manage Schedule</Text>
  </Button>
  </View>
  </View>
          </CardContent>
        </Card>
      )}
    </Screen>
  );
}
