"use client";

import { ArrowLeftRight, Search } from "lucide-react";
import type { FormEvent } from "react";
import { AirportField } from "./AirportField";
import { DateField } from "./DateField";
import { SpecialFares } from "./SpecialFares";
import { TravellerField } from "./TravellerField";
import { TripTypeTabs } from "./TripTypeTabs";
import { useFlightSearch } from "./useFlightSearch";

type FlightSearchCardProps = {
  initialDepart: string;
  initialReturn: string;
  minDate: string;
};

export function FlightSearchCard({
  initialDepart,
  initialReturn,
  minDate,
}: FlightSearchCardProps) {
  const search = useFlightSearch({ initialDepart, initialReturn });

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    search.submit();
  }

  return (
    <form
      onSubmit={onSubmit}
      aria-label="Flight search"
      className="relative rounded-[1.75rem] bg-ivory p-4 pb-10 shadow-2xl shadow-main/20 ring-1 ring-main/10 sm:p-6 sm:pb-12"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <TripTypeTabs value={search.tripType} onChange={search.changeTripType} />
        <p className="text-xs font-medium text-main/60">
          Domestic and international flights, one clear price.
        </p>
      </div>

      <div className="mt-4 grid divide-y divide-main/10 rounded-2xl ring-1 ring-main/10 md:grid-cols-[1.15fr_1.15fr_0.9fr_0.9fr_1.05fr] md:divide-x md:divide-y-0">
        <AirportField
          label="From"
          value={search.origin}
          excludeCode={search.destination.code}
          onSelect={search.setOrigin}
        />

        <div className="relative">
          <button
            type="button"
            onClick={search.swapAirports}
            aria-label="Swap origin and destination"
            className="absolute -top-5 right-4 z-20 grid size-10 place-items-center rounded-full bg-secondary text-main shadow-md shadow-main/20 transition hover:bg-secondary/90 md:top-1/2 md:right-auto md:-left-5 md:-translate-y-1/2"
          >
            <ArrowLeftRight className="size-4" />
          </button>

          <AirportField
            label="To"
            value={search.destination}
            excludeCode={search.origin.code}
            onSelect={search.setDestination}
          />
        </div>

        <DateField
          label="Departure"
          value={search.depart}
          min={minDate}
          onChange={search.changeDepart}
        />

        <DateField
          label="Return"
          value={search.returnDate}
          min={search.depart || minDate}
          onChange={search.changeReturn}
          disabled={search.tripType === "oneway"}
          disabledHint="Add return"
          onDisabledClick={search.enableReturn}
        />

        <TravellerField
          travellers={search.travellers}
          cabin={search.cabin}
          onTravellerChange={search.changeTravellers}
          onCabinChange={search.setCabin}
        />
      </div>

      <div className="mt-4">
        <SpecialFares value={search.fareType} onChange={search.setFareType} />
      </div>

      {search.error ? (
        <p
          role="alert"
          className="mt-4 rounded-xl bg-main/8 px-3 py-2 text-center text-sm font-semibold text-main"
        >
          {search.error}
        </p>
      ) : null}

      <button
        type="submit"
        className="absolute -bottom-6 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-main px-8 py-3.5 text-sm font-semibold tracking-wide whitespace-nowrap text-ivory uppercase shadow-xl shadow-main/25 transition hover:bg-main/90 sm:px-10"
      >
        <Search className="size-4" />
        Search flights
      </button>
    </form>
  );
}
