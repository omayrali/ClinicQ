import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";
import { ScreenState } from "@/components/ui/ScreenState";
import { Text } from "@/components/ui/text";
import { DoctorRow } from "@/features/doctors/components/DoctorRow";
import { FilterSheet } from "@/features/doctors/components/FilterSheet";
import { useSearch } from "@/features/doctors/viewmodels/useSearch";
import { colors } from "@/theme/tokens";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, TextInput, View } from "react-native";

export function SearchScreen() {
  const router = useRouter();
  const {
    query,
    setQuery,
    specialty,
    specialties,
    selectSpecialty,
    priceIndex,
    setPriceIndex,
    ratingIndex,
    setRatingIndex,
    activeFilters,
    resetFilters,
    priceLabels,
    ratingLabels,
    results,
    loading,
    error,
  } = useSearch();
  const [filterOpen, setFilterOpen] = useState(false);

  const header = <Header title="Search" showBack={false} />;

  if (loading) {
    return (
      <Screen edges={["top"]} header={header}>
        <ScreenState type="loading" message="Loading..." />
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen edges={["top"]} header={header}>
        <ScreenState
          type="error"
          title="Something went wrong"
          message="Could not load the doctors"
        />
      </Screen>
    );
  }

  return (
    <Screen scroll edges={["top"]} header={header}>
      <View className="gap-lg pt-md">
        <View className="flex-row gap-sm">
          <View className="h-11 flex-1 flex-row items-center gap-sm rounded-sm border border-border bg-surface px-md">
            <Ionicons name="search-outline" size={20} color={colors.muted} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search by doctor name or specialty"
              placeholderTextColor={colors.placeholder}
              autoCorrect={false}
              returnKeyType="search"
              className="flex-1 font-inter text-md text-text"
            />
            {query !== "" && (
              <Pressable onPress={() => setQuery("")} hitSlop={8}>
                <Ionicons name="close-circle" size={20} color={colors.muted} />
              </Pressable>
            )}
          </View>

          <Pressable
            onPress={() => setFilterOpen(true)}
            className="h-11 w-11 items-center justify-center rounded-sm border border-border bg-surface"
          >
            <Ionicons name="options-outline" size={20} color={colors.text} />
            {activeFilters > 0 && (
              <View className="absolute -right-1 -top-1 h-4 min-w-4 items-center justify-center rounded-full bg-primary px-xs">
                <Text className="text-[10px] text-white">{activeFilters}</Text>
              </View>
            )}
          </Pressable>
        </View>

        <View className="-mx-md">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}
          >
            {["All", ...specialties].map((name) => {
              const selected = name === (specialty ?? "All");

              return (
                <Pressable
                  key={name}
                  onPress={() => selectSpecialty(name === "All" ? undefined : name)}
                  className={`rounded-sm border px-md py-sm ${
                    selected
                      ? "border-primary bg-primary"
                      : "border-border bg-surface"
                  }`}
                >
                  <Text className={`text-md ${selected ? "text-white" : ""}`}>
                    {name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <Text className="text-md text-muted">
          {results.length} {results.length === 1 ? "doctor" : "doctors"}
        </Text>

        {results.length === 0 ? (
          <View className="h-64">
            <ScreenState
              type="empty"
              icon="search-outline"
              title="No doctors found"
              message="Try changing your search or filters"
            />
          </View>
        ) : (
          <View className="gap-md">
            {results.map((doctor) => (
              <DoctorRow
                key={doctor.id}
                doctor={doctor}
                onPress={() => router.push(`/doctors/${doctor.id}`)}
              />
            ))}
          </View>
        )}
      </View>

      <FilterSheet
        visible={filterOpen}
        onClose={() => setFilterOpen(false)}
        priceLabels={priceLabels}
        priceIndex={priceIndex}
        onPriceChange={setPriceIndex}
        ratingLabels={ratingLabels}
        ratingIndex={ratingIndex}
        onRatingChange={setRatingIndex}
        onReset={resetFilters}
        resultCount={results.length}
      />
    </Screen>
  );
}
